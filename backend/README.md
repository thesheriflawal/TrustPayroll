
```markdown
# TrustPayroll  

A decentralized **Salary Streaming Platform** built on smart contracts.  
TrustPayroll enables organizations to register employees and stream salaries based on verified daily attendance. Employees are paid in real-time, employers’ funds are locked securely, and the system ensures transparency between both parties.  


## 🚀 Features  

- **Salary Streaming:** Employees earn their salary daily and can withdraw anytime based on verified attendance.  
- **Attendance Verification:** A unique random code is generated daily by the employer, which employees must input to mark attendance.  
- **Locked Funds:** Employers deposit salary funds that are locked in the contract, ensuring they cannot withdraw or misuse them.  
- **Probation Mode:** Employers can set probation percentages (10%–100%) for employees, determining how much of their salary they can access until probation ends.  
- **Dual Approval System:** Any edits to salary details (amount, address, probation terms) require both employer and employee signatures.  
- **Dashboards:**  
  - **Admin Dashboard** → View all organizations, salaries, and employees (read-only).  
  - **Employer Dashboard** → Register/manage employees, approve terms, and monitor payments.  
  - **Employee Dashboard** → View personal salary details, attendance logs, and withdraw earnings.  
- **Transparency:** Both employers and employees have clear visibility of salary status.  


## 📜 Smart Contracts  

TrustPayroll is powered by multiple smart contracts to separate responsibilities and improve modularity:  

- **SalaryStreamingFactory.sol** → Factory contract for creating and managing salary streaming instances.  
- **AttendanceManager.sol** → Handles employee attendance verification via random daily codes.  
- **AdminDashboard.sol** → Allows admins to view organization-wide salary information (read-only).  
- **EmployerDashboard.sol** → Interface for employers to register employees, set probation, and deposit salaries.  
- **EmployeeDashboard.sol** → Interface for employees to approve terms, mark attendance, and withdraw funds.  



## 🛠 Deployment Details  

Deployed on **Lisk Sepolia** testnet.  

```

SalaryStreamingFactory: 0x7a329c02653847C24394474c869B51938C655FAA
AttendanceManager:      0x0c679451EF59d6F041eB0EeBeE0EA9CF5F9FF185
AdminDashboard:         0x039a170638E3019915b6983f771fBE96DB297c11
EmployeeDashboard:      0x13B1c95f92F641b9BEc267976b1E96a01c191016
EmployerDashboard:      0xd7Db5e905d19e70984973297AC3B574c9801b406

````

Deployment Summary:  

```json
{
  "factory": "0x7a329c02653847C24394474c869B51938C655FAA",
  "attendanceManager": "0x0c679451EF59d6F041eB0EeBeE0EA9CF5F9FF185",
  "adminDashboard": "0x039a170638E3019915b6983f771fBE96DB297c11",
  "employeeDashboard": "0x13B1c95f92F641b9BEc267976b1E96a01c191016",
  "employerDashboard": "0xd7Db5e905d19e70984973297AC3B574c9801b406",
  "deployer": "0x5d813b3c40b0b0e012e5156fc41963C56E3bf1DD",
  "network": "liskSepolia"
}
````


## ⚙️ How It Works

1. **Employer Onboarding**

   * Registers organization on the platform.
   * Adds employees, specifying salary, wallet address, and probation % (if applicable).
   * Deposits salary funds (locked in contract).

2. **Employee Onboarding**

   * Views pending salary contract created by employer.
   * Approves the contract by signing a transaction.
   * Accesses personal dashboard to track salary and attendance.

3. **Attendance Tracking**

   * Employer generates a daily code.
   * Employee enters the code to mark attendance.
   * Smart contract verifies attendance and updates earned salary.

4. **Salary Withdrawal**

   * Employee can withdraw earned salary anytime.
   * Contract calculates payable amount based on attendance and probation terms.

5. **Termination / Probation Handling**

   * If an employee is terminated, worked days are paid out, and remaining funds refunded to employer.
   * Probation percentages ensure partial access until probation ends.


## 🔐 Security & Transparency

* Employers cannot reclaim deposited salaries except for unearned amounts after termination.
* Employees only access funds they have earned through verified attendance.
* Any critical change requires dual signatures (employer + employee).
* Admins have **view-only** permissions, ensuring transparency but preventing interference.


## 📂 Repository Structure

```
/contracts       # Solidity smart contracts
/scripts         # Deployment and utility scripts
/test            # Unit tests for smart contracts
/frontend        # Frontend (to be implemented)
```


## 🖥 Frontend (To Be Implemented)

The frontend will handle:

* Employer/Employee/Admin dashboards
* Attendance input system
* Probation agreements & approval
* Withdraw salary functionality
* Real-time salary status display

⚠️ **Note:** All UI-related logic is handled on the frontend, while salary logic, attendance, and fund handling remain fully on-chain.


## 📌 Roadmap

* [ ] Finalize frontend integration with deployed contracts.
* [ ] Add advanced analytics for employers.
* [ ] Enable multi-admin support with granular permissions.
* [ ] Deploy to mainnet after testing.


## 👨‍💻 Author

**Sherif Lawal ([@thesheriflawal](https://github.com/thesheriflawal))**


## 📄 License

This project is licensed under the **MIT License**.
