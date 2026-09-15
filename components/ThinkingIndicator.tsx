"use client";

export function ThinkingIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-gray-500">
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      <span className="ml-1 text-sm">Pensando...</span>
    </div>
  );
}