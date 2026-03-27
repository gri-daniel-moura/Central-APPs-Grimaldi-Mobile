"use client";

import { TabKey } from "@/lib/types";

interface TabNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string; icon: string }[] = [
  {
    key: "producao",
    label: "Producao",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
  },
  {
    key: "chamados",
    label: "Chamados",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>`,
  },
  {
    key: "formularios",
    label: "Formularios",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="pt-[56px]">
      {/* Tab Row — background matches page */}
      <nav
        className="flex items-end gap-1 px-4 pt-3 hide-scrollbar overflow-x-auto"
        style={{ background: "#F4F6F9" }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={
                isActive
                  ? {
                      padding: "9px 20px",
                      borderRadius: "12px 12px 0 0",
                      background: "#FFFFFF",
                      color: "#094279",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      borderTop: "2px solid #094279",
                      borderLeft: "1px solid #DDE3EB",
                      borderRight: "1px solid #DDE3EB",
                      borderBottom: "none",
                      marginBottom: "-1px",
                      boxShadow: "0 -2px 8px rgba(9,66,121,0.06)",
                      position: "relative",
                      zIndex: 2,
                    }
                  : {
                      padding: "9px 20px",
                      borderRadius: "999px",
                      background: "transparent",
                      color: "#6B7D93",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      border: "none",
                      marginBottom: "-1px",
                    }
              }
            >
              <span
                dangerouslySetInnerHTML={{ __html: tab.icon }}
                className="flex items-center"
              />
              <span className="hidden min-[360px]:inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Content Area Border — creates the folder-tab illusion */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #DDE3EB",
          borderRadius:
            activeTab === "producao"
              ? "0 12px 12px 12px"
              : "12px 12px 12px 12px",
          marginLeft: "16px",
          marginRight: "16px",
          minHeight: "calc(100dvh - 56px - 52px - 16px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* This div is a visual wrapper only — children are passed via props pattern */}
      </div>
    </div>
  );
}
