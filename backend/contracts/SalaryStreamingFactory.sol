// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SalaryContract.sol";

contract SalaryStreamingFactory {
    address public owner;
    mapping(address => bool) public admins;
    
    struct Organization {
        address orgAddress;
        string name;
        string email;
        uint256 totalEmployees;
        uint256 totalSalariesLocked;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(address => Organization) public organizations;
    mapping(address => SalaryContract[]) public organizationContracts;
    mapping(address => bool) public isOrganization;
    
    address[] public allOrganizations;
    SalaryContract[] public allContracts;
    
    event OrganizationRegistered(address indexed orgAddress, string name);
    event SalaryContractCreated(address indexed org, address indexed employee, address contractAddress);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender] || msg.sender == owner, "Only admin can call this function");
        _;
    }
    
    modifier onlyOrganization() {
        require(isOrganization[msg.sender], "Only registered organizations can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }
    
    function registerOrganization(
        string memory _name,
        string memory _email
    ) external {
        require(!isOrganization[msg.sender], "Organization already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        
        organizations[msg.sender] = Organization({
            orgAddress: msg.sender,
            name: _name,
            email: _email,
            totalEmployees: 0,
            totalSalariesLocked: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        isOrganization[msg.sender] = true;
        allOrganizations.push(msg.sender);
        
        emit OrganizationRegistered(msg.sender, _name);
    }
    
    function createSalaryContract(
        address _employee,
        uint256 _dailySalary,
        uint256 _probationPercentage, // 10-100
        bool _isOnProbation,
        uint256 _contractDuration // in days
    ) external payable onlyOrganization {
        require(_employee != address(0), "Invalid employee address");
        require(_dailySalary > 0, "Daily salary must be greater than 0");
        require(_probationPercentage >= 10 && _probationPercentage <= 100, "Invalid probation percentage");
        require(_contractDuration > 0, "Contract duration must be greater than 0");
        
        uint256 totalSalary = _dailySalary * _contractDuration;
        require(msg.value >= totalSalary, "Insufficient funds locked for salary");
        
        SalaryContract newContract = new SalaryContract{value: msg.value}(
            msg.sender,
            _employee,
            _dailySalary,
            _probationPercentage,
            _isOnProbation,
            _contractDuration
        );
        
        organizationContracts[msg.sender].push(newContract);
        allContracts.push(newContract);
        
        organizations[msg.sender].totalEmployees++;
        organizations[msg.sender].totalSalariesLocked += msg.value;
        
        emit SalaryContractCreated(msg.sender, _employee, address(newContract));
    }
    
    function addAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        require(!admins[_admin], "Already an admin");
        
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }
    
    function removeAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        require(admins[_admin], "Not an admin");
        require(_admin != owner, "Cannot remove owner");
        
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }
    
    function updateOrganizationStatus(address _org, bool _status) external onlyAdmin {
        require(isOrganization[_org], "Organization not found");
        organizations[_org].isActive = _status;
    }
    
    function getOrganizationContracts(address _org) external view returns (SalaryContract[] memory) {
        return organizationContracts[_org];
    }
    
    function getAllOrganizations() external view returns (address[] memory) {
        return allOrganizations;
    }
    
    function getAllContracts() external view returns (SalaryContract[] memory) {
        return allContracts;
    }
    
    function getOrganizationDetails(address _org) external view returns (Organization memory) {
        return organizations[_org];
    }
    
    function getTotalOrganizations() external view returns (uint256) {
        return allOrganizations.length;
    }
    
    function getTotalContracts() external view returns (uint256) {
        return allContracts.length;
    }
}