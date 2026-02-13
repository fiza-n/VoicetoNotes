import UserProfileDropdown from "./UserProfileDropdown";

export default function Header({ user }) {
  return (
    <header className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">Voice Tasks</h1>

      {user && <UserProfileDropdown user={user} onLogout={() => console.log("logout")} />}
    </header>
  );
}

