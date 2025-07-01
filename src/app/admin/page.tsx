'use client';

import { useState, useEffect } from 'react';


function Cronometro({ total }: { total: number }) {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    setContador(0);
  }, [total]);

  useEffect(() => {
    if (typeof total !== 'number' || isNaN(total) || total <= 0) return;
    if (contador >= total) return;

    const timeout = setTimeout(() => {
      setContador((c) => Math.min(c + 1, total));
    }, 30);

    return () => clearTimeout(timeout);
  }, [contador, total]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? (contador / total) * circumference : 0;
  const strokeDashoffset = circumference - progress;

  return (
    <div className="flex flex-col items-center relative">
      <svg
        width="160"
        height="160"
        className="transform -rotate-90 drop-shadow-lg"
        aria-label="Cronômetro de visitas"
        role="img"
      >
        <circle
          stroke="#374151"
          fill="transparent"
          strokeWidth="12"
          r={radius}
          cx="80"
          cy="80"
        />
        <circle
          stroke="#3B82F6"
          fill="transparent"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset.toString()}
          r={radius}
          cx="80"
          cy="80"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold select-none pointer-events-none">
        {contador}
      </div>
      <p className="mt-6 text-gray-300 text-lg font-medium tracking-wide uppercase">
        Total de Visitas
      </p>
      <p className="mt-1 text-gray-400 text-sm italic select-none">
        Atualizado em tempo real
      </p>
    </div>
  );
}

export default function Admin() {
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/visitas')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar visitas');
        }
        const data = await res.json();
        return data;
      })
      .then((data) => {
        if (typeof data.total === 'number') {
          setTotal(data.total);
        } else {
          throw new Error('Resposta inválida da API');
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-red-400 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-10 max-w-sm w-full border border-gray-700 text-center flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-10 text-gray-100">Painel do Advogado</h1>
        {total !== null ? (
          <Cronometro total={total} />
        ) : (
          <p className="text-gray-400 mb-6">Carregando visitas...</p>
        )}
      </div>
    </div>
  );
}
