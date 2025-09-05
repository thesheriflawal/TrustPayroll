"use client";

import { useEffect, useState } from "react";
import { useWeb3 } from "@/lib/web3-provider";
import { useContracts } from "@/hooks/use-contracts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  DollarSign,
  TrendingUp,
  UserPlus,
  QrCode,
  Eye,
  UserX,
  Clock,
  Building,
} from "lucide-react";
import { WalletConnect } from "@/components/wallet-connect";
import { formatEther, parseEther, ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { SALARY_CONTRACT_ABI } from "../../lib/contract-abis";

interface EmployerStats {
  totalEmployees: bigint;
  activeEmployees: bigint;
  totalSalariesLocked: bigint;
  totalPaidOut: bigint;
  pendingApprovals: bigint;
}

interface EmployeeInfo {
  contractAddress: string;
  employeeAddress: string;
  dailySalary: bigint;
  attendanceCount: bigint;
  totalWithdrawn: bigint;
  availableBalance: bigint;
  isActive: boolean;
  employeeApproved: boolean;
  isOnProbation: boolean;
  probationPercentage: bigint;
  startDate: bigint;
  contractDuration: bigint;
  currentDay: bigint;
  todayAttendanceMarked: boolean;
  todayCodeGenerated: boolean;
}

interface AttendanceCode {
  contractAddress: string;
  code: string;
  generatedAt: number;
}

interface NewEmployee {
  address: string;
  dailySalary: string;
  totalSalary: string;
  isOnProbation: boolean;
  probationPercentage: string;
  contractDuration: string;
}

export default function EmployerDashboard() {
  const { isConnected, account } = useWeb3();
  const { contracts } = useContracts();
  const [stats, setStats] = useState<EmployerStats | null>(null);
  const [employees, setEmployees] = useState<EmployeeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(
    null
  );
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterOrg, setShowRegisterOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [attendanceCodes, setAttendanceCodes] = useState<AttendanceCode[]>([]);
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    address: "",
    dailySalary: "",
    isOnProbation: false,
    probationPercentage: "100",
    contractDuration: "365",
    totalSalary: "",
  });

  const checkOrganizationRegistration = async () => {
    if (!contracts?.factory || !account) return;

    try {
      const orgInfo = await contracts.factory.organizations(account);
      const isOrgRegistered = orgInfo.name !== "";
      setIsRegistered(isOrgRegistered);
      console.log("[v0] Organization registration status:", isOrgRegistered);
    } catch (error) {
      console.error("Error checking organization registration:", error);
      setIsRegistered(false);
    }
  };

  const registerOrganization = async () => {
    if (!contracts?.factory || !orgName.trim() || !orgEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter both organization name and email",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("[v0] Registering organization:", {
        name: orgName,
        email: orgEmail,
      });

      const tx = await contracts.factory.registerOrganization(
        orgName.trim(),
        orgEmail.trim()
      );
      await tx.wait();

      toast({
        title: "Success",
        description: "Organization registered successfully",
      });

      setIsRegistered(true);
      setShowRegisterOrg(false);
      setOrgName("");
      setOrgEmail("");

      loadEmployerStats();
    } catch (error: any) {
      console.error("Error registering organization:", error);

      if (
        error.message &&
        error.message.includes("Organization already registered")
      ) {
        toast({
          title: "Organization Already Registered",
          description:
            "Your organization is already registered. You can now create employee contracts.",
        });
        setIsRegistered(true);
        setShowRegisterOrg(false);
        setOrgName("");
        setOrgEmail("");
        loadEmployerStats();
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to register organization",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadEmployerStats = async () => {
    if (!contracts?.employerDashboard || !account || !isRegistered) return;

    try {
      const employerStats = await contracts.employerDashboard.getEmployerStats(
        account
      );
      setStats(employerStats);
    } catch (error) {
      console.error("Error loading employer stats:", error);
    }
  };

  const loadEmployees = async () => {
    if (!contracts?.employerDashboard || !account || !isRegistered) return;

    try {
      const employeesList = await contracts.employerDashboard.getEmployeesList(
        account
      );
      setEmployees(employeesList);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const createSalaryContract = async () => {
    if (!isRegistered) {
      toast({
        title: "Error",
        description: "Please register your organization first",
        variant: "destructive",
      });
      return;
    }

    if (
      !contracts?.factory ||
      !newEmployee.address ||
      !newEmployee.dailySalary ||
      !newEmployee.totalSalary
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const dailySalaryWei = parseEther(newEmployee.dailySalary);
      const totalSalaryWei = parseEther(newEmployee.totalSalary);
      const probationPercentage = newEmployee.isOnProbation
        ? Number.parseInt(newEmployee.probationPercentage)
        : 100;
      const contractDuration = Number.parseInt(newEmployee.contractDuration);

      if (dailySalaryWei <= 0 || totalSalaryWei <= 0 || contractDuration <= 0) {
        throw new Error("Invalid parameters: values must be greater than 0");
      }

      if (probationPercentage < 10 || probationPercentage > 100) {
        throw new Error("Probation percentage must be between 10 and 100");
      }

      const requiredTotal = dailySalaryWei * BigInt(contractDuration);
      if (totalSalaryWei < requiredTotal) {
        throw new Error(
          `Total salary (${formatEther(
            totalSalaryWei
          )} ETH) is insufficient for ${contractDuration} days at ${
            newEmployee.dailySalary
          } ETH/day. Required: ${formatEther(requiredTotal)} ETH`
        );
      }

      console.log("[v0] Creating contract with params:", {
        employee: newEmployee.address,
        dailySalary: formatEther(dailySalaryWei),
        probationPercentage,
        isOnProbation: newEmployee.isOnProbation,
        contractDuration,
        totalValue: formatEther(totalSalaryWei),
      });

      const tx = await contracts.factory.createSalaryContract(
        newEmployee.address,
        dailySalaryWei,
        probationPercentage,
        newEmployee.isOnProbation,
        contractDuration,
        { value: totalSalaryWei }
      );

      await tx.wait();

      toast({
        title: "Success",
        description: "Employee contract created successfully",
      });

      setShowAddEmployee(false);
      setNewEmployee({
        address: "",
        dailySalary: "",
        isOnProbation: false,
        probationPercentage: "100",
        contractDuration: "365",
        totalSalary: "",
      });

      loadEmployerStats();
      loadEmployees();
    } catch (error: any) {
      console.error("Error creating contract:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create employee contract",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateTodaysCode = async (contractAddress: string) => {
    if (!contracts?.employerDashboard) return;

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const salaryContract = new ethers.Contract(
        contractAddress,
        SALARY_CONTRACT_ABI,
        signer
      );

      const currentDay = await salaryContract.getCurrentDay();

      console.log("[v0] Generating code for contract:", contractAddress);
      console.log("[v0] Current day:", currentDay.toString());

      const tx = await salaryContract.generateDailyCode(currentDay);
      console.log("[v0] Transaction submitted:", tx.hash);
      await tx.wait();

      const blockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(blockNumber);
      const timestamp = block?.timestamp || Math.floor(Date.now() / 1000);
      const dayTimestamp = Math.floor(timestamp / 86400) * 86400;

      const seed = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256"],
        [contractAddress, currentDay, dayTimestamp]
      );
      const code = ((BigInt(seed) % 900000n) + 100000n).toString();

      console.log("[v0] Generated code:", code);
      console.log("[v0] Seed used:", seed);
      console.log("[v0] Day timestamp:", dayTimestamp);

      const newCode: AttendanceCode = {
        contractAddress,
        code,
        generatedAt: Date.now(),
      };

      setAttendanceCodes((prev) => {
        const filtered = prev.filter(
          (c) => c.contractAddress !== contractAddress
        );
        return [...filtered, newCode];
      });

      toast({
        title: "Success",
        description: `Attendance code generated: ${code}`,
      });

      loadEmployees();
    } catch (error: any) {
      console.error("Error generating code:", error);

      let errorMessage = "Failed to generate attendance code";

      if (error.message?.includes("Code already generated")) {
        errorMessage = "Attendance code has already been generated for today.";
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction was cancelled by user.";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds to pay for transaction gas.";
      } else if (error.code === "CALL_EXCEPTION") {
        errorMessage = "Smart contract call failed. Please try again.";
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const terminateContract = async (contractAddress: string) => {
    if (!contracts?.employerDashboard || !account) return;

    const { BrowserProvider } = await import("ethers");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      setIsLoading(true);
      const tx = await contracts.employerDashboard.terminateContract(
        contractAddress
      );
      await tx.wait();

      toast({
        title: "Success",
        description: "Contract terminated successfully",
      });

      loadEmployerStats();
      loadEmployees();
    } catch (error) {
      console.error("Error terminating contract:", error);
      toast({
        title: "Error",
        description: "Failed to terminate contract",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && contracts && account) {
      setIsLoading(true);
      checkOrganizationRegistration().then(() => {
        if (isRegistered) {
          Promise.all([loadEmployerStats(), loadEmployees()]).finally(() =>
            setIsLoading(false)
          );
        } else {
          setIsLoading(false);
        }
      });
    }
  }, [isConnected, contracts, account]);

  useEffect(() => {
    if (isConnected && contracts && account && isRegistered) {
      setIsLoading(true);
      Promise.all([loadEmployerStats(), loadEmployees()]).finally(() =>
        setIsLoading(false)
      );
    }
  }, [isRegistered]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Employer Dashboard</CardTitle>
            <CardDescription>
              Connect your wallet to access the employer dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Building className="h-5 w-5" />
              Register Organization
            </CardTitle>
            <CardDescription>
              Register your organization to start managing employee contracts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="Enter your organization name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="orgEmail">Organization Email</Label>
              <Input
                id="orgEmail"
                type="email"
                placeholder="Enter your organization email"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={registerOrganization}
              disabled={isLoading || !orgName.trim() || !orgEmail.trim()}
              className="w-full"
            >
              {isLoading ? "Registering..." : "Register Organization"}
            </Button>
            <div className="text-center">
              <WalletConnect />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Employer Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage your employees and salary contracts
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 w-full sm:w-auto">
                    <UserPlus className="h-4 w-4" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Create a new salary contract for an employee
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Employee Wallet Address</Label>
                      <Input
                        id="address"
                        placeholder="0x..."
                        value={newEmployee.address}
                        onChange={(e) =>
                          setNewEmployee((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dailySalary">Daily Salary (ETH)</Label>
                        <Input
                          id="dailySalary"
                          type="number"
                          step="0.001"
                          placeholder="0.01"
                          value={newEmployee.dailySalary}
                          onChange={(e) =>
                            setNewEmployee((prev) => ({
                              ...prev,
                              dailySalary: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="contractDuration">
                          Duration (Days)
                        </Label>
                        <Input
                          id="contractDuration"
                          type="number"
                          placeholder="365"
                          value={newEmployee.contractDuration}
                          onChange={(e) =>
                            setNewEmployee((prev) => ({
                              ...prev,
                              contractDuration: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="totalSalary">
                        Total Salary to Lock (ETH)
                      </Label>
                      <Input
                        id="totalSalary"
                        type="number"
                        step="0.001"
                        placeholder="3.65"
                        value={newEmployee.totalSalary}
                        onChange={(e) =>
                          setNewEmployee((prev) => ({
                            ...prev,
                            totalSalary: e.target.value,
                          }))
                        }
                      />
                      {newEmployee.dailySalary &&
                        newEmployee.contractDuration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended:{" "}
                            {(
                              Number.parseFloat(newEmployee.dailySalary) *
                              Number.parseInt(
                                newEmployee.contractDuration || "0"
                              )
                            ).toFixed(4)}{" "}
                            ETH
                          </p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="probation"
                        checked={newEmployee.isOnProbation}
                        onCheckedChange={(checked) =>
                          setNewEmployee((prev) => ({
                            ...prev,
                            isOnProbation: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="probation" className="text-sm">
                        Employee is on probation
                      </Label>
                    </div>
                    {newEmployee.isOnProbation && (
                      <div>
                        <Label htmlFor="probationPercentage">
                          Probation Percentage
                        </Label>
                        <Select
                          value={newEmployee.probationPercentage}
                          onValueChange={(value) =>
                            setNewEmployee((prev) => ({
                              ...prev,
                              probationPercentage: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                              (percentage) => (
                                <SelectItem
                                  key={percentage}
                                  value={percentage.toString()}
                                >
                                  {percentage}%
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <Button
                      onClick={createSalaryContract}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Creating..." : "Create Contract"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="w-full sm:w-auto">
                <WalletConnect />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 md:py-8">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {stats ? stats.totalEmployees.toString() : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Employees
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {stats ? stats.activeEmployees.toString() : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Locked (ETH)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {stats
                  ? Number.parseFloat(
                      formatEther(stats.totalSalariesLocked)
                    ).toFixed(4)
                  : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Paid (ETH)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {stats
                  ? Number.parseFloat(formatEther(stats.totalPaidOut)).toFixed(
                      4
                    )
                  : "0"}
              </div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approvals
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {stats ? stats.pendingApprovals.toString() : "0"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Management</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Contracts</CardTitle>
                <CardDescription>
                  Manage your employee salary contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div
                      key={employee.contractAddress}
                      className="flex flex-col gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-sm md:text-base">
                            {employee.employeeAddress.slice(0, 6)}...
                            {employee.employeeAddress.slice(-4)}
                          </h3>
                          <Badge
                            variant={
                              employee.isActive ? "default" : "secondary"
                            }
                          >
                            {employee.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {!employee.employeeApproved && (
                            <Badge variant="outline">Pending Approval</Badge>
                          )}
                          {employee.isOnProbation && (
                            <Badge variant="secondary">
                              Probation (
                              {employee.probationPercentage.toString()}%)
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Daily Salary:{" "}
                          {Number.parseFloat(
                            formatEther(employee.dailySalary)
                          ).toFixed(4)}{" "}
                          ETH
                        </p>
                        <p className="text-xs text-muted-foreground font-mono break-all md:break-normal">
                          Contract: {employee.contractAddress}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 md:text-right md:items-end">
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="font-medium">
                              {employee.attendanceCount.toString()}
                            </span>{" "}
                            days worked
                          </div>
                          <div>
                            Available:{" "}
                            {Number.parseFloat(
                              formatEther(employee.availableBalance)
                            ).toFixed(4)}{" "}
                            ETH
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Withdrawn:{" "}
                            {Number.parseFloat(
                              formatEther(employee.totalWithdrawn)
                            ).toFixed(4)}{" "}
                            ETH
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          {employee.isActive && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                terminateContract(employee.contractAddress)
                              }
                              disabled={isLoading}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Terminate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {employees.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No employees found. Add your first employee to get
                      started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance Codes</CardTitle>
                <CardDescription>
                  Generate attendance codes for your employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees
                    .filter((emp) => emp.isActive && emp.employeeApproved)
                    .map((employee) => {
                      const attendanceCode = attendanceCodes.find(
                        (c) => c.contractAddress === employee.contractAddress
                      );
                      const isCodeValid =
                        attendanceCode &&
                        Date.now() - attendanceCode.generatedAt <
                          24 * 60 * 60 * 1000; // 24 hours

                      return (
                        <div
                          key={employee.contractAddress}
                          className="flex flex-col gap-4 p-4 border border-border rounded-lg md:flex-row md:items-center md:justify-between"
                        >
                          <div className="space-y-1 flex-1">
                            <h3 className="font-semibold text-sm md:text-base">
                              {employee.employeeAddress.slice(0, 6)}...
                              {employee.employeeAddress.slice(-4)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Day {employee.currentDay.toString()} •
                              {employee.todayAttendanceMarked
                                ? " Attended Today"
                                : " Not Attended"}
                            </p>
                            {isCodeValid && (
                              <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                  Today's Code:{" "}
                                  <span className="font-mono text-lg">
                                    {attendanceCode.code}
                                  </span>
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                  Share this code with your employee to mark
                                  attendance
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {employee.todayCodeGenerated || isCodeValid ? (
                              <div className="flex flex-col gap-2">
                                <Badge variant="default">Code Generated</Badge>
                                {!isCodeValid && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      generateTodaysCode(
                                        employee.contractAddress
                                      )
                                    }
                                    disabled={isLoading}
                                  >
                                    <QrCode className="h-4 w-4 mr-1" />
                                    Regenerate
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  generateTodaysCode(employee.contractAddress)
                                }
                                disabled={isLoading}
                                className="w-full sm:w-auto"
                              >
                                <QrCode className="h-4 w-4 mr-1" />
                                Generate Code
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {employees.filter(
                    (emp) => emp.isActive && emp.employeeApproved
                  ).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No active employees available for attendance tracking.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedEmployee && (
          <Dialog
            open={!!selectedEmployee}
            onOpenChange={() => setSelectedEmployee(null)}
          >
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Employee Details</DialogTitle>
                <DialogDescription>
                  Contract information for{" "}
                  {selectedEmployee.employeeAddress.slice(0, 6)}...
                  {selectedEmployee.employeeAddress.slice(-4)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Employee Address
                    </Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedEmployee.employeeAddress}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Contract Address
                    </Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedEmployee.contractAddress}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Daily Salary</Label>
                    <p className="text-sm text-muted-foreground">
                      {Number.parseFloat(
                        formatEther(selectedEmployee.dailySalary)
                      ).toFixed(4)}{" "}
                      ETH
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Days Worked</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmployee.attendanceCount.toString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Available Balance
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {Number.parseFloat(
                        formatEther(selectedEmployee.availableBalance)
                      ).toFixed(4)}{" "}
                      ETH
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Total Withdrawn
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {Number.parseFloat(
                        formatEther(selectedEmployee.totalWithdrawn)
                      ).toFixed(4)}{" "}
                      ETH
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="flex gap-1">
                      <Badge
                        variant={
                          selectedEmployee.isActive ? "default" : "secondary"
                        }
                      >
                        {selectedEmployee.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {!selectedEmployee.employeeApproved && (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Probation</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmployee.isOnProbation
                        ? `${selectedEmployee.probationPercentage.toString()}%`
                        : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
