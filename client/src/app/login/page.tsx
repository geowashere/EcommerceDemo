"use client";

import { Alert, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../utils/types";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("Logging in");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const res: LoginResponse = await login(email, password);

      console.log("res: ", res);
      router.push("/home");
    } catch (err: any) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-10">Login</h1>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <FormControl fullWidth>
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <TextField
              id="email"
              required
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </FormControl>

          <FormControl fullWidth>
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <TextField
              id="password"
              type="password"
              required
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>

          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>

          <Link href={"/register"}>Don't have an account, Register here</Link>
        </form>
      </div>
    </div>
  );
}
