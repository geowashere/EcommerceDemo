"use client";

import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in");
    console.log("Email:", email);
    console.log("Password:", password);

    const res = login(email, password);

    router.push("/home");
    console.log("res: ", res);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-10">Login</h1>
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
        </form>
      </div>
    </div>
  );
}
