import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { login } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Login:", form);
    // connect backend here later
    
    await login(email, password);

  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 border border-zinc-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-zinc-700"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded font-bold"
        >
          Login
        </button>

        <p className="text-center text-sm opacity-70">
          Don’t have an account? Signup
        </p>

      </form>
    </AuthLayout>
  );
}
