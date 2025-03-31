"use client";

import { Alert, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password != confirmPassword) {
      setError("Make sure you confirm your password correctly!");
      return;
    }

    console.log("Registering");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const res = await register(firstName, lastName, email, password);
      console.log("res: ", res);
      router.push("/login");
    } catch (err: any) {
      console.log("err: ", err);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-10">Register</h1>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <FormControl fullWidth>
            <label htmlFor="firstName" className="mb-1 font-medium">
              First Name
            </label>
            <TextField
              id="firstName"
              required
              value={firstName}
              placeholder="Enter your First Name"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </FormControl>

          <FormControl fullWidth>
            <label htmlFor="lastName" className="mb-1 font-medium">
              Last Name
            </label>
            <TextField
              id="lastName"
              required
              value={lastName}
              placeholder="Enter your Last Name"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </FormControl>

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

          <FormControl fullWidth>
            <label htmlFor="confirmpassword" className="mb-1 font-medium">
              Confirm Password
            </label>
            <TextField
              id="confirmpassword"
              type="password"
              required
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </FormControl>

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
          <Link href="/login">Login here</Link>
        </form>
      </div>
    </div>
  );
}
