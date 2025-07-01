import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "6eedac37e27b4cd57a5f98f34d24bf15e6dfa74ba625e53c754120676831a317"; // Troque pela variável de ambiente

export async function POST(request: Request) {
  try {
    const { senha } = await request.json();

    const senhaCorreta = "advogado123";

    if (senha !== senhaCorreta) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Gera token JWT válido por 1 hora
    const token = jwt.sign({ role: "advogado" }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
