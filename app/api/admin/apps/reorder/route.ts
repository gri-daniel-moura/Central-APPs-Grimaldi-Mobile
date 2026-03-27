import { reorderApps } from "@/lib/kv";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// TODO: add rate limiting before public deploy

function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  try {
    const items = await request.json();
    await reorderApps(items);

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering apps:", error);
    return NextResponse.json(
      { error: "Erro ao reordenar aplicativos" },
      { status: 500 }
    );
  }
}
