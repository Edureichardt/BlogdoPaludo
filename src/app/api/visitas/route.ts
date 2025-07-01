import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';

const SECRET_KEY = process.env.JWT_SECRET || "postgresql://postgres.frzwsdohmsmowwgpiixl:[abcd9195fe]@aws-0-us-east-2.pooler.supabase.com:6543/postgres";

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
