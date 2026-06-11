import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            type="button"
            aria-label="Go back to previous page"
            className="group flex items-center gap-2 mb-6 px-4 py-2 w-fit bg-white rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all duration-200 ease-in-out active:scale-95"
        >
            <ArrowLeft
                size={18}
                strokeWidth={2.5}
                className="text-slate-400 group-hover:text-slate-900 group-hover:-translate-x-1 transition-all duration-200"
            />
            <span>Back</span>
        </button>
    );
}

export default BackButton;