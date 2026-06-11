import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center text-center md:text-left">
                    <div>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">Shoppy</span>
                        <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto md:mx-0">
                            Delivering high-quality products directly to your doorstep with uncompromised reliability.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-slate-600">
                        <Link to={ROUTES.HOME} className="hover:text-slate-900 transition-colors">Shop With Confidence</Link>
                    </div>

                    <div className="md:text-right">
                        <p className="text-sm text-slate-400">
                            © {year} Shoppy Inc. <br className="hidden md:block" />
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;