import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { login } from "../services/authService";
import {Link} from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

   const { email, password } = form;
   
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return;
  }

  navigate("/dashboard");
};


  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className="space-y-4">

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
          className="w-full bg-black text-white p-3 hover:scale-99 ease-in-out duration-1000 cursor-pointer rounded font-bold"
        >
          Login
        </button>

        <Link to="/signup" className="text-center text-sm opacity-70">
          Don’t have an account? Signup
        </Link>

      </form>
    </AuthLayout>
  );
}
