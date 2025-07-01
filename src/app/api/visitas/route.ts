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

    if (error instanceof Error) {
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error("Erro não é uma instância de Error:", error);
    }

    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
