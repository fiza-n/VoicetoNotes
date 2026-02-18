import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.fname]: e.target.value });
    setForm({ ...form, [e.target.lname]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Signup:", form);
    // connect backend here later
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 border border-zinc-700"
        />
          <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 border border-zinc-700"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded  bg-gray-700 border border-zinc-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded  bg-gray-700 border border-zinc-700"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded font-bold cursor-pointer hover:scale-99 all-ease-in-out duration-200"
        >
          Signup
        </button>

        <p className="text-center text-sm opacity-70">
          Already have an account? Login
        </p>

      </form>
    </AuthLayout>
  );
}
