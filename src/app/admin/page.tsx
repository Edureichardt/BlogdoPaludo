'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiLogOut, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function Cronometro({ total }: { total: number }) {
  const [contador, setContador] = useState(0);

  useEffect(() => setContador(0), [total]);

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

interface Visita {
  ip: string;
  userAgent: string;
  createdAt: string;
}

export default function Admin() {
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [ips, setIps] = useState<Visita[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const limit = 20;

  const logout = useCallback(() => {
    localStorage.removeItem('tokenAdvogado');
    setAcessoLiberado(false);
    setSenha('');
    setTotal(null);
    setIps([]);
    router.push('/');
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('tokenAdvogado');
    if (token) setAcessoLiberado(true);
  }, []);

  useEffect(() => {
    if (!acessoLiberado) return;

    const token = localStorage.getItem('tokenAdvogado');
    if (!token) {
      logout();
      return;
    }

    fetch('/api/visitas', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Token inválido ou expirado');
        const data = await res.json();
        return data;
      })
      .then((data) => {
        if (typeof data.total === 'number') setTotal(data.total);
      })
      .catch(() => {
        alert('Erro ao carregar visitas. Faça login novamente.');
        logout();
      });
  }, [acessoLiberado, logout]);

  const verificarSenha = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Erro na autenticação');
        setLoading(false);
        return;
      }
      localStorage.setItem('tokenAdvogado', data.token);
      setAcessoLiberado(true);
      setLoading(false);
    } catch {
      alert('Erro no servidor');
      setLoading(false);
    }
  };

  const carregarIps = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('tokenAdvogado');
      const res = await fetch(`/api/visitas?page=${pageNumber}&limit=${limit}`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setIps(data.visitas);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!acessoLiberado) { 
    return (
      <div className="min-h-screen flex justify-center items-center bg-black bg-opacity-90 px-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full border border-gray-700 relative">
          <h1 className="text-2xl font-semibold mb-6 text-gray-100 text-center">
            Área Restrita
          </h1>
          <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha"
              className="border border-gray-600 bg-gray-700 text-gray-100 rounded-md p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            onClick={verificarSenha}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-md py-3 w-full font-semibold mt-6 transition disabled:opacity-50"
          >
            {loading ? 'Validando...' : 'Entrar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-10 max-w-2xl w-full border border-gray-700 text-center flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-10 text-gray-100">Painel do Advogado</h1>
        {total !== null ? <Cronometro total={total} /> : <p className="text-gray-400 mb-6">Carregando visitas...</p>}

        <div className="mt-10 w-full">
          <h2 className="text-xl text-gray-200 mb-4">Lista de IPs</h2>
          <button
            onClick={() => carregarIps(page)}
            disabled={loading}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Atualizar IPs'}
          </button>

          {ips.length > 0 ? (
            <ul className="text-left text-gray-100 max-h-64 overflow-y-auto border border-gray-700 rounded-md p-4">
              {ips.map((v, i) => (
                <li key={i} className="border-b border-gray-700 py-1">
                  {v.ip} - {new Date(v.createdAt).toLocaleString()} - {v.userAgent}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Nenhuma visita registrada.</p>
          )}

          {ips.length > 0 && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <button
                onClick={() => carregarIps(page - 1)}
                disabled={page <= 1 || loading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-300">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => carregarIps(page + 1)}
                disabled={page >= totalPages || loading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          )}
        </div>

        <footer className="mt-8 w-full flex justify-center pt-8 border-t border-gray-700">
          <button
            aria-label="Voltar para login"
            title="Sair do painel"
            onClick={logout}
            className="text-gray-400 hover:text-gray-200 transition text-2xl flex items-center gap-2"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
