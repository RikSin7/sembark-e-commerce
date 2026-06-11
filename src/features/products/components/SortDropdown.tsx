import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";

const SORT_OPTIONS = [
  { value: "", label: "Default Sorting" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
];

function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get("sort") || "";
  const currentLabel = SORT_OPTIONS.find(opt => opt.value === currentSort)?.label || "Sort";

  //click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSortChange = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortValue) newParams.set("sort", sortValue);
    else newParams.delete("sort");

    setSearchParams(newParams);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors whitespace-nowrap"
      >
        <ArrowUpDown size={18} className="text-slate-500" />
        <span className="hidden sm:inline-block">{currentLabel}</span>
        <span className="sm:hidden">Sort</span>
        <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
          {SORT_OPTIONS.map((option) => {
            const isActive = currentSort === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm transition-colors ${isActive ? "bg-slate-50 text-slate-900 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {option.label}
                {isActive && <Check size={16} className="text-slate-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;