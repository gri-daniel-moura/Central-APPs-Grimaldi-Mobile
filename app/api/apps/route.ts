import { getApps } from "@/lib/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apps = await getApps();
    return NextResponse.json(apps);
  } catch (error) {
    console.error("Error fetching apps:", error);
    return NextResponse.json(
      { error: "Erro ao carregar aplicativos" },
      { status: 500 }
    );
  }
}
