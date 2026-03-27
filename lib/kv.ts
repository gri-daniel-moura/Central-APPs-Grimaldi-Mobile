import { AppCard } from "./types";
import { seedApps, generateId } from "./seedData";

const KV_KEY = "cds_apps_config";

// ---------- Environment variable validation ----------
// Log a warning if KV credentials are missing (fall back to in-memory store)
if (typeof process !== "undefined" && process.env) {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) {
    console.warn(
      "[Central de Sistemas] KV_REST_API_URL or KV_REST_API_TOKEN not set. " +
        "Using in-memory fallback. Data will be lost on restart. " +
        "Set these environment variables in Vercel for production use."
    );
  }
}

// ---------- In-memory fallback for local dev ----------
let memoryStore: AppCard[] | null = null;

function getMemoryStore(): AppCard[] {
  if (!memoryStore) {
    memoryStore = [...seedApps];
  }
  return memoryStore;
}

// ---------- Vercel KV helpers ----------
// Uses REST API directly to avoid @vercel/kv dependency issues
async function kvGet(): Promise<AppCard[] | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.result) return null;
    const parsed =
      typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    return parsed as AppCard[];
  } catch {
    return null;
  }
}

async function kvSet(apps: AppCard[]): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return false;

  try {
    const res = await fetch(`${url}/set/${KV_KEY}/${encodeURIComponent(JSON.stringify(apps))}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------- Public API ----------

export async function getApps(): Promise<AppCard[]> {
  // Try Vercel KV first
  const kvApps = await kvGet();
  if (kvApps && kvApps.length > 0) {
    return kvApps.sort((a, b) => a.order - b.order);
  }

  // Seed KV if available but empty
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    await kvSet(seedApps);
    return [...seedApps].sort((a, b) => a.order - b.order);
  }

  // Fallback to in-memory store
  return getMemoryStore().sort((a, b) => a.order - b.order);
}

export async function getAppById(id: string): Promise<AppCard | undefined> {
  const apps = await getApps();
  return apps.find((a) => a.id === id);
}

export async function addApp(
  data: Omit<AppCard, "id" | "updatedAt">
): Promise<AppCard> {
  const apps = await getApps();
  const newApp: AppCard = {
    ...data,
    id: generateId(),
    updatedAt: new Date().toISOString(),
  };
  apps.push(newApp);
  await saveApps(apps);
  return newApp;
}

export async function updateApp(
  id: string,
  data: Partial<Omit<AppCard, "id">>
): Promise<AppCard | null> {
  const apps = await getApps();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx] = { ...apps[idx], ...data, updatedAt: new Date().toISOString() };
  await saveApps(apps);
  return apps[idx];
}

export async function deleteApp(id: string): Promise<boolean> {
  const apps = await getApps();
  const filtered = apps.filter((a) => a.id !== id);
  if (filtered.length === apps.length) return false;
  await saveApps(filtered);
  return true;
}

export async function reorderApps(
  items: { id: string; order: number }[]
): Promise<boolean> {
  const apps = await getApps();
  for (const item of items) {
    const app = apps.find((a) => a.id === item.id);
    if (app) {
      app.order = item.order;
      app.updatedAt = new Date().toISOString();
    }
  }
  await saveApps(apps);
  return true;
}

async function saveApps(apps: AppCard[]): Promise<void> {
  const saved = await kvSet(apps);
  if (!saved) {
    // Fallback: update in-memory store
    memoryStore = apps;
  }
}
