// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SalaryContract.sol";

contract AttendanceManager {
    struct AttendanceCode {
        bytes32 codeHash;
        uint256 expiryTime;
        bool isActive;
        address employer;
        address employee;
        uint256 day;
        bool isUsed; // Track if code has been used
    }
    
    mapping(bytes32 => AttendanceCode) public attendanceCodes;
    mapping(address => mapping(uint256 => bytes32)) public employerDailyCodes; // employer => day => codeHash
    mapping(address => uint256[]) public employeeAttendanceDays;
    mapping(address => mapping(uint256 => bool)) public hasAttendanceForDay; // employee => day => hasAttended
    mapping(address => mapping(address => mapping(uint256 => bool))) public employeeEmployerDayAttendance; // employee => employer => day => hasAttended
    
    uint256 public constant CODE_VALIDITY_DURATION = 24 hours;
    
    event CodeGenerated(address indexed employer, address indexed employee, bytes32 indexed codeHash, uint256 expiryTime, uint256 day);
    event AttendanceMarked(address indexed employee, address indexed employer, uint256 day, bytes32 codeHash);
    
    function generateAttendanceCode(
        address _salaryContract,
        address _employee,
        uint256 _day,
        uint256 _nonce
    ) external returns (bytes32) {
        SalaryContract salaryContract = SalaryContract(payable(_salaryContract));
        require(msg.sender == salaryContract.employer(), "Only employer can generate codes");
        
        // Check if employee has already attended this day for this employer
        require(!employeeEmployerDayAttendance[_employee][msg.sender][_day], "Employee already attended this day");
        
        // Check if there's already an active code for this employee and day
        bytes32 existingCodeHash = employerDailyCodes[msg.sender][_day];
        if (existingCodeHash != bytes32(0)) {
            AttendanceCode memory existingCode = attendanceCodes[existingCodeHash];
            if (existingCode.employee == _employee && existingCode.isActive && !existingCode.isUsed) {
                require(block.timestamp > existingCode.expiryTime, "Active code already exists for this employee and day");
            }
        }
        
        // Generate unique code
        bytes32 codeHash = keccak256(abi.encodePacked(
            msg.sender,
            _employee,
            _day,
            block.timestamp,
            block.difficulty,
            _nonce
        ));
        
        // Ensure the generated hash is unique
        require(attendanceCodes[codeHash].codeHash == bytes32(0), "Code hash collision, try again with different nonce");
        
        uint256 expiryTime = block.timestamp + CODE_VALIDITY_DURATION;
        
        // Invalidate any existing code for this day
        if (existingCodeHash != bytes32(0)) {
            attendanceCodes[existingCodeHash].isActive = false;
        }
        
        attendanceCodes[codeHash] = AttendanceCode({
            codeHash: codeHash,
            expiryTime: expiryTime,
            isActive: true,
            employer: msg.sender,
            employee: _employee,
            day: _day,
            isUsed: false
        });
        
        employerDailyCodes[msg.sender][_day] = codeHash;
        
        emit CodeGenerated(msg.sender, _employee, codeHash, expiryTime, _day);
        return codeHash;
    }
    
    function verifyAndMarkAttendance(
        address _salaryContract,
        bytes32 _codeHash,
        uint256 _day
    ) external returns (bool) {
        SalaryContract salaryContract = SalaryContract(payable(_salaryContract));
        require(msg.sender == salaryContract.employee(), "Only employee can mark attendance");
        
        AttendanceCode storage code = attendanceCodes[_codeHash];
        
        require(code.codeHash != bytes32(0), "Code does not exist");
        require(code.isActive, "Code is not active");
        require(!code.isUsed, "Code has already been used");
        require(block.timestamp <= code.expiryTime, "Code has expired");
        require(code.employee == msg.sender, "Code not assigned to this employee");
        require(code.day == _day, "Code day mismatch");
        
        // Check if employee has already attended this day for this employer
        require(!employeeEmployerDayAttendance[msg.sender][code.employer][_day], "Already marked attendance for this day");
        
        // Mark code as used and deactivate it
        code.isUsed = true;
        code.isActive = false;
        
        // Record attendance
        employeeAttendanceDays[msg.sender].push(_day);
        hasAttendanceForDay[msg.sender][_day] = true;
        employeeEmployerDayAttendance[msg.sender][code.employer][_day] = true;
        
        emit AttendanceMarked(msg.sender, code.employer, _day, _codeHash);
        return true;
    }
    
    function getEmployeeAttendanceDays(address _employee) external view returns (uint256[] memory) {
        return employeeAttendanceDays[_employee];
    }
    
    function isCodeValid(bytes32 _codeHash) external view returns (bool) {
        AttendanceCode memory code = attendanceCodes[_codeHash];
        return code.codeHash != bytes32(0) && 
               code.isActive && 
               !code.isUsed && 
               block.timestamp <= code.expiryTime;
    }
    
    function getCodeDetails(bytes32 _codeHash) external view returns (AttendanceCode memory) {
        return attendanceCodes[_codeHash];
    }
    
    function hasEmployeeAttendedDay(address _employee, address _employer, uint256 _day) external view returns (bool) {
        return employeeEmployerDayAttendance[_employee][_employer][_day];
    }
    
    function getActiveCodeForEmployeeDay(address _employer, address _employee, uint256 _day) external view returns (bytes32) {
        bytes32 codeHash = employerDailyCodes[_employer][_day];
        if (codeHash != bytes32(0)) {
            AttendanceCode memory code = attendanceCodes[codeHash];
            if (code.employee == _employee && code.isActive && !code.isUsed && block.timestamp <= code.expiryTime) {
                return codeHash;
            }
        }
        return bytes32(0);
    }
}