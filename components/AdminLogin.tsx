"use client";

import { useState } from "react";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  error: string;
}

export default function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLogin(password);
    setLoading(false);
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center px-6"
      style={{ background: "#F4F6F9" }}
    >
      <div
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 2px 14px rgba(9,66,121,0.08)",
          border: "1px solid #DDE3EB",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
            alt="Grimaldi Logo"
            style={{ maxHeight: "48px", width: "auto" }}
          />
        </div>

        <h1
          className="text-center font-bold mb-1"
          style={{ fontSize: "1.25rem", color: "#1A2A3A" }}
        >
          Painel Admin
        </h1>
        <p
          className="text-center mb-6"
          style={{ fontSize: "0.8125rem", color: "#6B7D93" }}
        >
          Insira a senha de administrador
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
            style={{
              background: "#F4F6F9",
              border: "1px solid #DDE3EB",
              fontSize: "0.875rem",
              color: "#1A2A3A",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#094279")}
            onBlur={(e) => (e.target.style.borderColor = "#DDE3EB")}
          />

          {error && (
            <p
              className="mt-2 text-center"
              style={{ fontSize: "0.75rem", color: "#E05C5C" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{ background: "#094279", fontSize: "0.875rem" }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
