import { updateApp, deleteApp } from "@/lib/kv";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// TODO: add rate limiting before public deploy

function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/apps/[id]">
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const updated = await updateApp(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: "Aplicativo nao encontrado" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating app:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar aplicativo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/apps/[id]">
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const deleted = await deleteApp(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Aplicativo nao encontrado" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting app:", error);
    return NextResponse.json(
      { error: "Erro ao excluir aplicativo" },
      { status: 500 }
    );
  }
}
