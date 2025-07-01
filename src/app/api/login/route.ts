import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { senha } = await request.json();

    const senhaCorreta = "advogado123";

    if (senha !== senhaCorreta) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Não gera token, só diz que senha está ok
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
