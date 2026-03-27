"use client";

import { AppCard as AppCardType, TabKey } from "@/lib/types";
import AppCard from "./AppCard";

interface AppGridProps {
  apps: AppCardType[];
  activeTab: TabKey;
  onOpenApp: (app: AppCardType) => void;
}

const tabLabels: Record<TabKey, { title: string; subtitle: string }> = {
  producao: {
    title: "Producao",
    subtitle: "Selecione um sistema para abrir",
  },
  chamados: {
    title: "Chamados",
    subtitle: "Acesse os sistemas de suporte",
  },
  formularios: {
    title: "Formularios",
    subtitle: "Preencha os formularios disponiveis",
  },
};

export default function AppGrid({ apps, activeTab, onOpenApp }: AppGridProps) {
  const filteredApps = apps
    .filter((a) => a.tab === activeTab)
    .sort((a, b) => a.order - b.order);

  const { title, subtitle } = tabLabels[activeTab];

  return (
    <div>
      {/* Section Header */}
      <div className="mb-4">
        <h2
          className="font-bold section-title-responsive"
          style={{ fontSize: "1.625rem", color: "#1A2A3A" }}
        >
          {title}
        </h2>
        <p
          className="mt-1"
          style={{ fontSize: "0.8125rem", color: "#6B7D93" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Card Grid — responsive: 1-col (<360px), 2-col, 3-col (sm), 4-col (lg) */}
      <div className="grid max-[359px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-[359px]:gap-2 gap-[10px] sm:gap-[14px] lg:gap-4">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} onOpen={onOpenApp} />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16"
          style={{ color: "#6B7D93" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-3 opacity-40"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <p style={{ fontSize: "0.875rem" }}>Nenhum sistema disponivel</p>
        </div>
      )}
    </div>
  );
}
