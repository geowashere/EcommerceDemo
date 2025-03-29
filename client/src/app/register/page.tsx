"use client";

import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { register } = useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    const res = register(firstName, lastName, email, password);

    console.log("res: ", res);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-10">Register</h1>
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
        </form>
      </div>
    </div>
  );
}
