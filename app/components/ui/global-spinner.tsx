import { FaSpinner } from "react-icons/fa";

export default function GlobalSpinner() {
  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
      <FaSpinner className="animate-spin text-primary text-4xl" />
    </div>
  );
}
