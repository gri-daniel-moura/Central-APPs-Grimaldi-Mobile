"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppCard, TabKey } from "@/lib/types";
import AdminLogin from "@/components/AdminLogin";
import AdminForm from "@/components/AdminForm";

const tabLabels: Record<TabKey, string> = {
  producao: "Producao",
  chamados: "Chamados",
  formularios: "Formularios",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [apps, setApps] = useState<AppCard[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("producao");
  const [editingApp, setEditingApp] = useState<AppCard | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Drag state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Check sessionStorage for auth
  useEffect(() => {
    const auth = sessionStorage.getItem("cds_admin_auth");
    if (auth) {
      setPassword(auth);
      setAuthenticated(true);
    }
  }, []);

  // Fetch apps when authenticated
  const fetchApps = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/apps");
      const data = await res.json();
      setApps(data);
    } catch {
      console.error("Failed to fetch apps");
    }
    setLoading(false);
  }, [password]);

  useEffect(() => {
    if (authenticated) fetchApps();
  }, [authenticated, fetchApps]);

  const handleLogin = async (pwd: string) => {
    // Test the password by calling the admin API
    try {
      const res = await fetch("/api/apps", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (res.ok) {
        setPassword(pwd);
        sessionStorage.setItem("cds_admin_auth", pwd);
        setAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Senha incorreta");
      }
    } catch {
      // If the basic API works, the password is for admin routes
      // Try a different approach: verify password against admin route
      setPassword(pwd);
      sessionStorage.setItem("cds_admin_auth", pwd);
      setAuthenticated(true);
      setLoginError("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cds_admin_auth");
    setAuthenticated(false);
    setPassword("");
  };

  const handleSave = async (data: Partial<AppCard>) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    };

    try {
      if (editingApp) {
        await fetch(`/api/admin/apps/${editingApp.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/admin/apps", {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
      }
      setShowForm(false);
      setEditingApp(null);
      fetchApps();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este aplicativo?")) return;
    try {
      await fetch(`/api/admin/apps/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      fetchApps();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    const filteredApps = apps
      .filter((a) => a.tab === activeTab)
      .sort((a, b) => a.order - b.order);

    if (dragItem.current === null || dragOverItem.current === null) return;

    const draggedApp = filteredApps[dragItem.current];
    const reordered = [...filteredApps];
    reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedApp);

    const reorderItems = reordered.map((app, idx) => ({
      id: app.id,
      order: idx + 1,
    }));

    dragItem.current = null;
    dragOverItem.current = null;

    try {
      await fetch("/api/admin/apps/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(reorderItems),
      });
      fetchApps();
    } catch (err) {
      console.error("Reorder failed:", err);
    }
  };

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} error={loginError} />;
  }

  const filteredApps = apps
    .filter((a) => a.tab === activeTab)
    .sort((a, b) => a.order - b.order);

  return (
    <div style={{ background: "#F4F6F9", minHeight: "100dvh" }}>
      {/* Admin Form Modal */}
      {showForm && (
        <AdminForm
          app={editingApp}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingApp(null);
          }}
        />
      )}

      {/* Top Bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4"
        style={{
          height: "56px",
          background: "#FFFFFF",
          borderBottom: "1px solid #DDE3EB",
          boxShadow: "0 1px 6px rgba(9,66,121,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
            alt="Grimaldi Logo"
            style={{ maxHeight: "42px", width: "auto" }}
          />
          <span
            className="font-bold"
            style={{ fontSize: "1rem", color: "#094279" }}
          >
            Painel Admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-red-50 cursor-pointer"
          style={{
            fontSize: "0.8125rem",
            color: "#E05C5C",
            border: "1px solid #DDE3EB",
          }}
        >
          Sair
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Tab Filter */}
        <div className="flex gap-2 mb-6">
          {(["producao", "chamados", "formularios"] as TabKey[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer"
              style={
                activeTab === t
                  ? {
                      background: "#094279",
                      color: "#FFFFFF",
                      fontSize: "0.8125rem",
                    }
                  : {
                      background: "#FFFFFF",
                      color: "#6B7D93",
                      border: "1px solid #DDE3EB",
                      fontSize: "0.8125rem",
                    }
              }
            >
              {tabLabels[t]}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => {
            setEditingApp(null);
            setShowForm(true);
          }}
          className="w-full mb-5 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
          style={{ background: "#094279", fontSize: "0.875rem" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Adicionar App
        </button>

        {/* Card List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div
              className="animate-spin rounded-full border-2 border-t-transparent"
              style={{
                width: "32px",
                height: "32px",
                borderColor: "#DDE3EB",
                borderTopColor: "#094279",
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center gap-3 p-4 rounded-xl transition-colors hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #DDE3EB",
                }}
              >
                {/* Drag Handle */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C5CDD8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="9" cy="5" r="1" />
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="19" r="1" />
                  <circle cx="15" cy="5" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <circle cx="15" cy="19" r="1" />
                </svg>

                {/* Icon */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#E8EEF6",
                    color: "#094279",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: app.iconSvg
                      .replace(/width="[^"]*"/, 'width="20"')
                      .replace(/height="[^"]*"/, 'height="20"'),
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold truncate"
                      style={{ fontSize: "0.875rem", color: "#1A2A3A" }}
                    >
                      {app.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        fontSize: "0.625rem",
                        background: "#E8EEF6",
                        color: "#094279",
                        fontWeight: 600,
                      }}
                    >
                      {tabLabels[app.tab]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          app.status === "active" ? "#2ECC8F" : "#C5CDD8",
                      }}
                    />
                    <span style={{ fontSize: "0.6875rem", color: "#6B7D93" }}>
                      {app.status === "active" ? "Ativo" : "Offline"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingApp(app);
                      setShowForm(true);
                    }}
                    className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    aria-label="Editar"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#094279"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="flex items-center justify-center p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Excluir"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E05C5C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {filteredApps.length === 0 && (
              <div
                className="text-center py-12"
                style={{ color: "#6B7D93", fontSize: "0.875rem" }}
              >
                Nenhum aplicativo nesta aba
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
