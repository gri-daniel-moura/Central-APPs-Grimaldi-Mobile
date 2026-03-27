"use client";

import { useState, useEffect } from "react";
import { AppCard, TabKey } from "@/lib/types";

interface AdminFormProps {
  app?: AppCard | null;
  onSave: (data: Partial<AppCard>) => void;
  onClose: () => void;
}

export default function AdminForm({ app, onSave, onClose }: AdminFormProps) {
  const [name, setName] = useState(app?.name || "");
  const [description, setDescription] = useState(app?.description || "");
  const [url, setUrl] = useState(app?.url || "");
  const [tab, setTab] = useState<TabKey>(app?.tab || "producao");
  const [status, setStatus] = useState<"active" | "offline">(
    app?.status || "active"
  );
  const [notificationCount, setNotificationCount] = useState(
    app?.notificationCount || 0
  );
  const [iconSvg, setIconSvg] = useState(
    app?.iconSvg ||
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
  );
  const [order, setOrder] = useState(app?.order || 1);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    onSave({
      name,
      description,
      url,
      tab,
      status,
      notificationCount,
      iconSvg,
      order,
    });
    setSaving(false);
  };

  const inputStyle = {
    background: "#F4F6F9",
    border: "1px solid #DDE3EB",
    fontSize: "0.875rem" as const,
    color: "#1A2A3A",
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4">
      <div
        className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl p-6"
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 8px 32px rgba(9,66,121,0.15)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-bold"
            style={{ fontSize: "1.25rem", color: "#1A2A3A" }}
          >
            {app ? "Editar App" : "Adicionar App"}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Fechar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7D93"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ fontSize: "0.75rem", color: "#6B7D93" }}
            >
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-[#094279]"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ fontSize: "0.75rem", color: "#6B7D93" }}
            >
              Descricao
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-[#094279]"
              style={inputStyle}
            />
          </div>

          {/* URL */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ fontSize: "0.75rem", color: "#6B7D93" }}
            >
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-[#094279]"
              style={inputStyle}
            />
          </div>

          {/* Tab + Status Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block mb-1 font-medium"
                style={{ fontSize: "0.75rem", color: "#6B7D93" }}
              >
                Aba
              </label>
              <select
                value={tab}
                onChange={(e) => setTab(e.target.value as TabKey)}
                className="w-full px-3 py-2.5 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-[#094279]"
                style={inputStyle}
              >
                <option value="producao">Producao</option>
                <option value="chamados">Chamados</option>
                <option value="formularios">Formularios</option>
              </select>
            </div>

            <div>
              <label
                className="block mb-1 font-medium"
                style={{ fontSize: "0.75rem", color: "#6B7D93" }}
              >
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  setStatus((s) => (s === "active" ? "offline" : "active"))
                }
                className="w-full px-3 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
                style={inputStyle}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background:
                      status === "active" ? "#2ECC8F" : "#C5CDD8",
                  }}
                />
                {status === "active" ? "Ativo" : "Offline"}
              </button>
            </div>
          </div>

          {/* Notification Count + Order Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block mb-1 font-medium"
                style={{ fontSize: "0.75rem", color: "#6B7D93" }}
              >
                Notificacoes
              </label>
              <input
                type="number"
                min="0"
                value={notificationCount}
                onChange={(e) =>
                  setNotificationCount(parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-[#094279]"
                style={inputStyle}
              />
            </div>

            <div>
              <label
                className="block mb-1 font-medium"
                style={{ fontSize: "0.75rem", color: "#6B7D93" }}
              >
                Ordem
              </label>
              <input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-[#094279]"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Icon SVG */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ fontSize: "0.75rem", color: "#6B7D93" }}
            >
              Icone SVG
            </label>
            <div className="flex gap-3 items-start">
              <textarea
                value={iconSvg}
                onChange={(e) => setIconSvg(e.target.value)}
                rows={3}
                className="flex-1 px-3 py-2.5 rounded-lg outline-none resize-none text-xs font-mono focus:ring-1 focus:ring-[#094279]"
                style={inputStyle}
              />
              {/* Live Preview */}
              <div
                className="flex items-center justify-center shrink-0 rounded-xl"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#E8EEF6",
                  color: "#094279",
                }}
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
              style={{
                background: "#F4F6F9",
                color: "#6B7D93",
                border: "1px solid #DDE3EB",
                fontSize: "0.875rem",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !name || !url}
              className="flex-1 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{ background: "#094279", fontSize: "0.875rem" }}
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
