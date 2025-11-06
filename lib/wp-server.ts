import "server-only";

interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export async function wp(endpoint: string, init?: NextRequestInit) {
  const base = process.env.WP_API_URL!;
  const auth = Buffer.from(
    `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
  ).toString("base64");

  const res = await fetch(`${base}${endpoint}`, {
    ...init,
    headers: { Authorization: `Basic ${auth}`, ...(init?.headers || {}) },
    next: init?.next ? { ...init.next } : undefined,
  });
  if (!res.ok) throw new Error(`WP ${res.status}: ${await res.text()}`);
  return res.json();
}
