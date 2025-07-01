import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalVisitas = await prisma.visita.count();
    return NextResponse.json({ total: totalVisitas });
  } catch (error) {
    console.error('Erro no GET /api/visitas:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
