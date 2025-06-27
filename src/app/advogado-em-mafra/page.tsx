// app/advogado-em-mafra/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado em Mafra | Escritório [Advogado Paludo]",
  description:
    "Atendimento jurídico em Mafra com experiência nas áreas cível, trabalhista, criminal e mais. Consulte um advogado confiável e próximo de você.",
};

export default function AdvogadoMafraPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Advogado em Mafra</h1>

      <p className="mb-4">
        Procurando um advogado em Mafra? O escritório <strong>[Seu Nome]</strong> está pronto para te atender com seriedade e compromisso. Atuamos com
        excelência nas áreas de Direito Civil, Trabalhista, Penal, de Família e outras.
      </p>

      <p className="mb-4">
        Atendemos clientes de Mafra e região, com foco em soluções jurídicas eficazes e atendimento humanizado. Seja para consultorias, defesas ou ações
        judiciais, estamos à disposição para te ajudar.
      </p>

      <p className="mb-4">
        Entre em contato agora mesmo e agende uma consulta com um advogado que entende sua realidade. Atendemos presencialmente e também online.
      </p>

      <a
        href="https://wa.me/5547998452091"
        className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Agendar pelo WhatsApp
      </a>
    </main>
  );
}
