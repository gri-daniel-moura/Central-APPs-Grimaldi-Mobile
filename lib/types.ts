export interface AppCard {
  id: string;
  tab: "producao" | "chamados" | "formularios";
  name: string;
  description: string;
  url: string;
  iconSvg: string;
  status: "active" | "offline";
  notificationCount: number;
  order: number;
  updatedAt: string;
  /** "iframe" = embedded viewer, "navigate" = full-page nav (for systems that block X-Frame-Options) */
  openMode?: "iframe" | "navigate";
}

export type TabKey = "producao" | "chamados" | "formularios";

export interface TabInfo {
  key: TabKey;
  label: string;
  icon: string; // SVG string
}

export interface ReorderItem {
  id: string;
  order: number;
}
