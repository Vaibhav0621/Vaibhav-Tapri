"use server"

// Simplified auth actions for demo purposes
export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  try {
    // Mock registration for demo
    console.log("Mock user registration:", { email, name })

    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    // Mock login for demo
    console.log("Mock user login:", { email })

    return {
      success: true,
      message: "Login successful",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    }
  }
}
