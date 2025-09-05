export const FACTORY_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "OrganizationRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "org",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "SalaryContractCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "admins",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allContracts",
    outputs: [
      {
        internalType: "contract SalaryContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allOrganizations",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_probationPercentage",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_contractDuration",
        type: "uint256",
      },
    ],
    name: "createSalaryContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllContracts",
    outputs: [
      {
        internalType: "contract SalaryContract[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOrganizations",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_org",
        type: "address",
      },
    ],
    name: "getOrganizationContracts",
    outputs: [
      {
        internalType: "contract SalaryContract[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_org",
        type: "address",
      },
    ],
    name: "getOrganizationDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct SalaryStreamingFactory.Organization",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalContracts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalOrganizations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isOrganization",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "organizationContracts",
    outputs: [
      {
        internalType: "contract SalaryContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "organizations",
    outputs: [
      {
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalEmployees",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSalariesLocked",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "registerOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_org",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "updateOrganizationStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const ADMIN_DASHBOARD_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalOrgs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalEmployees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalLocked",
        type: "uint256",
      },
    ],
    name: "PlatformStatsUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract SalaryStreamingFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOrganizationsSummary",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeContracts",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.OrganizationSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "getContractDetails",
    outputs: [
      {
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attendanceCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWithdrawn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableBalance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "employeeApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "probationPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contractBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_orgAddress",
        type: "address",
      },
    ],
    name: "getOrganizationEmployees",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "address",
            name: "employee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attendanceCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeApproved",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.EmployeeContractSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlatformStats",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalOrganizations",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeContracts",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "terminatedContracts",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.PlatformStats",
        name: "stats",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
    ],
    name: "getRecentContracts",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "address",
            name: "employee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attendanceCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeApproved",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.EmployeeContractSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
    ],
    name: "getTopOrganizationsByEmployees",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeContracts",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.OrganizationSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "searchOrganizationByName",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeContracts",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct AdminDashboard.OrganizationSummary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const EMPLOYER_DASHBOARD_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "CodeGenerated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "ContractTerminated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "EmployeeAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_contractAddresses",
        type: "address[]",
      },
    ],
    name: "bulkGenerateCodes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_probationPercentage",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_contractDuration",
        type: "uint256",
      },
    ],
    name: "createSalaryContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract SalaryStreamingFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "generateDailyCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "generateTodaysCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "getContractDetails",
    outputs: [
      {
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attendanceCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWithdrawn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contractBalance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "employeeApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "probationPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contractDuration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_days",
        type: "uint256",
      },
    ],
    name: "getEmployeeAttendanceHistory",
    outputs: [
      {
        internalType: "uint256[]",
        name: "attendanceDays",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "attendanceStatus",
        type: "bool[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
    ],
    name: "getEmployeesList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employeeAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attendanceCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableBalance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeApproved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isOnProbation",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "probationPercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "contractDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentDay",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "todayAttendanceMarked",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "todayCodeGenerated",
            type: "bool",
          },
        ],
        internalType: "struct EmployerDashboard.EmployeeInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
    ],
    name: "getEmployerStats",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeEmployees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSalariesLocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPaidOut",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pendingApprovals",
            type: "uint256",
          },
        ],
        internalType: "struct EmployerDashboard.EmployerStats",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
    ],
    name: "getTopPerformingEmployees",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employeeAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attendanceCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableBalance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeApproved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isOnProbation",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "probationPercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "contractDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentDay",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "todayAttendanceMarked",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "todayCodeGenerated",
            type: "bool",
          },
        ],
        internalType: "struct EmployerDashboard.EmployeeInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_newDailySalary",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_newEmployeeAddress",
        type: "address",
      },
    ],
    name: "proposeModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "terminateContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const EMPLOYEE_DASHBOARD_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "AttendanceMarked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "ContractApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SalaryWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "approveContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "approveModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract SalaryStreamingFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getAttendanceHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "day",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "marked",
            type: "bool",
          },
        ],
        internalType: "struct EmployeeDashboard.AttendanceRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getContractSummary",
    outputs: [
      {
        internalType: "uint256",
        name: "totalDaysWorked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalEarned",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWithdrawn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dailyEarnings",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "canWithdraw",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getEmployeeContracts",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attendanceCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableBalance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeApproved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isOnProbation",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "probationPercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "contractDuration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "employerName",
            type: "string",
          },
        ],
        internalType: "struct EmployeeDashboard.EmployeeContractInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getPendingApprovals",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "dailySalary",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isOnProbation",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "probationPercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "contractDuration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "employerName",
            type: "string",
          },
        ],
        internalType: "struct EmployeeDashboard.PendingApproval[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getPendingModification",
    outputs: [
      {
        internalType: "bool",
        name: "hasPendingModification",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "newDailySalary",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newEmployeeAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "employerSigned",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "employeeSigned",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getTodaysAttendanceStatus",
    outputs: [
      {
        internalType: "bool",
        name: "canMarkAttendance",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "alreadyMarked",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "currentDay",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "codeGenerated",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_code",
        type: "string",
      },
    ],
    name: "markAttendance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "rejectModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "withdrawSalary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const SALARY_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_probationPercentage",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_contractDuration",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "AttendanceMarked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "CodeGenerated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "employeePayout",
        type: "uint256",
      },
    ],
    name: "ContractTerminated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
    ],
    name: "EmployeeApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newSalary",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newEmployee",
        type: "address",
      },
    ],
    name: "ModificationApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newSalary",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newEmployee",
        type: "address",
      },
    ],
    name: "ModificationProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "ModificationRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "daysWorked",
        type: "uint256",
      },
    ],
    name: "SalaryWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "approveContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "approveModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "attendanceCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "calculateEarnedSalary",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "codeUsed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "dailyAttendance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "dailyCodes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dailySalary",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "employee",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "employeeApproved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "employer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "generateDailyCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAvailableBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractInfo",
    outputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dailySalary",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_attendanceCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalWithdrawn",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_employeeApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_isOnProbation",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_probationPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "getDailyCodeHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingModification",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "newDailySalary",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "newEmployeeAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "employerSigned",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "employeeSigned",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct SalaryContract.ContractModification",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "hasAttendanceForDay",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasPendingModification",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOnProbation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTerminated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_code",
        type: "string",
      },
    ],
    name: "markAttendance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingModification",
    outputs: [
      {
        internalType: "uint256",
        name: "newDailySalary",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newEmployeeAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "employerSigned",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "employeeSigned",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "probationPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newDailySalary",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_newEmployeeAddress",
        type: "address",
      },
    ],
    name: "proposeModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rejectModification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "terminateContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSalaryLocked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalWithdrawn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawSalary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const ATTENDANCE_MANAGER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "AttendanceMarked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "CodeGenerated",
    type: "event",
  },
  {
    inputs: [],
    name: "CODE_VALIDITY_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "attendanceCodes",
    outputs: [
      {
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isUsed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "employeeAttendanceDays",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "employeeEmployerDayAttendance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "employerDailyCodes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_salaryContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
    ],
    name: "generateAttendanceCode",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "getActiveCodeForEmployeeDay",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_codeHash",
        type: "bytes32",
      },
    ],
    name: "getCodeDetails",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "codeHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "expiryTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "address",
            name: "employee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "day",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUsed",
            type: "bool",
          },
        ],
        internalType: "struct AttendanceManager.AttendanceCode",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
    ],
    name: "getEmployeeAttendanceDays",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hasAttendanceForDay",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "hasEmployeeAttendedDay",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_codeHash",
        type: "bytes32",
      },
    ],
    name: "isCodeValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_salaryContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_codeHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
    ],
    name: "verifyAndMarkAttendance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
