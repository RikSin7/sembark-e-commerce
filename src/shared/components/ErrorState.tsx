import { AlertOctagon, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh] py-12 px-4 text-center animate-in fade-in duration-300">

            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100">
                <AlertOctagon size={32} strokeWidth={2} className="text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
                Something went wrong
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    type="button"
                    className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 active:scale-95"
                >
                    <RefreshCcw size={18} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-500 ease-out" />
                    <span>Try Again</span>
                </button>
            )}
        </div>
    );
}

export default ErrorState;