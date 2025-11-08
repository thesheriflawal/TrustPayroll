"use client"
import clsx from "clsx"
import type React from "react"

import { useRef, useState } from "react"
import { toast } from "sonner"

type InputForm = {
  formAction?: (data: FormData) => Promise<{ success: true } | { success: false; error: string }>
  buttonCopy: {
    success: string
    idle: string
    loading: string
  }
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "formAction">

type State = "idle" | "loading" | "success" | "error"

const STATES: Record<State, State> = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
}


export function InputForm({ formAction, buttonCopy, ...props }: InputForm) {
  const [state, setState] = useState<State>(STATES.idle)
  const [error, setError] = useState<string>()
  const [value, setValue] = useState("")
  const errorTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    if (state === STATES.success || state === STATES.loading) return
    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current)
      setError(undefined)
      setState(STATES.idle)
    }
    if (formAction && typeof formAction === "function") {
      try {
        setState(STATES.loading)
        const data = await formAction(new FormData(formEl))

        if (data.success) {
          setState(STATES.success)
          toast.success("Congratulations! You're on the waitlist. We'll keep you updated!")
          formEl.reset()
          setValue("")
          setTimeout(() => setState(STATES.idle), 6000)
        } else {
          if (data.error === "This email is already on the waitlist") {
            toast("Thanks for your enthusiasm! Your email has been recorded. We'll reach out for promotions or when we're ready to roll out.")
            setState(STATES.error)
            setError("You are already on the waitlist")
            errorTimeout.current = setTimeout(() => {
              setError(undefined)
              setState(STATES.idle)
            }, 6000)
          } else {
            setState(STATES.error)
            setError(data.error)
            errorTimeout.current = setTimeout(() => {
              setError(undefined)
              setState(STATES.idle)
            }, 6000)
          }
        }
      } catch (error) {
        setState(STATES.error)
        setError("There was an error while submitting the form")
        console.error(error)
        errorTimeout.current = setTimeout(() => {
          setError(undefined)
          setState(STATES.idle)
        }, 6000)
      }
    }
  }
  const isSubmitted = state === "success"
  const inputDisabled = state === "loading"

  return (
    <form className="flex flex-col gap-2 w-full relative" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3 relative">
        <input
          type="email"
          {...props}
          value={value}
          className={clsx(
            "flex-1 text-sm pl-4 pr-28 py-2 h-11 cursor-text rounded-full placeholder:text-[color:var(--muted-foreground)] focus:outline-none",
            "bg-[color:var(--card)] text-[color:var(--card-foreground)] border border-[color:var(--border)]"
          )}
          disabled={inputDisabled}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          data-1p-ignore
          data-lpignore
          autoFocus
        />
        <button
          type="submit"
          disabled={inputDisabled}
          className={clsx(
            "absolute h-8 px-3.5 text-sm top-1/2 transform -translate-y-1/2 right-1.5 rounded-full font-medium flex gap-1 items-center",
            "cursor-pointer disabled:cursor-not-allowed transition-colors",
            "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-95",
            {
              // Loading subtle state
              "opacity-80": state === "loading",
            },
            inputDisabled && "cursor-not-allowed"
          )}
        >
          {state === "loading" ? (
            <>
              {buttonCopy.loading}
              <Loading />
            </>
          ) : isSubmitted ? (
            buttonCopy.success
          ) : (
            buttonCopy.idle
          )}
        </button>
      </div>
      <div className="w-full h-2" />
  {error && <p className="absolute text-xs text-[color:var(--destructive)] top-full -translate-y-1/2 px-2">{error}</p>}
  {state === 'success' && <p className="absolute text-xs text-[color:var(--primary)] top-full -translate-y-1/2 px-2">Waitlist joined successfully</p>}
    </form>
  )
}

const Loading = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border border-[currentColor] !border-t-[transparent] animate-spin" />
  </div>
)
