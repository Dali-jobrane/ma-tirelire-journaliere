import { PiggyBank, StickyNote } from "lucide-react";

interface MobileNavigationProps {
  activeSection: "tirelire" | "notes";
  onSectionChange: (section: "tirelire" | "notes") => void;
}

export const MobileNavigation = ({ activeSection, onSectionChange }: MobileNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-elegant z-50">
      <div className="flex h-16">
        <button
          onClick={() => onSectionChange("tirelire")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            activeSection === "tirelire"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <PiggyBank className="h-6 w-6" />
          <span className="text-xs font-medium">Tirelire</span>
        </button>
        
        <button
          onClick={() => onSectionChange("notes")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            activeSection === "notes"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <StickyNote className="h-6 w-6" />
          <span className="text-xs font-medium">Notes</span>
        </button>
      </div>
    </div>
  );
};