"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLock, LuMail, LuLoader } from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";
import ErrorAlert from "@/components/Admin/ErrorAlert";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for query parameters messages
  useEffect(() => {
    const message = searchParams.get('message');
    const errorParam = searchParams.get('error');
    
    if (message) {
      // This is an info message, not an error
      console.log('Info:', message);
    }
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/login/admin/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/login/admin/dashboard');
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while checking auth status
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LuLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="flex items-center text-sm text-gray-600 bg-background min-h-screen justify-center px-4">
      {showError && <ErrorAlert message={error} setShowErrorBanner={setShowError} />}
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-primary text-3xl mt-10 font-medium">Admin Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

        {error && (
          <div className="mt-4 px-4 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LuMail className="text-gray-700" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email id"
            className="border-none outline-none ring-0 flex-1"
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LuLock className="text-gray-700" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-none outline-none ring-0 flex-1"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-10 mb-10 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <LuLoader className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Signing In...' : 'Login'}
        </button>

      </form>
    </div>
  );
}

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LuLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
