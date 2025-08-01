/*"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useAuthModalStore } from "@/lib/store/authModalStore";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";


export default function AuthModal() {
  const { open, close } = useAuthModalStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();



  const handleSubmit = async () => {
    setLoading(true);
    setError("");

     try {
      if (mode === "signup") {
        // Call your custom registration endpoint
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Registration failed.");
          return;
        }
      }

      // Use NextAuth signIn for login
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials.");
      } else {
        close(); // close the modal
        router.push("/dashboard"); // redirect after login
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="h-[600px] w-[500px] bg-gradient-to-r from-purple-900 to-black text-white rounded-xl p-6 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-bold mb-4">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-sm text-gray-300">
          {mode === "signup"
            ? "Create a new account"
            : "Sign in to your account"}
        </p>

        <input
          placeholder="Username"
          className="w-full max-w-sm p-2 rounded bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
       <div className="relative w-full max-w-sm">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full p-2 pr-10 rounded bg-white text-black"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-2 flex items-center"
  >
    {showPassword ? (
      <EyeOff className="h-5 w-5 text-gray-600" />
    ) : (
      <Eye className="h-5 w-5 text-gray-600" />
    )}
  </button>
</div>

        {error && (
          <p className="text-sm text-red-400 text-center w-full">{error}</p>
        )}

        <button
          className="w-full max-w-sm bg-white text-black py-2 rounded hover:bg-gray-200"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Register"
            : "Login"}
        </button>

        <p className="text-center text-m">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() =>
              setMode((prev) => (prev === "signup" ? "signin" : "signup"))
            }
          >
            {mode === "signup" ? "Sign in" : "Sign up"}
          </span>
        </p>

        <button
          className="text-m text-gray-100 underline mt-6"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useAuthModalStore } from "@/lib/store/authModalStore";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const { open, close } = useAuthModalStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  if (!open) return null;
  
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Registration failed.");
          return;
        }
        // Switch to sign-in after successful registration
        setMode("signin");
        setError("Registration successful! Please sign in.");
        return;
      }

      // NextAuth.js signIn with redirect handling
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Successful login
        close();
        router.push("/dashboard"); // Explicit redirect
        router.refresh(); // Ensure session is updated
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="h-[600px] w-[500px] bg-gradient-to-r from-purple-900 to-black text-white rounded-xl p-6 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-bold mb-4">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-sm text-gray-300">
          {mode === "signup"
            ? "Create a new account"
            : "Sign in to your account"}
        </p>

        <input
          placeholder="Username"
          className="w-full max-w-sm p-2 rounded bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
       <div className="relative w-full max-w-sm">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full p-2 pr-10 rounded bg-white text-black"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-2 flex items-center"
  >
    {showPassword ? (
      <EyeOff className="h-5 w-5 text-gray-600" />
    ) : (
      <Eye className="h-5 w-5 text-gray-600" />
    )}
  </button>
</div>

        {error && (
          <p className="text-sm text-red-400 text-center w-full">{error}</p>
        )}

        <button
          className="w-full max-w-sm bg-white text-black py-2 rounded hover:bg-gray-200"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Register"
            : "Login"}
        </button>

        <p className="text-center text-m">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() =>
              setMode((prev) => (prev === "signup" ? "signin" : "signup"))
            }
          >
            {mode === "signup" ? "Sign in" : "Sign up"}
          </span>
        </p>

        <button
          className="text-m text-gray-100 underline mt-6"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}*/

"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useAuthModalStore } from "@/lib/store/authModalStore";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthModal() {
  const { open, close } = useAuthModalStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // Handle body overflow when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            username: username.trim(), 
            password 
          }),
        });

        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Registration failed.");
          return;
        }
        setMode("signin");
        setError("Registration successful! Please sign in.");
        return;
      }

      // SIGN IN LOGIC
      const result = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password,
        callbackUrl,
      });

      console.log("SignIn result:", result); // Debug log

      if (result?.error) {
        setError(result.error === "CredentialsSignin" 
          ? "Invalid username or password" 
          : "Login failed. Please try again."
        );
      } else {
        close();
        // FORCE REDIRECT WITH PAGE RELOAD
        if (result?.url) {
          window.location.assign(result.url);
        } else {
          window.location.assign(callbackUrl);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="h-[600px] w-[500px] bg-gradient-to-r from-purple-900 to-black text-white rounded-xl p-6 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-bold mb-4">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-sm text-gray-300">
          {mode === "signup"
            ? "Create a new account"
            : "Sign in to your account"}
        </p>

        <input
          placeholder="Username"
          className="w-full max-w-sm p-2 rounded bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <div className="relative w-full max-w-sm">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 pr-10 rounded bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center"
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center w-full">{error}</p>
        )}

        <button
          className="w-full max-w-sm bg-white text-black py-2 rounded hover:bg-gray-200 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading || !username || !password}
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Register"
            : "Login"}
        </button>

        <p className="text-center text-m">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 underline cursor-pointer hover:text-blue-300"
            onClick={() => {
              setError("");
              setMode((prev) => (prev === "signup" ? "signin" : "signup"));
            }}
          >
            {mode === "signup" ? "Sign in" : "Sign up"}
          </span>
        </p>

        <button
          className="text-m text-gray-100 underline mt-6 hover:text-gray-300"
          onClick={() => {
            close();
            setError("");
          }}
          disabled={loading}
        >
          Close
        </button>
      </div>
    </div>
  );
}