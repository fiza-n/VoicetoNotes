import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import {Link} from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  const { email, password, fname, lname } = {
    email: form.email,
    password: form.password,
    fname: form.fname,
    lname: form.lname
  };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: fname,
        last_name: lname
      }
    }
  });

  if (error) return console.error(error.message);

  // Insert into profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: data.user.id, 
        first_name: fname,
        last_name: lname,
        email
      }
    ]);

  if (profileError) console.error(profileError);

  navigate("/dashboard");
};

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSignup} className="space-y-4">

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
        <Link to="/login"
        className="text-center text-sm opacity-70 block hover:underline">
          Already have an account? Login
        
        </Link>

      </form>
    </AuthLayout>
  );
}
