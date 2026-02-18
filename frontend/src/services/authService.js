export async function login(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}
