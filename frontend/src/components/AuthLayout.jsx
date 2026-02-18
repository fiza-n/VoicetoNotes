export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
