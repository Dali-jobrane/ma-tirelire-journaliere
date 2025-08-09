import { useState } from "react";
import { PiggyBankSection } from "./PiggyBankSection";
import { NotesSection } from "./NotesSection";
import { MobileNavigation } from "./MobileNavigation";
import { Card } from "@/components/ui/card";
import { Euro, Clock } from "lucide-react";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<"tirelire" | "notes">("tirelire");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header optimisé mobile */}
      <header className="bg-gradient-primary shadow-elegant border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Euro className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-foreground">
                  Ma Tirelire
                </h1>
                <p className="text-primary-foreground/80 text-xs">
                  Gestion mobile
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-xs">
              <Clock className="h-3 w-3" />
              {new Date().toLocaleDateString('fr-FR', { 
                day: '2-digit',
                month: '2-digit'
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content avec padding pour navigation mobile */}
      <main className="px-4 py-4">
        <Card className="bg-gradient-card shadow-card border-0 animate-fade-in min-h-[calc(100vh-140px)]">
          <div className="p-4">
            {activeSection === "tirelire" ? (
              <PiggyBankSection />
            ) : (
              <NotesSection />
            )}
          </div>
        </Card>
      </main>

      {/* Navigation mobile en bas */}
      <MobileNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
};