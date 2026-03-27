"use client";

export default function TopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 no-select safe-top topbar-responsive"
      style={{
        height: "56px",
        background: "#FFFFFF",
        borderBottom: "1px solid #DDE3EB",
        boxShadow: "0 1px 6px rgba(9,66,121,0.06)",
      }}
    >
      {/* Company Logo — responsive sizing */}
      <img
        src="https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png"
        alt="Grimaldi Logo"
        loading="eager"
        className="object-contain max-[359px]:max-h-[28px] max-h-[42px] sm:max-h-[48px] w-auto"
      />
    </header>
  );
}
