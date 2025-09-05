// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SalaryContract {
    address public factory;
    address public employer;
    address public employee;
    
    uint256 public dailySalary;
    uint256 public probationPercentage;
    uint256 public contractDuration;
    uint256 public totalSalaryLocked;
    
    bool public isOnProbation;
    bool public employeeApproved;
    bool public isActive;
    bool public isTerminated;
    
    uint256 public startDate;
    uint256 public attendanceCount;
    uint256 public totalWithdrawn;
    
    mapping(uint256 => bool) public dailyAttendance; // day => attended
    mapping(uint256 => bytes32) public dailyCodes; // day => code hash
    mapping(uint256 => bool) public codeUsed; // day => used
    
    struct ContractModification {
        uint256 newDailySalary;
        address newEmployeeAddress;
        bool employerSigned;
        bool employeeSigned;
        bool isActive;
        uint256 createdAt;
    }
    
    ContractModification public pendingModification;
    bool public hasPendingModification;
    
    event EmployeeApproved(address indexed employee);
    event AttendanceMarked(address indexed employee, uint256 day, uint256 timestamp);
    event SalaryWithdrawn(address indexed employee, uint256 amount, uint256 daysWorked);
    event ContractTerminated(address indexed employer, uint256 refundAmount, uint256 employeePayout);
    event CodeGenerated(uint256 day, bytes32 codeHash);
    event ModificationProposed(uint256 newSalary, address newEmployee);
    event ModificationApproved(uint256 newSalary, address newEmployee);
    event ModificationRejected();
    
    modifier onlyEmployer() {
        require(msg.sender == employer, "Only employer can call this function");
        _;
    }
    
    modifier onlyEmployee() {
        require(msg.sender == employee, "Only employee can call this function");
        _;
    }
    
    modifier onlyActive() {
        require(isActive && !isTerminated, "Contract is not active");
        _;
    }
    
    modifier onlyApproved() {
        require(employeeApproved, "Employee has not approved the contract yet");
        _;
    }
    
    constructor(
        address _employer,
        address _employee,
        uint256 _dailySalary,
        uint256 _probationPercentage,
        bool _isOnProbation,
        uint256 _contractDuration
    ) payable {
        require(msg.value > 0, "Must lock funds for salary");
        
        factory = msg.sender;
        employer = _employer;
        employee = _employee;
        dailySalary = _dailySalary;
        probationPercentage = _probationPercentage;
        isOnProbation = _isOnProbation;
        contractDuration = _contractDuration;
        totalSalaryLocked = msg.value;
        
        isActive = true;
        startDate = block.timestamp;
    }
    
    function approveContract() external onlyEmployee {
        require(!employeeApproved, "Contract already approved");
        require(!isTerminated, "Contract is terminated");
        
        employeeApproved = true;
        emit EmployeeApproved(employee);
    }
    
    function generateDailyCode(uint256 _day) external onlyEmployer onlyActive onlyApproved {
        require(_day >= getCurrentDay(), "Cannot generate code for past days");
        require(dailyCodes[_day] == bytes32(0), "Code already generated for this day");
        
        bytes32 code = keccak256(abi.encodePacked(block.timestamp, block.difficulty, _day, employer));
        dailyCodes[_day] = code;
        
        emit CodeGenerated(_day, code);
    }
    
    function markAttendance(uint256 _day, string memory _code) external onlyEmployee onlyActive onlyApproved {
        require(_day <= getCurrentDay(), "Cannot mark attendance for future days");
        require(!dailyAttendance[_day], "Attendance already marked for this day");
        require(!codeUsed[_day], "Code already used for this day");
        require(dailyCodes[_day] != bytes32(0), "No code generated for this day");
        
        bytes32 providedCodeHash = keccak256(abi.encodePacked(_code));
        require(providedCodeHash == dailyCodes[_day], "Invalid attendance code");
        
        dailyAttendance[_day] = true;
        codeUsed[_day] = true;
        attendanceCount++;
        
        emit AttendanceMarked(employee, _day, block.timestamp);
    }
    
    function withdrawSalary() external onlyEmployee onlyActive onlyApproved {
        require(attendanceCount > 0, "No attendance marked");
        
        uint256 earnedAmount = calculateEarnedSalary();
        uint256 availableAmount = earnedAmount - totalWithdrawn;
        
        require(availableAmount > 0, "No salary available for withdrawal");
        require(address(this).balance >= availableAmount, "Insufficient contract balance");
        
        totalWithdrawn += availableAmount;
        
        (bool success, ) = employee.call{value: availableAmount}("");
        require(success, "Transfer failed");
        
        emit SalaryWithdrawn(employee, availableAmount, attendanceCount);
    }
    
    function terminateContract() external onlyEmployer onlyActive {
        require(employeeApproved, "Cannot terminate before employee approval");
        
        uint256 earnedAmount = calculateEarnedSalary();
        uint256 employeePayout = earnedAmount - totalWithdrawn;
        uint256 refundAmount = address(this).balance - employeePayout;
        
        isTerminated = true;
        isActive = false;
        
        // Pay employee earned amount
        if (employeePayout > 0) {
            (bool employeeSuccess, ) = employee.call{value: employeePayout}("");
            require(employeeSuccess, "Employee payout failed");
        }
        
        // Refund remaining to employer
        if (refundAmount > 0) {
            (bool employerSuccess, ) = employer.call{value: refundAmount}("");
            require(employerSuccess, "Employer refund failed");
        }
        
        emit ContractTerminated(employer, refundAmount, employeePayout);
    }
    
    function proposeModification(
        uint256 _newDailySalary,
        address _newEmployeeAddress
    ) external onlyEmployer onlyActive onlyApproved {
        require(!hasPendingModification, "There's already a pending modification");
        require(_newDailySalary > 0, "New salary must be greater than 0");
        require(_newEmployeeAddress != address(0), "Invalid new employee address");
        
        pendingModification = ContractModification({
            newDailySalary: _newDailySalary,
            newEmployeeAddress: _newEmployeeAddress,
            employerSigned: true,
            employeeSigned: false,
            isActive: true,
            createdAt: block.timestamp
        });
        
        hasPendingModification = true;
        emit ModificationProposed(_newDailySalary, _newEmployeeAddress);
    }
    
    function approveModification() external onlyEmployee onlyActive {
        require(hasPendingModification, "No pending modification");
        require(pendingModification.isActive, "Modification is not active");
        require(!pendingModification.employeeSigned, "Already signed by employee");
        
        pendingModification.employeeSigned = true;
        
        // Apply modifications
        dailySalary = pendingModification.newDailySalary;
        employee = pendingModification.newEmployeeAddress;
        
        // Clear pending modification
        delete pendingModification;
        hasPendingModification = false;
        
        emit ModificationApproved(dailySalary, employee);
    }
    
    function rejectModification() external onlyEmployee onlyActive {
        require(hasPendingModification, "No pending modification");
        require(pendingModification.isActive, "Modification is not active");
        
        delete pendingModification;
        hasPendingModification = false;
        
        emit ModificationRejected();
    }
    
    function calculateEarnedSalary() public view returns (uint256) {
        if (attendanceCount == 0) return 0;
        
        uint256 baseSalary = attendanceCount * dailySalary;
        
        if (isOnProbation) {
            return (baseSalary * probationPercentage) / 100;
        }
        
        return baseSalary;
    }
    
    function getAvailableBalance() external view returns (uint256) {
        uint256 earned = calculateEarnedSalary();
        return earned > totalWithdrawn ? earned - totalWithdrawn : 0;
    }
    
    function getCurrentDay() public view returns (uint256) {
        return (block.timestamp - startDate) / 1 days;
    }
    
    function getDailyCodeHash(uint256 _day) external view returns (bytes32) {
        return dailyCodes[_day];
    }
    
    function hasAttendanceForDay(uint256 _day) external view returns (bool) {
        return dailyAttendance[_day];
    }
    
    function getContractInfo() external view returns (
        address _employer,
        address _employee,
        uint256 _dailySalary,
        uint256 _attendanceCount,
        uint256 _totalWithdrawn,
        bool _isActive,
        bool _employeeApproved,
        bool _isOnProbation,
        uint256 _probationPercentage
    ) {
        return (
            employer,
            employee,
            dailySalary,
            attendanceCount,
            totalWithdrawn,
            isActive,
            employeeApproved,
            isOnProbation,
            probationPercentage
        );
    }
    
    function getPendingModification() external view returns (ContractModification memory) {
        return pendingModification;
    }
    
    // Emergency function - only factory owner can call in case of issues
    function emergencyWithdraw() external {
        require(msg.sender == factory, "Only factory can call this");
        
        uint256 balance = address(this).balance;
        (bool success, ) = factory.call{value: balance}("");
        require(success, "Emergency withdrawal failed");
    }
}