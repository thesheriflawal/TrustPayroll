// Contract addresses on Lisk Sepolia
export const CONTRACT_ADDRESSES = {
  FACTORY: "0x7a329c02653847C24394474c869B51938C655FAA",
  ATTENDANCE_MANAGER: "0x0c679451EF59d6F041eB0EeBeE0EA9CF5F9FF185",
  ADMIN_DASHBOARD: "0x039a170638E3019915b6983f771fBE96DB297c11",
  EMPLOYEE_DASHBOARD: "0x13B1c95f92F641b9BEc267976b1E96a01c191016",
  EMPLOYER_DASHBOARD: "0xd7Db5e905d19e70984973297AC3B574c9801b406",
} as const

// Lisk Sepolia network configuration
export const LISK_SEPOLIA = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  network: "lisk-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
    public: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://sepolia-blockscout.lisk.com" },
  },
  testnet: true,
} as const
