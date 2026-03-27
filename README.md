# Central de Sistemas

Hub interno de aplicativos web para a Grimaldi.
Centraliza sistemas internos em uma interface mobile-first
acessivel via navegador e empacotavel como APK via Android
Studio WebView.

## Stack
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Vercel KV (Redis) para configuracao dos cards

## Setup local
1. Clone o repositorio
2. Instale dependencias: `npm install`
3. Copie `.env.example` para `.env.local` e preencha as variaveis
4. Execute: `npm run dev`

## Variaveis de ambiente
| Variavel | Descricao |
|---|---|
| KV_REST_API_URL | URL da instancia Vercel KV |
| KV_REST_API_TOKEN | Token de acesso Vercel KV |
| ADMIN_PASSWORD | Senha do painel admin (para equipe de TI) |

## Painel Admin
Acesse `/admin` para gerenciar os cards dos sistemas.
Requer a senha definida em `ADMIN_PASSWORD`.

## Deploy
Push para branch main realiza deploy automatico no Vercel.

## APK (Android)
Este projeto pode ser empacotado como APK via Android Studio
usando um componente WebView apontando para a URL de producao
do Vercel. Nenhuma modificacao de codigo e necessaria no lado
Android — toda atualizacao de cards e feita pelo painel admin.

### Dispositivos Suportados

| Dispositivo          | Tela  | Resolucao   | Status      |
|----------------------|-------|-------------|-------------|
| Android geral        | 5-6"  | 360px+ CSS  | Suportado   |
| iPhone (Safari/WV)   | 4.7"+ | 375px+ CSS  | Suportado   |
| Zebra TC21           | 5"    | 1280x720    | Otimizado   |
| Zebra TC26           | 5"    | 1280x720    | Otimizado   |
| Zebra MC2200         | 4"    | 800x480     | Compativel  |
| Tablet Android 8-10" | 8-10" | 768px+ CSS  | Suportado   |
| iPad                 | 8-13" | 768px+ CSS  | Suportado   |

Nota: URLs internas (stosr002.grimaldi.local, 10.1.0.x)
requerem conexao com a rede Wi-Fi da empresa.
Em dispositivos Zebra conectados ao Wi-Fi corporativo,
o acesso e pleno. Fora da rede, o app exibe mensagem
de indisponibilidade com opcao de nova tentativa.

### Changelog

#### Fase 1 — Base
- Estrutura do projeto Next.js com App Router
- Splash screen animada com barra de progresso
- Navegacao por abas com efeito de folder-tab
- Grid de cards responsivo (2/3/4 colunas)
- Visualizador embarcado de iframe em tela cheia
- Painel admin com login, CRUD e drag-and-drop
- Data layer com Vercel KV e fallback em memoria
- API routes com autenticacao Bearer

#### Fase 2 — Refinamentos e Otimizacoes
- Logo do top bar redimensionada corretamente (42-48px)
- Sino de notificacao removido (sem funcionalidade)
- Tratamento de timeout para URLs de rede interna (12s)
- Loading state com barra animada e logo placeholder
- Touch targets aumentados para 52px (uso com luvas)
- Suporte e otimizacao para Zebra TC21 e TC26
- Compatibilidade com Zebra Enterprise Browser (ZEB)
- Scroll com momentum iOS e overscroll contido
- Breakpoint dedicado para telas abaixo de 360px
- Suporte a safe-area-inset para dispositivos com notch
- Manifesto PWA adicionado para instalacao em Android
- Meta tags de WebView e viewport-fit configurados
- Headers de seguranca via middleware.ts
- Gestao de memoria: iframe desmontado ao retornar ao hub
- localStorage protegido com try/catch para WebViews Android
