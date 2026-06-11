import { Loader2 } from "lucide-react";

interface LoaderProps {
    text?: string;
}

export default function Loader({ text = "Loading..." }: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh] py-12 animate-in fade-in duration-500">
            <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
            <p className="mt-4 text-sm font-medium text-slate-500 tracking-wide">
                {text}
            </p>
        </div>
    );
}