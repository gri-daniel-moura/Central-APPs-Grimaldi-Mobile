"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AppCard as AppCardType } from "@/lib/types";

interface EmbeddedViewerProps {
  app: AppCardType;
  onClose: () => void;
}

// X-Frame-Options and CSP errors cannot be caught via JS — timeout is the correct fallback approach

export default function EmbeddedViewer({ app, onClose }: EmbeddedViewerProps) {
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loadingBarVisible, setLoadingBarVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Start 12-second timeout
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setTimedOut(true);
      setLoading(false);
      setLoadingBarVisible(false);
    }, 12000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(false);
    setTimedOut(false);
    // Fade out loading bar and logo placeholder with 200ms opacity
    setTimeout(() => setLoadingBarVisible(false), 200);
  }, []);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimedOut(false);
    setLoadingBarVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTimedOut(true);
      setLoading(false);
      setLoadingBarVisible(false);
    }, 12000);
    if (iframeRef.current) {
      iframeRef.current.src = app.url;
    }
  }, [app.url]);

  const handleClose = useCallback(() => {
    setClosing(true);
    // Memory management: release iframe before unmount (critical for 3GB RAM devices)
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
    setTimeout(onClose, 200);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-white ${
        closing ? "slide-down" : "slide-up"
      }`}
    >
      {/* Header — z-50+, always above iframe */}
      <header
        className="flex items-center justify-between px-1 shrink-0 no-select embedded-header"
        style={{
          height: "52px",
          background: "#FFFFFF",
          borderBottom: "1px solid #DDE3EB",
          zIndex: 60,
          position: "relative",
        }}
      >
        {/* Left: Back Arrow — 52px tap target */}
        <button
          onClick={handleClose}
          className="flex items-center justify-center cursor-pointer active:opacity-60 transition-opacity"
          style={{
            width: "var(--touch-target-min)",
            height: "var(--touch-target-min)",
            touchAction: "manipulation",
          }}
          aria-label="Voltar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#094279"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>

        {/* Center: App Icon + Name */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <span
            className="flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
              color: "#094279",
            }}
            dangerouslySetInnerHTML={{
              __html: app.iconSvg
                .replace(/width="[^"]*"/, 'width="20"')
                .replace(/height="[^"]*"/, 'height="20"'),
            }}
          />
          <span
            className="font-semibold truncate max-w-[160px]"
            style={{ fontSize: "0.9375rem", color: "#1A2A3A" }}
          >
            {app.name}
          </span>
        </div>

        {/* Right: Refresh + Home — 52px tap targets, 12px spacing */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center cursor-pointer active:opacity-60 transition-opacity"
            style={{
              width: "var(--touch-target-min)",
              height: "var(--touch-target-min)",
              touchAction: "manipulation",
            }}
            aria-label="Recarregar"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7D93"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="flex items-center justify-center cursor-pointer active:opacity-60 transition-opacity"
            style={{
              width: "var(--touch-target-min)",
              height: "var(--touch-target-min)",
              touchAction: "manipulation",
            }}
            aria-label="Inicio"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7D93"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>
      </header>

      {/* Loading Bar — 3px, scaleX animation */}
      {loadingBarVisible && (
        <div
          className={`w-full overflow-hidden shrink-0 ${
            !loading ? "fade-out-200" : ""
          }`}
          style={{ height: "3px", background: "#E8EEF6", zIndex: 55 }}
        >
          <div
            className="h-full w-full iframe-loading-bar"
            style={{ background: "#094279" }}
          />
        </div>
      )}

      {/* Timeout Error Overlay */}
      {timedOut && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-white"
          style={{ zIndex: 60, top: "52px" }}
        >
          {/* Company Logo */}
          <img
            src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
            alt="Grimaldi Logo"
            className="mb-6 object-contain"
            style={{ height: "64px", width: "auto" }}
          />
          <p
            className="text-center font-semibold mb-2"
            style={{ fontSize: "1rem", color: "#1A2A3A" }}
          >
            Sistema indisponivel
          </p>
          <p
            className="text-center mb-8 max-w-[280px]"
            style={{ fontSize: "0.8125rem", color: "#6B7D93" }}
          >
            Verifique se voce esta conectado a rede da empresa.
          </p>
          <button
            onClick={handleRefresh}
            className="w-full max-w-[280px] font-semibold text-white transition-opacity active:opacity-80 cursor-pointer"
            style={{
              background: "#094279",
              fontSize: "0.875rem",
              borderRadius: "10px",
              minHeight: "52px",
              touchAction: "manipulation",
            }}
          >
            Tentar novamente
          </button>
          <button
            onClick={handleClose}
            className="w-full max-w-[280px] mt-3 font-semibold transition-opacity active:opacity-80 cursor-pointer"
            style={{
              background: "transparent",
              color: "#094279",
              fontSize: "0.875rem",
              borderRadius: "10px",
              minHeight: "52px",
              border: "1.5px solid #094279",
              touchAction: "manipulation",
            }}
          >
            Voltar
          </button>
        </div>
      )}

      {/* Branded Logo Placeholder — shown while loading */}
      {loading && !timedOut && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            !loading ? "fade-out-200" : ""
          }`}
          style={{ zIndex: 5, top: "55px" }}
        >
          <img
            src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
            alt=""
            className="object-contain"
            style={{ width: "120px", height: "auto", opacity: 0.07 }}
          />
        </div>
      )}

      {/* Iframe — no browser chrome, full screen */}
      <iframe
        ref={iframeRef}
        src={app.url}
        onLoad={handleLoad}
        title={app.name}
        className="flex-1 w-full border-0"
        style={{ height: "calc(100dvh - 52px)" }}
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        allow="camera; microphone; geolocation"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
