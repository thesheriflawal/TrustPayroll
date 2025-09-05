// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SalaryStreamingFactory.sol";
import "./SalaryContract.sol";

contract AdminDashboard {
    SalaryStreamingFactory public factory;
    
    struct PlatformStats {
        uint256 totalOrganizations;
        uint256 totalEmployees;
        uint256 totalSalariesLocked;
        uint256 totalWithdrawn;
        uint256 activeContracts;
        uint256 terminatedContracts;
    }
    
    struct OrganizationSummary {
        address orgAddress;
        string name;
        string email;
        uint256 totalEmployees;
        uint256 totalSalariesLocked;
        uint256 activeContracts;
        bool isActive;
        uint256 createdAt;
    }
    
    struct EmployeeContractSummary {
        address contractAddress;
        address employer;
        address employee;
        uint256 dailySalary;
        uint256 attendanceCount;
        uint256 totalWithdrawn;
        bool isActive;
        bool employeeApproved;
        uint256 startDate;
    }
    
    event PlatformStatsUpdated(uint256 totalOrgs, uint256 totalEmployees, uint256 totalLocked);
    
    modifier onlyAdmin() {
        require(factory.admins(msg.sender) || msg.sender == factory.owner(), "Only admin can access");
        _;
    }
    
    constructor(address _factoryAddress) {
        factory = SalaryStreamingFactory(_factoryAddress);
    }
    
    // Helper function to create EmployeeContractSummary
    function _createEmployeeContractSummary(SalaryContract salaryContract) internal view returns (EmployeeContractSummary memory) {
        (
            address employer,
            address employee,
            uint256 dailySalary,
            uint256 attendanceCount,
            uint256 totalWithdrawn,
            bool isActive,
            bool employeeApproved,
            ,
            
        ) = salaryContract.getContractInfo();
        
        return EmployeeContractSummary({
            contractAddress: address(salaryContract),
            employer: employer,
            employee: employee,
            dailySalary: dailySalary,
            attendanceCount: attendanceCount,
            totalWithdrawn: totalWithdrawn,
            isActive: isActive,
            employeeApproved: employeeApproved,
            startDate: salaryContract.startDate()
        });
    }
    
    function getPlatformStats() external view onlyAdmin returns (PlatformStats memory stats) {
        address[] memory orgs = factory.getAllOrganizations();
        SalaryContract[] memory contracts = factory.getAllContracts();
        
        stats.totalOrganizations = orgs.length;
        
        uint256 totalLocked = 0;
        uint256 totalWithdrawn = 0;
        uint256 activeContracts = 0;
        uint256 terminatedContracts = 0;
        
        for (uint256 i = 0; i < contracts.length; i++) {
            SalaryContract salaryContract = contracts[i];
            
            if (salaryContract.isActive()) {
                activeContracts++;
            } else {
                terminatedContracts++;
            }
            
            totalLocked += salaryContract.totalSalaryLocked();
            totalWithdrawn += salaryContract.totalWithdrawn();
            stats.totalEmployees++;
        }
        
        stats.totalSalariesLocked = totalLocked;
        stats.totalWithdrawn = totalWithdrawn;
        stats.activeContracts = activeContracts;
        stats.terminatedContracts = terminatedContracts;
    }
    
    function getAllOrganizationsSummary() external view onlyAdmin returns (OrganizationSummary[] memory) {
        address[] memory orgAddresses = factory.getAllOrganizations();
        OrganizationSummary[] memory summaries = new OrganizationSummary[](orgAddresses.length);
        
        for (uint256 i = 0; i < orgAddresses.length; i++) {
            address orgAddress = orgAddresses[i];
            SalaryStreamingFactory.Organization memory org = factory.getOrganizationDetails(orgAddress);
            SalaryContract[] memory contracts = factory.getOrganizationContracts(orgAddress);
            
            uint256 activeContracts = 0;
            for (uint256 j = 0; j < contracts.length; j++) {
                if (contracts[j].isActive()) {
                    activeContracts++;
                }
            }
            
            summaries[i] = OrganizationSummary({
                orgAddress: org.orgAddress,
                name: org.name,
                email: org.email,
                totalEmployees: org.totalEmployees,
                totalSalariesLocked: org.totalSalariesLocked,
                activeContracts: activeContracts,
                isActive: org.isActive,
                createdAt: org.createdAt
            });
        }
        
        return summaries;
    }
    
    function getOrganizationEmployees(address _orgAddress) external view onlyAdmin returns (EmployeeContractSummary[] memory) {
        SalaryContract[] memory contracts = factory.getOrganizationContracts(_orgAddress);
        EmployeeContractSummary[] memory employees = new EmployeeContractSummary[](contracts.length);
        
        for (uint256 i = 0; i < contracts.length; i++) {
            employees[i] = _createEmployeeContractSummary(contracts[i]);
        }
        
        return employees;
    }
    
    function getContractDetails(address _contractAddress) external view onlyAdmin returns (
        address employer,
        address employee,
        uint256 dailySalary,
        uint256 attendanceCount,
        uint256 totalWithdrawn,
        uint256 availableBalance,
        bool isActive,
        bool employeeApproved,
        bool isOnProbation,
        uint256 probationPercentage,
        uint256 contractBalance
    ) {
        SalaryContract salaryContract = SalaryContract(payable(_contractAddress));
        
        // Get contract info in a separate scope to avoid stack too deep
        {
            (
                employer,
                employee,
                dailySalary,
                attendanceCount,
                totalWithdrawn,
                isActive,
                employeeApproved,
                isOnProbation,
                probationPercentage
            ) = salaryContract.getContractInfo();
        }
        
        availableBalance = salaryContract.getAvailableBalance();
        contractBalance = address(salaryContract).balance;
    }
    
    function searchOrganizationByName(string memory _name) external view onlyAdmin returns (OrganizationSummary[] memory) {
        address[] memory orgAddresses = factory.getAllOrganizations();
        OrganizationSummary[] memory results = new OrganizationSummary[](orgAddresses.length);
        uint256 resultCount = 0;
        
        for (uint256 i = 0; i < orgAddresses.length; i++) {
            SalaryStreamingFactory.Organization memory org = factory.getOrganizationDetails(orgAddresses[i]);
            
            // Simple string comparison (case sensitive)
            if (keccak256(abi.encodePacked(org.name)) == keccak256(abi.encodePacked(_name))) {
                SalaryContract[] memory contracts = factory.getOrganizationContracts(orgAddresses[i]);
                
                uint256 activeContracts = 0;
                for (uint256 j = 0; j < contracts.length; j++) {
                    if (contracts[j].isActive()) {
                        activeContracts++;
                    }
                }
                
                results[resultCount] = OrganizationSummary({
                    orgAddress: org.orgAddress,
                    name: org.name,
                    email: org.email,
                    totalEmployees: org.totalEmployees,
                    totalSalariesLocked: org.totalSalariesLocked,
                    activeContracts: activeContracts,
                    isActive: org.isActive,
                    createdAt: org.createdAt
                });
                resultCount++;
            }
        }
        
        // Resize array to actual results
        OrganizationSummary[] memory finalResults = new OrganizationSummary[](resultCount);
        for (uint256 i = 0; i < resultCount; i++) {
            finalResults[i] = results[i];
        }
        
        return finalResults;
    }
    
    function getTopOrganizationsByEmployees(uint256 _limit) external view onlyAdmin returns (OrganizationSummary[] memory) {
        address[] memory orgAddresses = factory.getAllOrganizations();
        OrganizationSummary[] memory orgs = new OrganizationSummary[](orgAddresses.length);
        
        // Get all organizations
        for (uint256 i = 0; i < orgAddresses.length; i++) {
            SalaryStreamingFactory.Organization memory org = factory.getOrganizationDetails(orgAddresses[i]);
            SalaryContract[] memory contracts = factory.getOrganizationContracts(orgAddresses[i]);
            
            uint256 activeContracts = 0;
            for (uint256 j = 0; j < contracts.length; j++) {
                if (contracts[j].isActive()) {
                    activeContracts++;
                }
            }
            
            orgs[i] = OrganizationSummary({
                orgAddress: org.orgAddress,
                name: org.name,
                email: org.email,
                totalEmployees: org.totalEmployees,
                totalSalariesLocked: org.totalSalariesLocked,
                activeContracts: activeContracts,
                isActive: org.isActive,
                createdAt: org.createdAt
            });
        }
        
        // Simple bubble sort by total employees (for small datasets)
        for (uint256 i = 0; i < orgs.length - 1; i++) {
            for (uint256 j = 0; j < orgs.length - 1 - i; j++) {
                if (orgs[j].totalEmployees < orgs[j + 1].totalEmployees) {
                    OrganizationSummary memory temp = orgs[j];
                    orgs[j] = orgs[j + 1];
                    orgs[j + 1] = temp;
                }
            }
        }
        
        // Return limited results
        uint256 resultLimit = _limit > orgs.length ? orgs.length : _limit;
        OrganizationSummary[] memory topOrgs = new OrganizationSummary[](resultLimit);
        
        for (uint256 i = 0; i < resultLimit; i++) {
            topOrgs[i] = orgs[i];
        }
        
        return topOrgs;
    }
    
    function getRecentContracts(uint256 _limit) external view onlyAdmin returns (EmployeeContractSummary[] memory) {
        SalaryContract[] memory allContracts = factory.getAllContracts();
        uint256 contractCount = allContracts.length;
        
        if (contractCount == 0) {
            return new EmployeeContractSummary[](0);
        }
        
        uint256 resultLimit = _limit > contractCount ? contractCount : _limit;
        EmployeeContractSummary[] memory recentContracts = new EmployeeContractSummary[](resultLimit);
        
        // Get the most recent contracts (assuming they are added chronologically)
        uint256 startIndex = contractCount - resultLimit;
        
        for (uint256 i = 0; i < resultLimit; i++) {
            recentContracts[i] = _createEmployeeContractSummary(allContracts[startIndex + i]);
        }
        
        return recentContracts;
    }
}