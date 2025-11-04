import "server-only";

export async function wp(endpoint: string, init?: RequestInit) {
  const base = process.env.WP_API_URL!;
  const auth = Buffer.from(
    `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
  ).toString("base64");

  const res = await fetch(`${base}${endpoint}`, {
    ...init,
    headers: { Authorization: `Basic ${auth}`, ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(`WP ${res.status}: ${await res.text()}`);
  return res.json();
}
