"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-[#a3e635] px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(163,230,53,0.4)]"
    >
      Download as PDF
    </button>
  );
}
