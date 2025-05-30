import { useEffect, type ReactNode } from "react";
import ReactDOM from "react-dom";

export type ModalType = "create" | "delete" | "update" | null;

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children, title }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white p-6 rounded-2xl shadow-xl transition-transform transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h1 className="text-primary text-xl font-bold mb-3 text-center">{title}</h1>
        {children}
      </div>
    </div>,
    document.body
  );
};
