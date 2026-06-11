import { useEffect, useState, useRef } from "react";
import { getCategories } from "../api/productApi";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import type { Category } from "../types";

function FilterDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  //click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const visibleCategories = categories.filter((category) =>
    /^[a-zA-Z0-9\s&,'-]{2,50}$/.test(category.name)
  );

  const selectedIds = searchParams.get("categories")?.split(",").filter(Boolean) || [];

  const handleCheckboxChange = (categoryId: number, checked: boolean) => {
    const idStr = String(categoryId);
    let newSelected: string[];

    if (checked) newSelected = [...selectedIds, idStr];
    else newSelected = selectedIds.filter((id) => id !== idStr);

    const nextParams = new URLSearchParams(searchParams);
    if (newSelected.length > 0) nextParams.set("categories", newSelected.join(","));
    else nextParams.delete("categories");

    setSearchParams(nextParams);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
        aria-expanded={isOpen}
      >
        <Filter size={18} />
        <span>Filter</span>
        {selectedIds.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-slate-900 rounded-full">
            {selectedIds.length}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 bg-slate-50 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Categories</h3>
          </div>
          <div className="flex flex-col max-h-[280px] overflow-y-auto p-2">
            {visibleCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer group transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(String(category.id))}
                  onChange={(e) => handleCheckboxChange(category.id, e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 accent-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 select-none">
                  {category.name}
                </span>
              </label>
            ))}
            {visibleCategories.length === 0 && (
              <p className="text-sm text-slate-500 p-3 text-center">No categories found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;