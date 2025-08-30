import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);
console.log("MAIL_TO:", process.env.MAIL_TO);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    // Configuração do transportador Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // sua conta Gmail
        pass: process.env.MAIL_PASS, // senha de app do Gmail
      },
    });

    // Envia o e-mail para o cliente
    await transporter.sendMail({
      from: `"Site Paludo Advocacia" <${process.env.MAIL_USER}>`, // remetente mais profissional
      to: process.env.MAIL_TO,     // destinatário = Hotmail do cliente
      replyTo: email,              // responde para quem preencheu o formulário
      subject: `Nova mensagem do site - ${name}`,
      text: `Você recebeu uma nova mensagem do site.\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
      html: `
        <h2>Nova mensagem do site</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensagem:</b><br/>${message}</p>
        <hr/>
        <p>Este e-mail foi enviado através do formulário de contato do site.</p>
      `,
      headers: {
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "Importance": "Normal"
      },
    });

    return NextResponse.json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return NextResponse.json(
      { message: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
