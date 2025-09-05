import { ethers, network } from "hardhat";

interface DeploymentInfo {
  factory: string;
  attendanceManager: string;
  adminDashboard: string;
  employeeDashboard: string;
  employerDashboard: string;
  deployer: string;
  network: string;
}

async function main(): Promise<DeploymentInfo> {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // Deploy SalaryStreamingFactory
  const SalaryStreamingFactory = await ethers.getContractFactory(
    "SalaryStreamingFactory"
  );
  const factory = await SalaryStreamingFactory.deploy();
  await factory.waitForDeployment(); // ✅ ethers v6 syntax

  console.log(
    "SalaryStreamingFactory deployed to:",
    await factory.getAddress()
  );

  // Deploy AttendanceManager
  const AttendanceManager = await ethers.getContractFactory(
    "AttendanceManager"
  );
  const attendanceManager = await AttendanceManager.deploy();
  await attendanceManager.waitForDeployment(); // ✅ ethers v6 syntax

  console.log(
    "AttendanceManager deployed to:",
    await attendanceManager.getAddress()
  );

  // Deploy AdminDashboard
  const AdminDashboard = await ethers.getContractFactory("AdminDashboard");
  const adminDashboard = await AdminDashboard.deploy(
    await factory.getAddress()
  );
  await adminDashboard.waitForDeployment(); // ✅ ethers v6 syntax

  console.log("AdminDashboard deployed to:", await adminDashboard.getAddress());

  // Deploy EmployeeDashboard
  const EmployeeDashboard = await ethers.getContractFactory(
    "EmployeeDashboard"
  );
  const employeeDashboard = await EmployeeDashboard.deploy(
    await factory.getAddress()
  );
  await employeeDashboard.waitForDeployment(); // ✅ ethers v6 syntax

  console.log(
    "EmployeeDashboard deployed to:",
    await employeeDashboard.getAddress()
  );

  // Deploy EmployerDashboard
  const EmployerDashboard = await ethers.getContractFactory(
    "EmployerDashboard"
  );
  const employerDashboard = await EmployerDashboard.deploy(
    await factory.getAddress()
  );
  await employerDashboard.waitForDeployment(); // ✅ ethers v6 syntax

  console.log(
    "EmployerDashboard deployed to:",
    await employerDashboard.getAddress()
  );

  // Save deployment addresses
  const deploymentInfo: DeploymentInfo = {
    factory: await factory.getAddress(),
    attendanceManager: await attendanceManager.getAddress(),
    adminDashboard: await adminDashboard.getAddress(),
    employeeDashboard: await employeeDashboard.getAddress(),
    employerDashboard: await employerDashboard.getAddress(),
    deployer: deployer.address,
    network: network.name,
  };

  console.log("\n=== DEPLOYMENT SUMMARY ===");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
