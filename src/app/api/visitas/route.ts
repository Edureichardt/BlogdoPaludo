import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';

const SECRET_KEY = process.env.JWT_SECRET || "6eedac37e27b4cd57a5f98f34d24bf15e6dfa74ba625e53c754120676831a317";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  console.log("Authorization Header:", authHeader);
  console.log("Using SECRET_KEY:", SECRET_KEY);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("Token não fornecido ou formato inválido");
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recebido:", token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token verificado, payload:", decoded);

    // Busca o total real de visitas do banco
    const totalVisitas = await prisma.visita.count();
    console.log("Total visitas:", totalVisitas);

    return NextResponse.json({ total: totalVisitas });
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
