"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md border border-orange-100"
      >
        <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
          Admin Login
        </h1>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-full font-semibold hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
