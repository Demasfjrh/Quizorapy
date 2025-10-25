// src/components/Toaster.jsx
import { useEffect } from "react";

export default function Toaster({ message, open, onClose, type = "info" }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  const color =
    type === "success" ? "bg-green-600" :
    type === "error" ? "bg-red-600" : "bg-gray-800";

  return (
    <div className="fixed right-5 bottom-5 z-50">
      <div className={`${color} text-white px-4 py-2 rounded-lg shadow-lg transition-opacity`}>
        {message}
      </div>
    </div>
  );
}
