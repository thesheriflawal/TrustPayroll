// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SalaryStreamingFactory.sol";
import "./SalaryContract.sol";

contract EmployerDashboard {
    SalaryStreamingFactory public factory;
    
    struct EmployerStats {
        uint256 totalEmployees;
        uint256 activeEmployees;
        uint256 totalSalariesLocked;
        uint256 totalPaidOut;
        uint256 pendingApprovals;
    }
    
    struct EmployeeInfo {
        address contractAddress;
        address employeeAddress;
        uint256 dailySalary;
        uint256 attendanceCount;
        uint256 totalWithdrawn;
        uint256 availableBalance;
        bool isActive;
        bool employeeApproved;
        bool isOnProbation;
        uint256 probationPercentage;
        uint256 startDate;
        uint256 contractDuration;
        uint256 currentDay;
        bool todayAttendanceMarked;
        bool todayCodeGenerated;
    }
    
    event CodeGenerated(address indexed employer, address indexed employee, uint256 day);
    event EmployeeAdded(address indexed employer, address indexed employee, address contractAddress);
    event ContractTerminated(address indexed employer, address indexed employee, address contractAddress);
    
    constructor(address _factoryAddress) {
        factory = SalaryStreamingFactory(_factoryAddress);
    }
    
    function getEmployerStats(address _employer) external view returns (EmployerStats memory) {
        require(factory.isOrganization(_employer), "Not a registered organization");
        
        SalaryContract[] memory contracts = factory.getOrganizationContracts(_employer);
        
        EmployerStats memory stats;
        
        for (uint256 i = 0; i < contracts.length; i++) {
            SalaryContract salaryContract = contracts[i];
            
            (
                ,
                ,
                ,
                ,
                uint256 totalWithdrawn,
                bool isActive,
                bool employeeApproved,
                ,
                
            ) = salaryContract.getContractInfo();
            
            stats.totalEmployees++;
            
            if (isActive) {
                stats.activeEmployees++;
            }
            
            if (!employeeApproved && isActive) {
                stats.pendingApprovals++;
            }
            
            stats.totalSalariesLocked += salaryContract.totalSalaryLocked();
            stats.totalPaidOut += totalWithdrawn;
        }
        
        return stats;
    }
    
    function getEmployeesList(address _employer) external view returns (EmployeeInfo[] memory) {
        require(factory.isOrganization(_employer), "Not a registered organization");
        
        SalaryContract[] memory contracts = factory.getOrganizationContracts(_employer);
        EmployeeInfo[] memory employees = new EmployeeInfo[](contracts.length);
        
        for (uint256 i = 0; i < contracts.length; i++) {
            SalaryContract salaryContract = contracts[i];
            
            (
                ,
                address employee,
                uint256 dailySalary,
                uint256 attendanceCount,
                uint256 totalWithdrawn,
                bool isActive,
                bool employeeApproved,
                bool isOnProbation,
                uint256 probationPercentage
            ) = salaryContract.getContractInfo();
            
            uint256 currentDay = salaryContract.getCurrentDay();
            
            employees[i] = EmployeeInfo({
                contractAddress: address(salaryContract),
                employeeAddress: employee,
                dailySalary: dailySalary,
                attendanceCount: attendanceCount,
                totalWithdrawn: totalWithdrawn,
                availableBalance: salaryContract.getAvailableBalance(),
                isActive: isActive,
                employeeApproved: employeeApproved,
                isOnProbation: isOnProbation,
                probationPercentage: probationPercentage,
                startDate: salaryContract.startDate(),
                contractDuration: salaryContract.contractDuration(),
                currentDay: currentDay,
                todayAttendanceMarked: salaryContract.hasAttendanceForDay(currentDay),
                todayCodeGenerated: salaryContract.getDailyCodeHash(currentDay) != bytes32(0)
            });
        }
        
        return employees;
    }
    
    function createSalaryContract(
        address _employee,
        uint256 _dailySalary,
        uint256 _probationPercentage,
        bool _isOnProbation,
        uint256 _contractDuration
    ) external payable {
        require(factory.isOrganization(msg.sender), "Only registered organizations can create contracts");
        
        factory.createSalaryContract{value: msg.value}(
            _employee,
            _dailySalary,
            _probationPercentage,
            _isOnProbation,
            _contractDuration
        );
        
        emit EmployeeAdded(msg.sender, _employee, address(0)); // Contract address will be emitted by factory
    }
    
    function generateDailyCode(address _contractAddress, uint256 _day) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to generate code for this contract");
        
        salaryContract.generateDailyCode(_day);
        
        emit CodeGenerated(msg.sender, salaryContract.employee(), _day);
    }
    
    function generateTodaysCode(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to generate code for this contract");
        
        uint256 currentDay = salaryContract.getCurrentDay();
        salaryContract.generateDailyCode(currentDay);
        
        emit CodeGenerated(msg.sender, salaryContract.employee(), currentDay);
    }
    
    function terminateContract(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to terminate this contract");
        
        address employee = salaryContract.employee();
        salaryContract.terminateContract();
        
        emit ContractTerminated(msg.sender, employee, _contractAddress);
    }
    
    function proposeModification(
        address _contractAddress,
        uint256 _newDailySalary,
        address _newEmployeeAddress
    ) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to modify this contract");
        
        salaryContract.proposeModification(_newDailySalary, _newEmployeeAddress);
    }
    
    function getEmployeeAttendanceHistory(
        address _contractAddress,
        uint256 _days
    ) external view returns (
        uint256[] memory attendanceDays,
        bool[] memory attendanceStatus,
        uint256[] memory timestamps
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to view attendance for this contract");
        
        uint256 currentDay = salaryContract.getCurrentDay();
        uint256 daysToCheck = _days > currentDay + 1 ? currentDay + 1 : _days;
        
        attendanceDays = new uint256[](daysToCheck);
        attendanceStatus = new bool[](daysToCheck);
        timestamps = new uint256[](daysToCheck);
        
        uint256 startDay = currentDay >= daysToCheck - 1 ? currentDay - daysToCheck + 1 : 0;
        
        for (uint256 i = 0; i < daysToCheck; i++) {
            uint256 day = startDay + i;
            attendanceDays[i] = day;
            attendanceStatus[i] = salaryContract.hasAttendanceForDay(day);
            timestamps[i] = salaryContract.startDate() + (day * 1 days);
        }
    }
    
    function getContractDetails(address _contractAddress) external view returns (
        address employee,
        uint256 dailySalary,
        uint256 attendanceCount,
        uint256 totalWithdrawn,
        uint256 availableBalance,
        uint256 contractBalance,
        bool isActive,
        bool employeeApproved,
        bool isOnProbation,
        uint256 probationPercentage,
        uint256 startDate,
        uint256 contractDuration
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employer() == msg.sender, "Not authorized to view this contract");
        
        (
            ,
            employee,
            dailySalary,
            attendanceCount,
            totalWithdrawn,
            isActive,
            employeeApproved,
            isOnProbation,
            probationPercentage
        ) = salaryContract.getContractInfo();
        
        availableBalance = salaryContract.getAvailableBalance();
        contractBalance = address(salaryContract).balance;
        startDate = salaryContract.startDate();
        contractDuration = salaryContract.contractDuration();
    }
    
    function getTopPerformingEmployees(address _employer, uint256 _limit) external view returns (EmployeeInfo[] memory) {
        require(factory.isOrganization(_employer), "Not a registered organization");
        
        SalaryContract[] memory contracts = factory.getOrganizationContracts(_employer);
        EmployeeInfo[] memory employees = new EmployeeInfo[](contracts.length);
        
        // Get all employee info
        for (uint256 i = 0; i < contracts.length; i++) {
            SalaryContract salaryContract = contracts[i];
            
            (
                ,
                address employee,
                uint256 dailySalary,
                uint256 attendanceCount,
                uint256 totalWithdrawn,
                bool isActive,
                bool employeeApproved,
                bool isOnProbation,
                uint256 probationPercentage
            ) = salaryContract.getContractInfo();
            
            uint256 currentDay = salaryContract.getCurrentDay();
            
            employees[i] = EmployeeInfo({
                contractAddress: address(salaryContract),
                employeeAddress: employee,
                dailySalary: dailySalary,
                attendanceCount: attendanceCount,
                totalWithdrawn: totalWithdrawn,
                availableBalance: salaryContract.getAvailableBalance(),
                isActive: isActive,
                employeeApproved: employeeApproved,
                isOnProbation: isOnProbation,
                probationPercentage: probationPercentage,
                startDate: salaryContract.startDate(),
                contractDuration: salaryContract.contractDuration(),
                currentDay: currentDay,
                todayAttendanceMarked: salaryContract.hasAttendanceForDay(currentDay),
                todayCodeGenerated: salaryContract.getDailyCodeHash(currentDay) != bytes32(0)
            });
        }
        
        // Sort by attendance count (simple bubble sort)
        for (uint256 i = 0; i < employees.length - 1; i++) {
            for (uint256 j = 0; j < employees.length - 1 - i; j++) {
                if (employees[j].attendanceCount < employees[j + 1].attendanceCount) {
                    EmployeeInfo memory temp = employees[j];
                    employees[j] = employees[j + 1];
                    employees[j + 1] = temp;
                }
            }
        }
        
        // Return limited results
        uint256 resultLimit = _limit > employees.length ? employees.length : _limit;
        EmployeeInfo[] memory topEmployees = new EmployeeInfo[](resultLimit);
        
        for (uint256 i = 0; i < resultLimit; i++) {
            topEmployees[i] = employees[i];
        }
        
        return topEmployees;
    }
    
    function bulkGenerateCodes(address[] memory _contractAddresses) external {
        for (uint256 i = 0; i < _contractAddresses.length; i++) {
            SalaryContract salaryContract = SalaryContract(payable(_contractAddresses[i]));
            require(salaryContract.employer() == msg.sender, "Not authorized to generate code for this contract");
            
            uint256 currentDay = salaryContract.getCurrentDay();
            
            // Only generate if code doesn't exist for today
            if (salaryContract.getDailyCodeHash(currentDay) == bytes32(0)) {
                salaryContract.generateDailyCode(currentDay);
                emit CodeGenerated(msg.sender, salaryContract.employee(), currentDay);
            }
        }
    }
}
