import { useState, useRef, useEffect } from "react";
import userAnimation from "../assets/children_15689871.gif";

export default function UserProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-700 text-white font-bold cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
        title={user?.name || "User"}
      >
        {<img src = {userAnimation} alt="user account" className="w-10 h-10 rounded-full"/>}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-black text-white rounded-xl shadow-lg p-4">
          <div className="mb-3 border-b border-gray-700 pb-2">
            <div className="flex gap-1">
              <p className="font-bold">{user?.fname || "User"}</p>
              <p className="font-bold">{user?.lname || "User"}</p>
            </div>
            
            <p className="text-sm opacity-70">{user?.email || ""}</p>
          </div>

          <button
            className="w-full text-left hover:bg-gray-800 p-2 rounded-lg"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
