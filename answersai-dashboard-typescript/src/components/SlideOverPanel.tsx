import { useState, useRef } from "react";
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleVariableSelection } from "../features/variableSlice";
import overlaysearch from "../assets/overlaysearch.png";
import graystar from "../assets/autofill.png";
import reload from "../assets/reload.png";
import checkIcon from "../assets/checkIcon.png";
import autofill from "../assets/autofill.png";
import plusIcon from "../assets/add.png";
interface SlideOverPanelProps {
  visible: boolean;
  onClose: () => void;
}

const variableDescriptions: Record<string, string> = {
  "Co2 Distribution": "Shows carbon emissions distribution across zones.",
  "Fleet sizing": "Controls fleet capacity across zones.",
  "Carbon 1": "Tracks carbon intake per configuration.",
  "Parking Rate": "Regulates parking availability and cost.",
  "Border Rate": "Controls cross-zone constraints.",
  "Request rate": "Influences station load balancing.",
  "Variable 1": "Placeholder variable with no config.",
};

// Button component for each variable
interface VariableButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  onHoverStart: (label: string) => void;
  onHoverEnd: () => void;
}

const VariableButton: React.FC<VariableButtonProps> = ({
  label,
  selected,
  onClick,
  onHoverStart,
  onHoverEnd,
}) => {
  const safeLabel = typeof label === "string" ? label : "Unnamed";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHoverStart(safeLabel)}
      onMouseLeave={onHoverEnd}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        padding: "6px 12px",
        minWidth: "160px",
        fontSize: "14px",
        borderRadius: "9999px",
        fontFamily: "Inter, sans-serif",
        border: selected ? "1px solid #C9FF3B" : "1px solid #888",
        color: selected ? "#C9FF3B" : "#CCCCCC",
        background: selected
          ? "rgba(201, 255, 59, 0.08)"
          : "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <span>{safeLabel}</span>

      <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <img
          src={autofill}
          alt="sparkle"
          style={{ width: "16px", height: "16px" }}
        />
        <img
          src={selected ? checkIcon : plusIcon}
          alt={selected ? "check" : "plus"}
          style={{ width: "16px", height: "16px" }}
        />
      </span>
    </button>
  );
};

// Category section that renders a group of VariableButtons
const VariableCategory: React.FC<{
  title: string;
  variables: { label: string; selected: boolean }[];
  onToggle: (index: number) => void;
  onHoverStart: (label: string) => void;
  onHoverEnd: () => void;
}> = ({ title, variables, onToggle, onHoverStart, onHoverEnd }) => (
  <div className="mb-4">
    <p className="text-white font-medium mb-2">{title}</p>
    <div className="flex flex-wrap gap-2">
      {variables.map((v, i) => (
        <VariableButton
          key={i}
          label={v.label}
          selected={v.selected}
          onClick={() => onToggle(i)}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </div>
  </div>
);


// Collapsible section used for primary/secondary grouping
const ExpandableSection: React.FC<{
  title: string;
  expanded: boolean;
  onToggle: () => void;
}> = ({ title, expanded, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex justify-between items-center px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-left text-lime-300 font-semibold text-sm hover:bg-zinc-700"
  >
    {title}
    {expanded ? <ChevronUp /> : <ChevronDown />}
  </button>
);


// Main slide-over component that allows variable selection
const SlideOverPanel: React.FC<SlideOverPanelProps> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state: { variables: { categories: any; }; }) => state.variables.categories);

  const [search, setSearch] = useState("");
  const [primaryExpanded, setPrimaryExpanded] = useState(true);
  const [secondaryExpanded, setSecondaryExpanded] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Toggles a variable's selected state via Redux
  const handleToggle = (catIdx: number, varIdx: number) => {
    dispatch(toggleVariableSelection({ catIdx, varIdx }));
  };


  // Filters categories/variables based on search input
  const filteredCategories = categories.map((cat: { variables: any[]; }, index: any) => ({
    ...cat,
    originalIndex: index,
    variables: cat.variables.filter((v) =>
      v.label.toLowerCase().includes(search.toLowerCase())
    ),
  }));


  // Starts hover timer to show variable description
  const handleHoverStart = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHovered(label);
      setShowDescription(true);
    }, 1500);
  };


  // Cancels hover tooltip when mouse leaves button
  const handleHoverEnd = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setShowDescription(false);
    setHovered(null);
  };

  return (
    <div>

      {/* Panel background overlay */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-[2px] z-40" />
      )}
      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full md:w-[480px] bg-[#1b1b1d] shadow-lg border-l border-gray-700 transition-transform duration-300 ease-in-out ${visible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-600">
          <h2 className="text-white text-lg font-semibold">Edit Variables</h2>
          <button className="text-white text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>
        {/* Main Content */}
        <div className="p-6 space-y-6 text-sm text-gray-300 overflow-y-auto h-[calc(100%-64px)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
              />
              <img
                src={overlaysearch}
                alt="info icon"
                className="w-3 h-3 absolute top-4 right-4"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Autofill Button with Icon */}
              <button className="flex items-center gap-2 bg-zinc-700 text-white px-3 py-2 rounded-md hover:bg-zinc-600">
                <img
                  src={graystar}
                  alt="autofill icon"
                  className="w-[18px] h-[18px]"
                />
                Autofill
              </button>

              <button
                style={{
                  position: 'relative',
                  backgroundColor: '#2A2A2A',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontWeight: 500,
                  color: '#C9FF3B',
                  overflow: 'hidden',
                }}
                className="flex items-center gap-2 hover:brightness-105 transition"
              >
                {/* Gradient border overlay */}
                <span
                  style={{
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    padding: '1px',
                    borderRadius: '6px',
                    background: `linear-gradient(
        to bottom right,
        #C9FF3B 0%,
        #C9FF3B 40%,
        rgba(201,255,59,0.15) 60%,
        rgba(201,255,59,0.08) 95%,
        transparent 100%
      )`,
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                {/* Icon */}
                <img
                  src={reload}
                  alt="return icon"
                  className="w-[18px] h-[18px]"
                  style={{ zIndex: 1 }}
                />

                {/* Text */}
                <span style={{ zIndex: 1 }}>Return</span>
              </button>

            </div>

          </div>

          {/* Variable Selection List */}
          <div className="border border-zinc-700 rounded-md p-4 bg-zinc-900">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((section: { title: string; variables: { label: string; selected: boolean; }[]; originalIndex: any; }, index: React.Key | null | undefined) => (
                <VariableCategory
                  key={index}
                  title={section.title}
                  variables={section.variables}
                  onToggle={(varIdx) =>
                    handleToggle(section.originalIndex ?? index, varIdx)
                  }
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              ))
            ) : (
              <p className="text-red-400 text-sm">
                No categories matched your search.
              </p>
            )}
          </div>


          {/* Hover Description Box */}
          {showDescription && hovered && (
            <div className="bg-zinc-800 border border-gray-600 p-4 rounded-md text-gray-400 text-sm">
              <p className="font-semibold text-white mb-2 flex items-center gap-2">
                {hovered} <Info size={16} className="text-gray-400" />
              </p>
              <p>{variableDescriptions[hovered] || "No description available."}</p>
            </div>
          )}

          {/* Expandable Sections */}
          <div className="space-y-3">
            <ExpandableSection
              title="Primary Variables"
              expanded={primaryExpanded}
              onToggle={() => setPrimaryExpanded((prev) => !prev)}
            />
            {primaryExpanded && (
              <div className="text-gray-400 px-4">
                Primary variables content...
              </div>
            )}

            <ExpandableSection
              title="Secondary Variables"
              expanded={secondaryExpanded}
              onToggle={() => setSecondaryExpanded((prev) => !prev)}
            />
            {secondaryExpanded && (
              <div className="text-gray-400 px-4">
                Secondary variables content...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOverPanel;
