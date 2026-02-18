import UserProfileDropdown from "./UserProfileDropdown";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";


export default function Header({ user }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/login");
};

  return (
    <header className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">Voice Tasks</h1>

      {user && <UserProfileDropdown user={user} onLogout={handleLogout} />}
    </header>
  );
}

