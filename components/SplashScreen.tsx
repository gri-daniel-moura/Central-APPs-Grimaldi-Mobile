"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show on first paint per session
    try {
      const alreadyShown = sessionStorage.getItem("cds_splash_shown");
      if (alreadyShown) {
        setVisible(false);
        return;
      }
    } catch {
      // sessionStorage may be unavailable in some WebViews
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      try {
        sessionStorage.setItem("cds_splash_shown", "true");
      } catch {
        // ignore
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // 300ms fade-out, then unmount
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
        fadeOut ? "splash-fadeout" : ""
      }`}
      style={{ background: "#080C12" }}
    >
      {/* Company Logo */}
      <img
        src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
        alt="Grimaldi Logo"
        loading="eager"
        style={{ maxHeight: "80px", width: "auto" }}
        className="brightness-0 invert object-contain"
      />

      {/* App Name */}
      <h1
        className="mt-5 font-semibold"
        style={{ fontSize: "1.375rem", color: "#E8EDF4" }}
      >
        Central de Sistemas
      </h1>

      {/* Loading Text */}
      <p
        className="mt-2"
        style={{ fontSize: "0.8125rem", color: "#6B7D93" }}
      >
        Carregando seus sistemas...
      </p>

      {/* Loading Bar — GPU-composited with scaleX */}
      <div
        className="mt-6 rounded-full overflow-hidden"
        style={{
          width: "min(60vw, 280px)",
          height: "4px",
          background: "#1C2A3A",
        }}
      >
        <div
          className="h-full w-full rounded-full splash-bar-fill"
          style={{ background: "#094279" }}
        />
      </div>
    </div>
  );
}
