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
} from "@/components/ui/dialog";
import {
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Download,
} from "lucide-react";
import { WalletConnect } from "@/components/wallet-connect";
import { formatEther } from "ethers";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import {
  SALARY_CONTRACT_ABI,
  ATTENDANCE_MANAGER_ABI,
} from "@/lib/contract-abis";

// Add this constant for AttendanceManager address - you'll need to replace with actual deployed address
const ATTENDANCE_MANAGER_ADDRESS = "YOUR_ATTENDANCE_MANAGER_CONTRACT_ADDRESS";

interface EmployeeContractInfo {
  contractAddress: string;
  employer: string;
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
  employerName: string;
}

interface PendingApproval {
  contractAddress: string;
  employer: string;
  dailySalary: bigint;
  isOnProbation: boolean;
  probationPercentage: bigint;
  contractDuration: bigint;
  employerName: string;
}

interface AttendanceRecord {
  day: bigint;
  timestamp: bigint;
  marked: boolean;
}

export default function EmployeeDashboard() {
  const { isConnected, account } = useWeb3();
  const { contracts } = useContracts();
  const [contractsData, setContractsData] = useState<EmployeeContractInfo[]>(
    []
  );
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContract, setSelectedContract] =
    useState<EmployeeContractInfo | null>(null);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);

  const loadEmployeeContracts = async () => {
    if (!contracts?.employeeDashboard || !account) return;

    try {
      console.log("[v0] Loading employee contracts for account:", account);

      const employeeContracts =
        await contracts.employeeDashboard.getEmployeeContracts(account);
      console.log("[v0] Loaded employee contracts:", employeeContracts);

      // Convert Proxy(Result) to regular array and filter properly
      const contractsArray = Array.from(employeeContracts || []);

      const filteredContracts = contractsArray.filter((contract: any) => {
        // Handle both object and array-like structures
        const contractAddress = contract?.contractAddress || contract?.[0];
        const dailySalary = contract?.dailySalary || contract?.[2];
        const employer = contract?.employer || contract?.[1];

        return contractAddress && dailySalary !== undefined && employer;
      });

      console.log("[v0] Processed contracts:", filteredContracts);
      setContractsData(filteredContracts);
    } catch (error) {
      console.error("[v0] Error loading employee contracts:", error);
      toast({
        title: "Error",
        description: "Failed to load employee contracts",
        variant: "destructive",
      });
    }
  };

  const loadPendingApprovals = async () => {
    if (!contracts?.employeeDashboard || !account) return;

    try {
      console.log("[v0] Loading pending approvals for account:", account);

      const approvals = await contracts.employeeDashboard.getPendingApprovals(
        account
      );
      console.log("[v0] Raw pending approvals from contract:", approvals);

      // Convert Proxy(Result) to regular array
      const approvalsArray = Array.from(approvals || []);

      const filteredApprovals = approvalsArray.filter((approval: any) => {
        const contractAddress = approval?.contractAddress || approval?.[0];
        return (
          contractAddress &&
          contractAddress !== "0x0000000000000000000000000000000000000000"
        );
      });

      console.log(
        "[v0] Filtered approvals for current user:",
        filteredApprovals
      );
      setPendingApprovals(filteredApprovals);
    } catch (error) {
      console.error("[v0] Error loading pending approvals:", error);
      toast({
        title: "Error",
        description: "Failed to load pending approvals",
        variant: "destructive",
      });
    }
  };

  const debugAttendanceCode = async (contractAddress: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const attendanceManager = new ethers.Contract(
        ATTENDANCE_MANAGER_ADDRESS,
        ATTENDANCE_MANAGER_ABI,
        signer
      );
      const salaryContract = new ethers.Contract(
        contractAddress,
        SALARY_CONTRACT_ABI,
        signer
      );

      const currentDay = await salaryContract.getCurrentDay();
      const employerAddress = await salaryContract.employer();

      // Check if employee has already attended this day for this employer
      const hasAttended = await attendanceManager.hasEmployeeAttendedDay(
        account,
        employerAddress,
        currentDay
      );

      console.log("[DEBUG] Current day:", currentDay.toString());
      console.log("[DEBUG] Employer address:", employerAddress);
      console.log("[DEBUG] Already marked attendance:", hasAttended);

      // Check if already marked attendance
      if (hasAttended) {
        toast({
          title: "Already Marked",
          description: "You have already marked attendance for today.",
          variant: "destructive",
        });
        return false;
      }

      // Check if employer has generated a code for today
      const activeCodeHash =
        await attendanceManager.getActiveCodeForEmployeeDay(
          employerAddress,
          account,
          currentDay
        );

      console.log("[DEBUG] Active code hash:", activeCodeHash);

      if (
        activeCodeHash ===
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        toast({
          title: "No Attendance Code",
          description:
            "The employer hasn't generated an attendance code for today yet.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("[DEBUG] Error checking attendance code:", error);
      return false;
    }
  };

  const approveContract = async (contractAddress: string) => {
    if (!contracts?.employeeDashboard) return;

    try {
      setIsLoading(true);

      console.log("[v0] Approving contract:", contractAddress);
      console.log("[v0] Current account:", account);

      try {
        const salaryContract = new ethers.Contract(
          contractAddress,
          SALARY_CONTRACT_ABI,
          contracts.employeeDashboard.runner
        );
        const employeeAddress = await salaryContract.employee();
        const employerAddress = await salaryContract.employer();
        const dailySalary = await salaryContract.dailySalary();

        console.log("[v0] Contract details from salary contract:");
        console.log("[v0] Expected employee address:", employeeAddress);
        console.log("[v0] Employer address:", employerAddress);
        console.log("[v0] Daily salary:", formatEther(dailySalary));
        console.log(
          "[v0] Current account matches expected employee:",
          employeeAddress?.toLowerCase() === account?.toLowerCase()
        );

        if (employeeAddress?.toLowerCase() !== account?.toLowerCase()) {
          console.error("[v0] Address mismatch:");
          console.error("[v0] Expected employee:", employeeAddress);
          console.error("[v0] Current account:", account);
          throw new Error(
            `Address mismatch: Contract was created for ${employeeAddress}, but you're using ${account}. Please switch to the correct wallet or ask the employer to create a new contract for your current address.`
          );
        }
      } catch (detailsError) {
        console.error("[v0] Error fetching contract details:", detailsError);
        // Continue with approval attempt even if we can't get details
      }

      const salaryContract = new ethers.Contract(
        contractAddress,
        SALARY_CONTRACT_ABI,
        contracts.employeeDashboard.runner
      );
      const tx = await salaryContract.approveContract();
      await tx.wait();

      toast({
        title: "Success",
        description: "Contract approved successfully",
      });

      // Reload data
      loadEmployeeContracts();
      loadPendingApprovals();
    } catch (error: any) {
      console.error("[v0] Error approving contract:", error);

      let errorMessage = "Failed to approve contract";

      if (error.message?.includes("Only employee can call this function")) {
        errorMessage =
          "You are not authorized to approve this contract. This contract was created for a different employee address. Please ensure you're using the correct wallet.";
      } else if (error.message?.includes("This contract belongs to employee")) {
        errorMessage = error.message;
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction was cancelled";
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

  const markAttendance = async (contractAddress: string) => {
    if (!attendanceCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter the attendance code",
        variant: "destructive",
      });
      return;
    }

    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(attendanceCode.trim())) {
      toast({
        title: "Invalid Format",
        description: "Attendance code must be exactly 6 digits",
        variant: "destructive",
      });
      return;
    }

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
      const employeeAddress = await salaryContract.employee();

      console.log("[v0] Current day from contract:", currentDay.toString());
      console.log("[v0] Attendance code entered:", attendanceCode.trim());
      console.log("[v0] Employee address:", employeeAddress);
      console.log("[v0] Current account:", account);

      // Verify we're the correct employee
      if (employeeAddress?.toLowerCase() !== account?.toLowerCase()) {
        throw new Error(
          `You are not the employee for this contract. Expected: ${employeeAddress}, Current: ${account}`
        );
      }

      // Check if already marked attendance for today
      const hasAttendance = await salaryContract.hasAttendanceForDay(
        currentDay
      );
      if (hasAttendance) {
        toast({
          title: "Already Marked",
          description: "You have already marked attendance for today.",
          variant: "destructive",
        });
        return;
      }

      console.log("[v0] Calling markAttendance on SalaryContract...");
      console.log("[v0] Parameters:");
      console.log("[v0] - currentDay:", currentDay.toString());
      console.log("[v0] - attendanceCode:", attendanceCode.trim());

      // Call markAttendance directly on SalaryContract with the 6-digit code
      const tx = await salaryContract.markAttendance(
        currentDay,
        attendanceCode.trim()
      );

      console.log("[v0] Transaction submitted:", tx.hash);

      const receipt = await tx.wait();
      console.log("[v0] Transaction confirmed:", receipt.blockNumber);

      toast({
        title: "Success",
        description:
          "Attendance marked successfully! Your daily salary has been credited.",
      });

      setAttendanceCode("");
      setShowAttendanceDialog(false);
      loadEmployeeContracts();
    } catch (error: any) {
      console.error("[v0] Error marking attendance:", error);

      let errorMessage = "Failed to mark attendance";

      // Handle specific error cases
      if (error.reason) {
        switch (error.reason) {
          case "Invalid attendance code":
            errorMessage =
              "Invalid attendance code. Please check with your employer for the correct code.";
            break;
          case "Code does not exist":
            errorMessage =
              "No attendance code found. Please ask your employer to generate one.";
            break;
          case "Code is not active":
            errorMessage =
              "The attendance code is no longer active. Please get a new code.";
            break;
          case "Code has already been used":
            errorMessage = "This attendance code has already been used.";
            break;
          case "Code has expired":
            errorMessage =
              "The attendance code has expired. Please get a new code.";
            break;
          case "Already marked attendance for this day":
            errorMessage = "You have already marked attendance for today.";
            break;
          case "Only employee can mark attendance":
            errorMessage =
              "Access denied. You are not authorized to mark attendance.";
            break;
          default:
            errorMessage = `Contract error: ${error.reason}`;
        }
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction was cancelled.";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas.";
      } else if (error.code === "CALL_EXCEPTION") {
        errorMessage =
          "Smart contract call failed. Please check the attendance code.";
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
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

  const withdrawSalary = async (contractAddress: string) => {
    if (!contracts?.employeeDashboard) return;

    try {
      setIsLoading(true);
      const tx = await contracts.employeeDashboard.withdrawSalary(
        contractAddress
      );
      await tx.wait();

      toast({
        title: "Success",
        description: "Salary withdrawn successfully",
      });

      loadEmployeeContracts();
    } catch (error) {
      console.error("Error withdrawing salary:", error);
      toast({
        title: "Error",
        description: "Failed to withdraw salary",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const loadData = async () => {
      if (!isConnected || !contracts || !account) return;

      try {
        setIsLoading(true);
        await Promise.all([loadEmployeeContracts(), loadPendingApprovals()]);
      } catch (error) {
        console.error("[v0] Error loading dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [isConnected, contracts, account]);

  // Calculate total stats
  const totalEarnings = contractsData.reduce(
    (sum, contract) =>
      sum + Number.parseFloat(formatEther(contract.totalWithdrawn)),
    0
  );
  const totalAvailable = contractsData.reduce(
    (sum, contract) =>
      sum + Number.parseFloat(formatEther(contract.availableBalance)),
    0
  );
  const totalDaysWorked = contractsData.reduce(
    (sum, contract) => sum + Number(contract.attendanceCount),
    0
  );
  const activeContracts = contractsData.filter(
    (contract) => contract.isActive && contract.employeeApproved
  ).length;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Employee Dashboard</CardTitle>
            <CardDescription>
              Connect your wallet to access your employee dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Employee Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your salary contracts and attendance
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Employee Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEarnings.toFixed(4)} ETH
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Balance
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalAvailable.toFixed(4)} ETH
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Worked</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDaysWorked}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Contracts
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeContracts}</div>
              <p className="text-xs text-muted-foreground">
                {pendingApprovals.length} pending approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Pending Contract Approvals ({pendingApprovals.length})
              </CardTitle>
              <CardDescription>
                Review and approve salary contracts from employers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval, index) => (
                  <div
                    key={approval.contractAddress || approval[0] || index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-amber-50 dark:bg-amber-950/20"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        {approval.employerName ||
                          approval[5] ||
                          "Unknown Employer"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Daily Salary:{" "}
                        {Number.parseFloat(
                          formatEther(approval.dailySalary || approval[2] || 0)
                        ).toFixed(4)}{" "}
                        ETH
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contract Duration:{" "}
                        {(
                          approval.contractDuration ||
                          approval[6] ||
                          0
                        ).toString()}{" "}
                        days
                      </p>
                      {(approval.isOnProbation || approval[3]) && (
                        <Badge variant="secondary">
                          Probation (
                          {(
                            approval.probationPercentage ||
                            approval[4] ||
                            0
                          ).toString()}
                          %)
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground font-mono">
                        Contract: {approval.contractAddress || approval[0]}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        approveContract(approval.contractAddress || approval[0])
                      }
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? "Approving..." : "✓ Approve Contract"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {pendingApprovals.length === 0 && (
          <Card className="mb-8 border-dashed">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No pending contract approvals</p>
                <p className="text-sm">
                  When an employer creates a contract for you, it will appear
                  here for approval.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="contracts">My Contracts</TabsTrigger>
            <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Contracts</CardTitle>
                <CardDescription>
                  Your active and inactive salary contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractsData.map((contract) => (
                    <div
                      key={contract.contractAddress}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {contract.employerName || "Unknown Employer"}
                          </h3>
                          <Badge
                            variant={
                              contract.isActive ? "default" : "secondary"
                            }
                          >
                            {contract.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {!contract.employeeApproved && (
                            <Badge variant="outline">Pending Approval</Badge>
                          )}
                          {contract.isOnProbation && (
                            <Badge variant="secondary">
                              Probation (
                              {contract.probationPercentage.toString()}%)
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Daily Salary:{" "}
                          {Number.parseFloat(
                            formatEther(contract.dailySalary)
                          ).toFixed(4)}{" "}
                          ETH
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          Contract: {contract.contractAddress}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">
                            {contract.attendanceCount.toString()}
                          </span>{" "}
                          days worked
                        </div>
                        <div className="text-sm">
                          Available:{" "}
                          {Number.parseFloat(
                            formatEther(contract.availableBalance)
                          ).toFixed(4)}{" "}
                          ETH
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Withdrawn:{" "}
                          {Number.parseFloat(
                            formatEther(contract.totalWithdrawn)
                          ).toFixed(4)}{" "}
                          ETH
                        </div>
                        <div className="flex gap-2 mt-2">
                          {contract.isActive && contract.employeeApproved && (
                            <>
                              {Number.parseFloat(
                                formatEther(contract.availableBalance)
                              ) > 0 && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    withdrawSalary(contract.contractAddress)
                                  }
                                  disabled={isLoading}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Withdraw
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedContract(contract);
                                  setShowAttendanceDialog(true);
                                }}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Attendance
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {contractsData.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No contracts found. Wait for an employer to create a
                      contract for you.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mark Daily Attendance</CardTitle>
                <CardDescription>
                  Enter the attendance code provided by your employer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractsData
                    .filter(
                      (contract) =>
                        contract.isActive && contract.employeeApproved
                    )
                    .map((contract) => (
                      <div
                        key={contract.contractAddress}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-1">
                          <h3 className="font-semibold">
                            {contract.employerName || "Unknown Employer"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Daily Salary:{" "}
                            {Number.parseFloat(
                              formatEther(contract.dailySalary)
                            ).toFixed(4)}{" "}
                            ETH
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Days Worked: {contract.attendanceCount.toString()}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedContract(contract);
                            setShowAttendanceDialog(true);
                          }}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Mark Attendance
                        </Button>
                      </div>
                    ))}
                  {contractsData.filter(
                    (contract) => contract.isActive && contract.employeeApproved
                  ).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No active contracts available for attendance marking.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Attendance Dialog */}
        <Dialog
          open={showAttendanceDialog}
          onOpenChange={setShowAttendanceDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
              <DialogDescription>
                {selectedContract && (
                  <>
                    Enter the 6-digit attendance code for{" "}
                    {selectedContract.employerName || "your employer"}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="attendanceCode">Attendance Code</Label>
                <Input
                  id="attendanceCode"
                  placeholder="Enter 6-digit code (e.g., 123456)"
                  value={attendanceCode}
                  onChange={(e) => {
                    // Only allow digits and limit to 6 characters
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setAttendanceCode(value);
                  }}
                  maxLength={6}
                  className="text-center text-lg font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Code must be exactly 6 digits
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    selectedContract &&
                    markAttendance(selectedContract.contractAddress)
                  }
                  disabled={isLoading || attendanceCode.length !== 6}
                  className="flex-1"
                >
                  {isLoading ? "Marking..." : "Mark Attendance"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAttendanceDialog(false);
                    setAttendanceCode("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
