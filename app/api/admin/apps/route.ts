import { addApp } from "@/lib/kv";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// TODO: add rate limiting before public deploy

function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newApp = await addApp({
      tab: body.tab,
      name: body.name,
      description: body.description,
      url: body.url,
      iconSvg: body.iconSvg,
      status: body.status || "active",
      notificationCount: body.notificationCount || 0,
      order: body.order || 999,
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error("Error creating app:", error);
    return NextResponse.json(
      { error: "Erro ao criar aplicativo" },
      { status: 500 }
    );
  }
}
