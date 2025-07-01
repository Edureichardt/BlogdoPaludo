import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "uma-chave-muito-secreta"; // Depois troque pela variável de ambiente

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
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
