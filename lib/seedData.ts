import { AppCard } from "./types";

const defaultIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;

export function generateId(): string {
  return crypto.randomUUID();
}

export const seedApps: AppCard[] = [
  // Tab: producao
  {
    id: generateId(),
    tab: "producao",
    name: "Apportal",
    description: "Portal de Producao",
    url: "http://stosr002.grimaldi.local/apportal/app_sec_Login/",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 1,
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    tab: "producao",
    name: "Movimentacao de Estoque",
    description: "Controle de Stock",
    url: "https://gristockcontrol.replit.app/",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 2,
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    tab: "producao",
    name: "Kanban Supply",
    description: "Gestao de Suprimentos",
    url: "http://stosr002.grimaldi.local/kanban/app_secLogin/",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 3,
    updatedAt: new Date().toISOString(),
  },
  // Tab: chamados
  {
    id: generateId(),
    tab: "chamados",
    name: "Sysmaint",
    description: "Chamados Gerais",
    url: "http://stosr002.grimaldi.local/sysmaint/index.php?class=LoginForm",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 1,
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    tab: "chamados",
    name: "Chamados TI",
    description: "Suporte de Tecnologia",
    url: "http://10.1.0.3/index.php?",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 2,
    updatedAt: new Date().toISOString(),
  },
  // Tab: formularios
  {
    id: generateId(),
    tab: "formularios",
    name: "Ficha CAI",
    description: "Formulario de Acidente",
    url: "https://forms.office.com/r/qpTBq5VgqA",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 1,
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    tab: "formularios",
    name: "Formulario Qualidade",
    description: "Controle de Qualidade",
    url: "https://forms.office.com/r/awqzsgmWZG",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 2,
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    tab: "formularios",
    name: "Sistema 5S",
    description: "Auditoria e Organizacao",
    url: "https://gri5s.grimaldi.com.br/users",
    iconSvg: defaultIconSvg,
    status: "active",
    notificationCount: 0,
    order: 3,
    updatedAt: new Date().toISOString(),
  },
];
