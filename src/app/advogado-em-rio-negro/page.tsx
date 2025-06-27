// app/advogado-em-rio-negro/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado em Rio Negro | Escritório [Advogado Paludo]",
  description: "Atendimento jurídico especializado em Rio Negro. Marque sua consulta com um advogado experiente nas áreas cível, trabalhista, criminal e mais.",
};

export default function AdvogadoRioNegroPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Advogado em Rio Negro</h1>
      <p className="mb-4">
        Se você está em busca de um advogado em Rio Negro, conte com o suporte do escritório [Seu Nome]. Atuamos nas áreas cível, trabalhista, criminal e
        outras, oferecendo atendimento personalizado para moradores da cidade e região.
      </p>
      <p className="mb-4">
        Nosso compromisso é com a ética, transparência e eficiência jurídica. Entre em contato pelo WhatsApp ou e-mail para agendar sua consulta.
      </p>
      <p className="mb-4">
        Atendemos em Rio Negro e também nas cidades vizinhas como Mafra, Campo do Tenente, Quitandinha, entre outras.
      </p>
      <a
        href="https://wa.me/5547998452091"
        className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Falar pelo WhatsApp
      </a>
    </main>
  );
}
