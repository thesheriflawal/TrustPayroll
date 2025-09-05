// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SalaryContract.sol";
import "./SalaryStreamingFactory.sol";

contract EmployeeDashboard {
    SalaryStreamingFactory public factory;
    
    struct EmployeeContractInfo {
        address contractAddress;
        address employer;
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
        string employerName;
    }
    
    struct AttendanceRecord {
        uint256 day;
        uint256 timestamp;
        bool marked;
    }
    
    struct PendingApproval {
        address contractAddress;
        address employer;
        uint256 dailySalary;
        bool isOnProbation;
        uint256 probationPercentage;
        uint256 contractDuration;
        string employerName;
    }
    
    event AttendanceMarked(address indexed employee, address indexed contractAddress, uint256 day);
    event SalaryWithdrawn(address indexed employee, uint256 amount);
    event ContractApproved(address indexed employee, address indexed contractAddress);
    
    constructor(address _factoryAddress) {
        factory = SalaryStreamingFactory(_factoryAddress);
    }
    
    function getEmployeeContracts(address _employee) external view returns (EmployeeContractInfo[] memory) {
        SalaryContract[] memory allContracts = factory.getAllContracts();
        
        // Count employee's contracts first
        uint256 employeeContractCount = 0;
        for (uint256 i = 0; i < allContracts.length; i++) {
            if (allContracts[i].employee() == _employee) {
                employeeContractCount++;
            }
        }
        
        EmployeeContractInfo[] memory employeeContracts = new EmployeeContractInfo[](employeeContractCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allContracts.length; i++) {
            SalaryContract salaryContract = allContracts[i];
            
            if (salaryContract.employee() == _employee) {
                (
                    address employer,
                    address employee,
                    uint256 dailySalary,
                    uint256 attendanceCount,
                    uint256 totalWithdrawn,
                    bool isActive,
                    bool employeeApproved,
                    bool isOnProbation,
                    uint256 probationPercentage
                ) = salaryContract.getContractInfo();
                
                // Get employer name
                SalaryStreamingFactory.Organization memory org = factory.getOrganizationDetails(employer);
                
                employeeContracts[index] = EmployeeContractInfo({
                    contractAddress: address(salaryContract),
                    employer: employer,
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
                    employerName: org.name
                });
                
                index++;
            }
        }
        
        return employeeContracts;
    }
    
    function getPendingApprovals(address _employee) external view returns (PendingApproval[] memory) {
        SalaryContract[] memory allContracts = factory.getAllContracts();
        
        // Count pending approvals
        uint256 pendingCount = 0;
        for (uint256 i = 0; i < allContracts.length; i++) {
            SalaryContract salaryContract = allContracts[i];
            if (salaryContract.employee() == _employee && !salaryContract.employeeApproved() && !salaryContract.isTerminated()) {
                pendingCount++;
            }
        }
        
        PendingApproval[] memory pendingApprovals = new PendingApproval[](pendingCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allContracts.length; i++) {
            SalaryContract salaryContract = allContracts[i];
            
            if (salaryContract.employee() == _employee && !salaryContract.employeeApproved() && !salaryContract.isTerminated()) {
                (
                    address employer,
                    ,
                    uint256 dailySalary,
                    ,
                    ,
                    ,
                    ,
                    bool isOnProbation,
                    uint256 probationPercentage
                ) = salaryContract.getContractInfo();
                
                SalaryStreamingFactory.Organization memory org = factory.getOrganizationDetails(employer);
                
                pendingApprovals[index] = PendingApproval({
                    contractAddress: address(salaryContract),
                    employer: employer,
                    dailySalary: dailySalary,
                    isOnProbation: isOnProbation,
                    probationPercentage: probationPercentage,
                    contractDuration: salaryContract.contractDuration(),
                    employerName: org.name
                });
                
                index++;
            }
        }
        
        return pendingApprovals;
    }
    
    function approveContract(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == msg.sender, "Not authorized to approve this contract");
        
        salaryContract.approveContract();
        emit ContractApproved(msg.sender, _contractAddress);
    }
    
    function markAttendance(address _contractAddress, uint256 _day, string memory _code) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == msg.sender, "Not authorized to mark attendance for this contract");
        
        salaryContract.markAttendance(_day, _code);
        emit AttendanceMarked(msg.sender, _contractAddress, _day);
    }
    
    function withdrawSalary(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == msg.sender, "Not authorized to withdraw from this contract");
        
        uint256 availableBalance = salaryContract.getAvailableBalance();
        require(availableBalance > 0, "No salary available for withdrawal");
        
        salaryContract.withdrawSalary();
        emit SalaryWithdrawn(msg.sender, availableBalance);
    }
    
    function getAttendanceHistory(address _contractAddress, address _employee) external view returns (AttendanceRecord[] memory) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == _employee, "Not authorized to view attendance for this contract");
        
        uint256 currentDay = salaryContract.getCurrentDay();
        AttendanceRecord[] memory records = new AttendanceRecord[](currentDay + 1);
        
        for (uint256 i = 0; i <= currentDay; i++) {
            records[i] = AttendanceRecord({
                day: i,
                timestamp: salaryContract.startDate() + (i * 1 days),
                marked: salaryContract.hasAttendanceForDay(i)
            });
        }
        
        return records;
    }
    
    function getContractSummary(address _contractAddress, address _employee) external view returns (
        uint256 totalDaysWorked,
        uint256 totalEarned,
        uint256 totalWithdrawn,
        uint256 availableBalance,
        uint256 dailyEarnings,
        bool canWithdraw
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == _employee, "Not authorized to view this contract");
        
        (
            ,
            ,
            uint256 dailySalary,
            uint256 attendanceCount,
            uint256 withdrawn,
            bool isActive,
            bool employeeApproved,
            bool isOnProbation,
            uint256 probationPercentage
        ) = salaryContract.getContractInfo();
        
        totalDaysWorked = attendanceCount;
        totalWithdrawn = withdrawn;
        availableBalance = salaryContract.getAvailableBalance();
        
        // Calculate earnings based on probation status
        if (isOnProbation) {
            dailyEarnings = (dailySalary * probationPercentage) / 100;
        } else {
            dailyEarnings = dailySalary;
        }
        
        totalEarned = totalDaysWorked * dailyEarnings;
        canWithdraw = isActive && employeeApproved && availableBalance > 0;
    }
    
    function getTodaysAttendanceStatus(address _contractAddress, address _employee) external view returns (
        bool canMarkAttendance,
        bool alreadyMarked,
        uint256 currentDay,
        bool codeGenerated
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == _employee, "Not authorized to view this contract");
        
        currentDay = salaryContract.getCurrentDay();
        alreadyMarked = salaryContract.hasAttendanceForDay(currentDay);
        codeGenerated = salaryContract.getDailyCodeHash(currentDay) != bytes32(0);
        
        (
            ,
            ,
            ,
            ,
            ,
            bool isActive,
            bool employeeApproved,
            ,
            
        ) = salaryContract.getContractInfo();
        
        canMarkAttendance = isActive && employeeApproved && !alreadyMarked && codeGenerated;
    }
    
    function approveModification(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == msg.sender, "Not authorized to approve modification for this contract");
        
        salaryContract.approveModification();
    }
    
    function rejectModification(address _contractAddress) external {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == msg.sender, "Not authorized to reject modification for this contract");
        
        salaryContract.rejectModification();
    }
    
    function getPendingModification(address _contractAddress, address _employee) external view returns (
        bool hasPendingModification,
        uint256 newDailySalary,
        address newEmployeeAddress,
        bool employerSigned,
        bool employeeSigned,
        uint256 createdAt
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        require(salaryContract.employee() == _employee, "Not authorized to view modification for this contract");
        
        hasPendingModification = salaryContract.hasPendingModification();
        
        if (hasPendingModification) {
            SalaryContract.ContractModification memory modification = salaryContract.getPendingModification();
            newDailySalary = modification.newDailySalary;
            newEmployeeAddress = modification.newEmployeeAddress;
            employerSigned = modification.employerSigned;
            employeeSigned = modification.employeeSigned;
            createdAt = modification.createdAt;
        }
    }
}