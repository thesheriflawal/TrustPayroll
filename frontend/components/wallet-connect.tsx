"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/lib/web3-provider"
import { Wallet, AlertTriangle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WalletConnect() {
  const { account, isConnected, isConnecting, connect, disconnect, switchNetwork, isCorrectNetwork } = useWeb3()

  if (isConnected && account) {
    return (
      <div className="flex flex-col gap-2">
        {!isCorrectNetwork && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Please switch to Lisk Sepolia network to use this application.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={switchNetwork}
                className="ml-2 bg-transparent hover:bg-destructive/10"
              >
                Switch Network
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors bg-transparent"
          >
            Disconnect
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center gap-2 transition-all hover:scale-105"
    >
      {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
