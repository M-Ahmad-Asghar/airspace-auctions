import * as React from "react";
import { X } from "lucide-react";
import { RecentSearchItem } from "@/components/types/index";

interface SearchDropdownProps {
  recent: RecentSearchItem[];
  onRemove: (id: string) => void;
  onEdit?: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ recent, onRemove, onEdit }) => (
  <div className="absolute z-50 mt-2 w-full max-w-md bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-bold">Recent</span>
      {onEdit && (
        <button className="text-[#305DB3] font-medium" onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
    <ul className="space-y-4">
      {recent.map((item) => (
        <li key={item.id} className="flex items-center">
          <img
            src={item.image}
            alt={item.title}
            className="w-12 h-12 rounded-full border object-cover mr-3"
          />
          <div className="flex-1">
            <div className="font-bold text-lg truncate">{item.title}</div>
            <div className="text-gray-500 text-sm">{item.subtitle}</div>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Remove"
          >
            <X size={24} />
          </button>
        </li>
      ))}
    </ul>
  </div>
);