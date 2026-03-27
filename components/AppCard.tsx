"use client";

import { AppCard as AppCardType } from "@/lib/types";

interface AppCardProps {
  app: AppCardType;
  onOpen: (app: AppCardType) => void;
}

export default function AppCard({ app, onOpen }: AppCardProps) {
  return (
    <div
      onClick={() => onOpen(app)}
      className="app-card relative flex flex-col items-start cursor-pointer no-select"
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        border: "1px solid #DDE3EB",
        padding: "16px",
        boxShadow: "0px 2px 14px rgba(9,66,121,0.07)",
      }}
    >
      {/* Notification Badge */}
      {app.notificationCount > 0 && (
        <span
          className="absolute flex items-center justify-center font-bold text-white"
          style={{
            top: "-6px",
            right: "-6px",
            minWidth: "18px",
            height: "18px",
            background: "#E05C5C",
            borderRadius: "999px",
            fontSize: "0.625rem",
            padding: "0 5px",
            lineHeight: 1,
          }}
        >
          {app.notificationCount}
        </span>
      )}

      {/* TOP ROW: Icon + Action Button */}
      <div className="flex items-start justify-between w-full">
        {/* Icon Container — min 52px tap target */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: "#E8EEF6",
            color: "#094279",
          }}
          dangerouslySetInnerHTML={{ __html: app.iconSvg }}
        />

        {/* Action Button */}
        <button
          className="flex items-center justify-center shrink-0"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "999px",
            background: "#F4F6F9",
            border: "1px solid #DDE3EB",
            touchAction: "manipulation",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(app);
          }}
          aria-label={`Abrir ${app.name}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7D93"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </button>
      </div>

      {/* MIDDLE: Name + Description */}
      <div className="mt-3">
        <h3
          className="font-semibold leading-tight"
          style={{ fontSize: "0.875rem", color: "#1A2A3A" }}
        >
          {app.name}
        </h3>
        <p
          className="mt-0.5 leading-tight"
          style={{ fontSize: "0.6875rem", color: "#6B7D93" }}
        >
          {app.description}
        </p>
      </div>

      {/* BOTTOM: Status */}
      <div className="flex items-center gap-1.5 mt-2.5">
        <span
          className="block rounded-full"
          style={{
            width: "7px",
            height: "7px",
            background:
              app.status === "active" ? "#2ECC8F" : "#C5CDD8",
          }}
        />
        <span style={{ fontSize: "0.6875rem", color: "#6B7D93" }}>
          {app.status === "active" ? "Ativo" : "Offline"}
        </span>
      </div>
    </div>
  );
}
