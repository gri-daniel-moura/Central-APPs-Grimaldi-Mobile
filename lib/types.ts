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
