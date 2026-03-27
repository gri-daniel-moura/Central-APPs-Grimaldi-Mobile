"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppCard as AppCardType, TabKey } from "@/lib/types";
import SplashScreen from "@/components/SplashScreen";
import TopBar from "@/components/TopBar";
import AppGrid from "@/components/AppGrid";
import EmbeddedViewer from "@/components/EmbeddedViewer";

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

export default function HomePage() {
  const [apps, setApps] = useState<AppCardType[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("producao");
  const [selectedApp, setSelectedApp] = useState<AppCardType | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Lazy tab mounting — only mount when first activated (performance for Zebra TC21/TC26)
  const [mountedTabs, setMountedTabs] = useState<Set<TabKey>>(
    new Set(["producao"])
  );
  const [tabKey, setTabKey] = useState(0); // For content transition

  // Load apps
  useEffect(() => {
    fetch("/api/apps")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Restore last tab from localStorage
  // Never store credentials or session tokens here
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem("cds_prefs") || "{}");
      if (prefs.lastTab) {
        setActiveTab(prefs.lastTab);
        setMountedTabs((prev) => new Set(prev).add(prefs.lastTab));
      }
    } catch {
      // localStorage may be unavailable in some Android WebView configurations
    }
  }, []);

  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
    setMountedTabs((prev) => new Set(prev).add(tab));
    setTabKey((k) => k + 1); // Trigger content transition
    // Never store credentials or session tokens here
    try {
      const prefs = JSON.parse(localStorage.getItem("cds_prefs") || "{}");
      prefs.lastTab = tab;
      localStorage.setItem("cds_prefs", JSON.stringify(prefs));
    } catch {
      // localStorage may be unavailable in some Android WebView configurations
    }
  }, []);

  const handleOpenApp = useCallback((app: AppCardType) => {
    // "navigate" mode: full-page navigation (for systems that block X-Frame-Options)
    // In Android WebView APK, the back button returns to hub via webView.goBack()
    if (app.openMode === "navigate") {
      window.location.href = app.url;
      return;
    }
    // Default "iframe" mode: embedded viewer overlay
    setSelectedApp(app);
  }, []);

  const handleCloseEmbedded = useCallback(() => {
    setSelectedApp(null);
  }, []);

  return (
    <>
      <SplashScreen />

      {/* Embedded Viewer — only one iframe at a time */}
      {selectedApp && (
        <EmbeddedViewer app={selectedApp} onClose={handleCloseEmbedded} />
      )}

      {/* Top Bar */}
      <TopBar />

      {/* Tab Row + Content Area */}
      <div className="pt-[56px] topbar-spacer">
        {/* Tab Row — fixed position for Zebra compatibility (not sticky) */}
        <nav
          className="flex items-end px-4 pt-3 hide-scrollbar overflow-x-auto flex-nowrap no-select tab-nav-bg"
          style={{
            background: "#F4F6F9",
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            zIndex: 40,
            paddingBottom: "0px",
          }}
        >
          {/* Pill container — all tabs in one rounded container */}
          <div
            className="flex rounded-full p-1"
            style={{
              background: "#E8EEF6",
              border: "1px solid #DDE3EB",
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className="flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer tab-pill"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "999px",
                    background: isActive ? "#FFFFFF" : "transparent",
                    color: isActive ? "#094279" : "#6B7D93",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.875rem",
                    border: "none",
                    minHeight: "48px",
                    boxShadow: isActive
                      ? "0 1px 4px rgba(9,66,121,0.1)"
                      : "none",
                    touchAction: "manipulation",
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: tab.icon }}
                    className="flex items-center"
                  />
                  <span className="max-[359px]:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Area */}
        <div
          className="mx-4 scroll-container"
          style={{
            background: "#FFFFFF",
            border: "1px solid #DDE3EB",
            borderRadius: "16px",
            padding: "20px 16px",
            paddingBottom: "80px",
            marginTop: "68px",
            minHeight: "calc(100dvh - 56px - 68px - 16px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {loaded ? (
            <div key={tabKey} className="tab-content-enter">
              {(["producao", "chamados", "formularios"] as TabKey[]).map(
                (tab) =>
                  mountedTabs.has(tab) && (
                    <div
                      key={tab}
                      style={{ display: tab === activeTab ? "block" : "none" }}
                    >
                      <AppGrid
                        apps={apps}
                        activeTab={tab}
                        onOpenApp={handleOpenApp}
                      />
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
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
          )}
        </div>
      </div>

      {/* Safe area bottom padding */}
      <div className="safe-bottom" />
    </>
  );
}
