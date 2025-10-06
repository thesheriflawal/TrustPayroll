"use server"

import { createClient } from "./supabase/server"
import { resend } from "./resend"

export async function submitWaitlistEmail(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Please enter a valid email address",
    }
  }

  try {
    const supabase = await createClient()

    // Insert email into database
    const { error: dbError } = await supabase.from("waitlist").insert({ email })

    if (dbError) {
      // Check if it's a duplicate email error
      if (dbError.code === "23505") {
        return {
          success: false,
          error: "This email is already on the waitlist",
        }
      }
      throw dbError
    }

    // Send notification email to TrustPayroll
    try {
      if (resend) {
        await resend.emails.send({
          from: "TrustPayroll Waitlist <onboarding@resend.dev>",
          to: "TrustPayrollOfficial@gmail.com",
          subject: "New Waitlist Signup",
          html: `
            <h2>New Waitlist Signup</h2>
            <p>A new user has joined the TrustPayroll waitlist:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          `,
        })
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Don't fail the whole operation if email fails
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting waitlist:", error)
    return {
      success: false,
      error: "There was an error submitting your email. Please try again.",
    }
  }
}
