import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '../../lib/prisma';


const SECRET_KEY = process.env.JWT_SECRET || "uma-chave-muito-secreta";

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
