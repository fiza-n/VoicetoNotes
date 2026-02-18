export async function fetchUser() {
  const res = await fetch("/api/me");
  return res.json();
}
