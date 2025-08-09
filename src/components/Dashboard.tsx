import { useState } from "react";
import { PiggyBankSection } from "./PiggyBankSection";
import { NotesSection } from "./NotesSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiggyBank, StickyNote, Euro, Clock } from "lucide-react";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<"tirelire" | "notes">("tirelire");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elegant border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Euro className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  Gestionnaire Financier
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  Gérez votre tirelire et vos notes quotidiennes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <Clock className="h-4 w-4" />
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            <Button
              variant={activeSection === "tirelire" ? "default" : "ghost"}
              size="lg"
              onClick={() => setActiveSection("tirelire")}
              className="flex items-center gap-3 px-6 py-4 h-auto rounded-lg transition-all duration-300"
            >
              <PiggyBank className="h-5 w-5" />
              <span className="font-medium">Tirelire</span>
            </Button>
            <Button
              variant={activeSection === "notes" ? "default" : "ghost"}
              size="lg"
              onClick={() => setActiveSection("notes")}
              className="flex items-center gap-3 px-6 py-4 h-auto rounded-lg transition-all duration-300"
            >
              <StickyNote className="h-5 w-5" />
              <span className="font-medium">Notes Quotidiennes</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-card shadow-card border-0 animate-fade-in">
          <div className="p-6">
            {activeSection === "tirelire" ? (
              <PiggyBankSection />
            ) : (
              <NotesSection />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};