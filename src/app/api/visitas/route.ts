import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Busca o total real de visitas no banco
    const totalVisitas = await prisma.visita.count();

    return NextResponse.json({ total: totalVisitas });
  } catch (error) {
    console.error("Erro ao buscar visitas:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
