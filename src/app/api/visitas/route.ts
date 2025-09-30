import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    const visitas = await prisma.visita.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const total = await prisma.visita.count();

    return NextResponse.json({
      visitas,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Erro ao buscar visitas:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "IP desconhecido";
    const userAgent = req.headers.get("user-agent") || "User-Agent desconhecido";

    await prisma.visita.create({
      data: { ip, userAgent },
    });

    console.log("Nova visita registrada:", { ip, userAgent });
    return NextResponse.json({ message: "Visita registrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar visita:", error);
    return NextResponse.json({ error: "Erro ao registrar visita" }, { status: 500 });
  }
}
