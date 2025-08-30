"use client";

import { FiLock } from 'react-icons/fi';

import { useEffect, useState } from "react";
import {
  FaBalanceScale,
  FaGavel,
  FaUserTie,
  FaWhatsapp,
  FaPhone,
  
  
} from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [especializacoesOpenIndex, setEspecializacoesOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  useEffect(() => {
  fetch("/api/visitas", { method: "POST" });
}, []);


  useEffect(() => {
    function handleScroll() {
      const sections = ["atuacao", "sobre", "especializacoes", "contato", "mapa"];
      const newVisible: { [key: string]: boolean } = {};

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          newVisible[id] = true;
        }
      });

      setVisibleSections((prev) => ({ ...prev, ...newVisible }));
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleEspecializacao = (index: number) => {
    setEspecializacoesOpenIndex(especializacoesOpenIndex === index ? null : index);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("Enviando...");

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Mensagem enviada com sucesso!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Erro ao enviar. Tente novamente.");
    }
  } catch (<_err) {
    setStatus("Erro no servidor.");
  }
};

  const especializacoes = [
    {
      icon: <FaBalanceScale />,
      title: "Direito Civil",
      desc: `Direito de Família:
Atuação em divórcio, reconhecimento e dissolução de união estável, pensão alimentícia, guarda e regulamentação de visitas, além de inventário e partilha de bens.

Direito das Obrigações e Contratos:
Revisão, elaboração e análise de contratos, cobranças, indenizações e conflitos entre particulares.

Direito do Consumidor:
Defesa do consumidor em casos de cobranças abusivas, vícios em produtos/serviços ou negativa indevida de direitos.

Regularização de Imóveis e Áreas:
Assessoria em usucapião, escrituras, registros, questões de condomínio e regularização fundiária.`,
    },
    {
      icon: <FaGavel />,
      title: "Direito Trabalhista",
      desc: `Reclamações Trabalhistas:
  
Propositura e defesa em ações referentes a salários, rescisões, verbas trabalhistas e direitos não pagos.
Assédio Moral e Sexual:
Atuação em casos de assédio no ambiente de trabalho, buscando reparação de danos e garantia de direitos.
Acidente de Trabalho e Doenças Ocupacionais:
Assessoria para trabalhadores vítimas de acidentes ou doenças decorrentes do trabalho.
Consultoria Preventiva:
Orientação para empresas e empregados visando a prevenção de litígios e adequação à legislação vigente.
Elaboração e atualização de Regimentos Internos, Normas de Segurança, Contratos de Trabalho, Programas de 
Compliance Trabalhista entre outras atividades..`,
    },
    {
      icon: <FaUserTie />,
      title: "Direito Previdenciário",
      desc: `Aposentadorias:
Assessoria completa para análise, planejamento e requerimento de aposentadorias urbanas, rurais, por idade, tempo 
de contribuição ou invalidez.
Auxílio-Doença e Benefícios por Incapacidade:
Orientação em pedidos e revisões de auxílio-doença, aposentadoria por invalidez e auxílio-acidente.
Pensão por Morte:
Solicitação e acompanhamento de benefícios de pensão por morte junto ao INSS.
BPC/LOAS:
Requerimento e defesa do direito ao Benefício de Prestação Continuada para idosos e pessoas com deficiência.`,
    },
  ];

  const Card = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
    <div className="card flex flex-col items-start gap-4 text-[#d4af37] border border-[#d4af37] rounded-lg p-6 shadow-lg bg-[#1a1a1a] cursor-default transition-transform hover:-translate-y-2 hover:shadow-xl">
      <div className="text-4xl">{icon}</div>
      <h4 className="text-2xl font-semibold">{title}</h4>
      <p className="text-[#c7b56a] whitespace-pre-line">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-serif relative">
      {/* Botões flutuantes */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a
          href="https://wa.me/5547984552091"
          className="bg-[#d4af37] hover:bg-[#c79c2f] p-4 rounded-full shadow-lg transition-all duration-300 shadow-[#d4af37]/90 hover:shadow-[#c79c2f]/90 animate-glow"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-black text-2xl" />
        </a>
        
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-[#0a0a0a] h-[140px] md:h-[180px] px-6 md:px-12 flex justify-between items-center border-b border-[#d4af37] z-40">
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src="/logo1.png"
            alt="Logo Paludo"
            width={120}
            height={80}
            className="rounded-full shadow-lg"
            priority
          />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[#d4af37]">
            PALUDO
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8 text-lg font-semibold text-[#d4af37] font-sans">
          <a href="#sobre" className="hover:text-[#c79c2f] transition-colors">
            SOBRE
          </a>
          <a href="#atuacao" className="hover:text-[#c79c2f] transition-colors">
            ATUAÇÃO
          </a>
          <a href="#especializacoes" className="hover:text-[#c79c2f] transition-colors">
            SOBRE AS ÁREAS DE ATUAÇÃO
          </a>
          <a href="#contato" className="hover:text-[#c79c2f] transition-colors">
            CONTATO
          </a>
          <a href="#mapa" className="hover:text-[#c79c2f] transition-colors">
            LOCALIZAÇÃO
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative h-[70vh] md:h-[90vh] bg-cover bg-center flex items-center justify-center text-center overflow-hidden"
        style={{ backgroundImage: "url('/banner-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <p className="text-lg md:text-2xl italic text-[#c7b56a] mb-8">
            Esplanação jurídica em linguagem clara, na medida que você precisa!
          </p>
          <a
            href="https://wa.me/5547984552091"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d4af37] hover:bg-[#c79c2f] text-black font-semibold py-3 px-6 md:px-8 rounded-full shadow-md transition-transform hover:scale-105 inline-block"
          >
            ENTRE EM CONTATO
          </a>
        </div>
      </section>

      {/* Atuação */}
      <section
        id="atuacao"
        className={`max-w-6xl mx-auto py-16 md:py-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 transition-opacity duration-700 ease-in-out ${
          visibleSections["atuacao"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div>
  <h3 className="text-3xl font-bold mb-6 border-[#d4af37] pb-2"></h3>
  <div className="aspect-video rounded-lg overflow-hidden border border-[#d4af37] shadow-lg">
    <img
      src="/balanca.png"
      alt="Paludo"
      className="w-full h-full object-contain"
    />
  </div>


        </div>
        <div>
          <h3 className="text-3xl font-bold mb-6 border-b border-[#d4af37] pb-2">ÁREAS DE ATUAÇÃO</h3>
          <div className="mb-6">
            <Card
              icon={<FaBalanceScale />}
              title="Cível"
              desc={`Atuação em questões como família (pensão, divórcio, guarda, inventário), contratos, responsabilidade civil, consumidor e regularização de imóveis, sempre priorizando soluções justas e eficazes.`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card
              icon={<FaGavel />}
              title="Trabalhista"
              desc={`Defesa dos interesses de empregados e empregadores, abrangendo ações relacionadas a vínculos empregatícios, rescisões, assédio, verbas trabalhistas e consultoria preventiva para empresas e trabalhadores.`}
            />
            <Card
              icon={<FaUserTie />}
              title="Previdenciária"
              desc={`Orientação e atuação na concessão de benefícios do INSS, como aposentadorias, pensão por morte, auxílio-doença, BPC/LOAS, com foco na agilidade e segurança ao cliente.`}
            />
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section
        id="sobre"
        className={`bg-[#111] py-16 md:py-20 px-6 text-center transition-opacity duration-700 ease-in-out ${
          visibleSections["sobre"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-3xl font-bold mb-6 text-[#d4af37] border-b border-[#d4af37] pb-2 inline-block">
          SOBRE
        </h3>
        <p className="text-[#c7b56a] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Olá, sou Paulo Cesar Paludo dos Santos, advogado inscrito na OAB/PR sob o n° 74.680 e OAB/SC sob o n° 44.059 atuante com sólida experiência nas áreas cível, previdenciária e trabalhista. Ao longo da minha trajetória, tenho me dedicado a oferecer soluções jurídicas eficazes, sempre com foco na necessidade de cada cliente.
          Aqui, você encontra explicações jurídicas claras e atendimento personalizado, com respostas rápidas e total transparência ao longo de todo o processo. Atuo na área do Direito Cível,incoporando atuação no Direito Trabalhista e Previdenciário
          Meu compromisso é proporcionar segurança jurídica, acolhimento e um atendimento realmente ágil, para que você se sinta amparado em todas as etapas.
          Conte comigo para defender seus direitos, esclarecer dúvidas e buscar as melhores alternativas para o seu caso.
        </p>
      </section>

      {/* Sobre as áreas de atuação (acordeon) */}
      <section
        id="especializacoes"
        className={`max-w-6xl mx-auto py-16 md:py-20 px-6 md:px-12 text-[#d4af37] transition-opacity duration-700 ease-in-out ${
          visibleSections["especializacoes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-3xl font-bold mb-12 text-center border-b border-[#d4af37] pb-2">
          SOBRE AS ÁREAS DE ATUAÇÃO
        </h3>
        <div className="flex flex-col gap-4">
          {especializacoes.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="border border-[#d4af37] rounded-lg bg-[#1a1a1a] cursor-pointer shadow-lg"
            >
              <button
                onClick={() => toggleEspecializacao(i)}
                className="flex items-center gap-4 p-4 w-full text-left text-xl font-semibold"
                aria-expanded={especializacoesOpenIndex === i}
                aria-controls={`desc-${i}`}
              >
                <span className="text-3xl">{icon}</span>
                {title}
                <span className="ml-auto text-2xl select-none">
                  {especializacoesOpenIndex === i ? "−" : "+"}
                </span>
              </button>
              <div
                id={`desc-${i}`}
                className={`overflow-hidden transition-all duration-300 px-6 pb-4 ${
                  especializacoesOpenIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#c7b56a] whitespace-pre-line">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section
        id="contato"
        className={`max-w-xl mx-auto px-6 py-16 md:py-20 text-[#d4af37] transition-opacity duration-700 ease-in-out ${
          visibleSections["contato"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-3xl font-bold mb-8 text-center border-b border-[#d4af37] pb-2 inline-block">
          CONTATO
        </h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder="Seu nome"
    required
    className="w-full p-3 rounded border border-[#c7b56a] bg-[#1c1c1c] text-[#d4af37]"
  />
  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Seu email"
    required
    className="w-full p-3 rounded border border-[#c7b56a] bg-[#1c1c1c] text-[#d4af37]"
  />
  <textarea
    name="message"
    value={form.message}
    onChange={handleChange}
    placeholder="Sua mensagem"
    rows={5}
    required
    className="w-full p-3 rounded border border-[#c7b56a] bg-[#1c1c1c] text-[#d4af37]"
  />
  <button
    type="submit"
    className="w-full bg-[#d4af37] hover:bg-[#c79c2f] text-black font-semibold py-3 rounded-full shadow-md transition hover:scale-105"
  >
    Enviar Mensagem
  </button>
</form>

{status && <p className="mt-2 text-center text-sm">{status}</p>}

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="flex justify-center items-center gap-2 text-[#d4af37]">
            <FaPhone /> (55) 47 984552091
          </p>
          <p className="flex justify-center items-center gap-2 text-[#d4af37]">
    paulopaludoadvogado@hotmail.com
  </p>
          
          <button
          
            onClick={() => setShowPrivacy(true)}
            className="underline hover:text-[#c79c2f] cursor-pointer text-sm"
          >
            Política de Privacidade
          </button>
        </div>
      </section>

      {/* Modal Política */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a0a0a] text-[#d4af37] p-6 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto shadow-lg relative">
            <h4 className="text-2xl font-bold mb-4">Política de Privacidade</h4>
            <p className="whitespace-pre-line text-[#c7b56a] text-sm leading-relaxed">
              {/* Coloque o texto da política de privacidade aqui */}
               1. Introdução
 Esta Política de Privacidade tem como objetivo demonstrar o compromisso do escritório Paulo Cesar Paludo dos Santos – 
Advogado – com a privacidade, proteção de dados e transparência no tratamento das informações dos clientes, 
visitantes e usuários do nosso site e dos nossos serviços, em conformidade com a Lei Geral de Proteção de Dados 
Pessoais (LGPD - Lei 13.709/2018).
 2. Coleta de Dados
 Coletamos dados pessoais fornecidos voluntariamente por meio de formulários de contato, atendimento presencial, 
telefone, WhatsApp, email ou outros meios disponibilizados pelo escritório, tais como:
    Nome completo
    CPF/RG e/ou outros documentos necessários
    Endereço, telefone e e-mail
    Informações relativas ao caso jurídico
    Dados bancários somente para fins de elaboração de contratos e pagamentos
    Demais informações pertinentes à prestação dos serviços advocatícios
 3. Finalidade do Tratamento
 Os dados coletados são utilizados para:
    Contato, atendimento e retorno a solicitações de clientes
    Elaboração e execução de contratos de prestação de serviços jurídicos
    Cumprimento de obrigações legais e regulatórias
    Proporcionar segurança jurídica e defesa dos interesses do cliente
    Manutenção de registro e histórico de atendimentos
    Envio de informações relevantes sobre seu processo ou serviços contratados
 4. Compartilhamento de Dados
 Seus dados pessoais são tratados de forma confidencial e só serão compartilhados quando necessário:
    Para o cumprimento de obrigações legais ou regulatórias;
    Com órgãos judiciais, administrativos ou autoridades competentes, sempre que requerido por lei;
    Com parceiros e prestadores de serviços indispensáveis para a execução das atividades, sempre sob compromisso de 
confidencialidade e sigilo.
 5. Segurança dos Dados
 Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, 
alteração ou divulgação indevida.
 6. Retenção e Exclusão de Dados
 Os dados pessoais são armazenados somente pelo período necessário para cumprimento das finalidades acima, 
obrigações legais e/ou defesa dos interesses do escritório e dos clientes. Após esse período, os dados poderão ser 
eliminados de forma segura.
 7. Direitos do Titular dos Dados
 Você poderá, a qualquer momento, solicitar:
    Informação sobre o tratamento de seus dados
    Acesso, correção ou atualização de dados pessoais
    Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos
    Portabilidade dos dados, quando aplicável
    Revogação do consentimento
 Para exercer seus direitos, entre em contato pelo e-mail paulopaludoadvogado@hotmail.com, pelo WhatsApp 47 98455 
2091, ou pelo formulário de contato deste site.
8. Atualizações desta Política
 Esta Política poderá ser revisada e atualizada periodicamente para assegurar a conformidade contínua com a legislação 
vigente e aprimoramento das práticas de privacidade.
 Dúvidas ou solicitações?
 Entre em contato conosco:
 Email: paulopaludoadvogado@hotmail.com
 WhatsApp: 47 98455 2091.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-3 right-3 text-[#d4af37] hover:text-[#c79c2f] text-2xl font-bold"
              aria-label="Fechar política de privacidade"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Localização */}
      <section
        id="mapa"
        className={`max-w-5xl mx-auto px-6 py-16 md:py-20 transition-opacity duration-700 ease-in-out ${
          visibleSections["mapa"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-3xl font-bold mb-8 text-center text-[#d4af37] border-b border-[#d4af37] pb-2 inline-block">
          LOCALIZAÇÃO
        </h3>
        <div className="w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden border border-[#d4af37] shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=1m18!1m12!1m3!1d7165.468960202583!2d-49.80525922541132!3d-26.10758477713619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dd930fef637f0b%3A0x7ff3b2bc3d8f5792!2sR.%20Dr.%20Get%C3%BAlio%20Vargas%2C%20162%2C%20Rio%20Negro%20-%20PR%2C%2089300-266!5e0!3m2!1spt-BR!2sbr!4v1750344820265!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Escritório Paludo"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
 <footer className="bg-[#121212] py-6 px-4 text-sm text-[#bfa845] flex flex-col items-center justify-center gap-2">
  <span>© 2025 Paludo Advocacia. Todos os direitos reservados.</span>
  <a
    href="https://www.instagram.com/reichardt.dev/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#c79c2f]"
  >
    Desenvolvido por EduReichardt
  </a>

  {/* Ícone de cadeado para área de login */}
  <a
    href="/admin"
    aria-label="Área de Login"
    title=""
    className="mt-2 flex items-center text-[#d4af37] hover:text-[#c79c2f] transition-colors"
  >
    <FiLock size={24} />
  </a>
</footer>



      {/* Animação do glow */}
      <style jsx>{`
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.8);
          }
          to {
            box-shadow: 0 0 20px 6px rgba(212, 175, 55, 1);
          }
        }
      `}</style>
    </div>
  );
}
