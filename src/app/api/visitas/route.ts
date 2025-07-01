import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

;

; // Ajuste se sua importação for diferente

const SECRET_KEY = process.env.JWT_SECRET || 'sua-chave-secreta-aqui';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET_KEY);

    // 🔽 Consulta real ao banco usando Prisma
    const total = await prisma.visita.count();

    return NextResponse.json({ total });
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido ou erro ao acessar o banco' }, { status: 401 });
  }
}
