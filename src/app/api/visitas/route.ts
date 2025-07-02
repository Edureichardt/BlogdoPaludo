// src/app/api/visitas/route.ts
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalVisitas = await prisma.visita.count();
    console.log("Total de visitas no banco:", totalVisitas);
    return NextResponse.json({ total: totalVisitas });
  } catch (error) {
    console.error("Erro ao contar visitas no banco:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "IP desconhecido";
    const userAgent = req.headers.get("user-agent") || "User-Agent desconhecido";

    await prisma.visita.create({
      data: {
        ip,
        userAgent,
      },
    });

    console.log("Nova visita registrada:", { ip, userAgent });

    return NextResponse.json({ message: "Visita registrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar visita:", error);
    return NextResponse.json({ error: "Erro ao registrar visita" }, { status: 500 });
  }
}
