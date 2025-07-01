import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';



const SECRET_KEY = process.env.JWT_SECRET || "6eedac37e27b4cd57a5f98f34d24bf15e6dfa74ba625e53c754120676831a317";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);

    // Busca o total real de visitas do banco
    const totalVisitas = await prisma.visita.count();

    return NextResponse.json({ total: totalVisitas });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
