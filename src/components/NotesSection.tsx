import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  StickyNote, 
  Plus, 
  Euro, 
  Sun, 
  Moon,
  Calendar,
  RotateCcw,
  Calculator
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DailyNote {
  id: string;
  date: Date;
  amount: number;
  period: "matin" | "soir";
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<DailyNote[]>([]);
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<"matin" | "soir">("matin");
  const { toast } = useToast();

  const totalAmount = notes.reduce((sum, note) => sum + note.amount, 0);

  const addNote = () => {
    if (!amount) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un montant",
        variant: "destructive",
      });
      return;
    }

    const newNote: DailyNote = {
      id: Date.now().toString(),
      date: new Date(),
      amount: parseFloat(amount),
      period,
    };

    setNotes(prev => [newNote, ...prev]);
    setAmount("");
    
    toast({
      title: "Note ajoutée !",
      description: `${amount}€ - ${period === "matin" ? "Matin" : "Soir"}`,
    });
  };

  const resetNotes = () => {
    setNotes([]);
    toast({
      title: "Notes réinitialisées",
      description: "Toutes les notes ont été supprimées",
    });
  };

  const groupedNotes = notes.reduce((groups, note) => {
    const dateKey = note.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(note);
    return groups;
  }, {} as Record<string, DailyNote[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Notes Quotidiennes</h2>
        <div className="inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground px-6 py-3 rounded-xl shadow-glow">
          <Calculator className="h-6 w-6" />
          <span className="text-2xl font-bold">Total: {totalAmount.toFixed(2)}€</span>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-4 text-center">
            <Sun className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm opacity-90">Notes Matin</p>
            <p className="text-xl font-bold">
              {notes.filter(n => n.period === "matin").length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary text-secondary-foreground border-0">
          <CardContent className="p-4 text-center">
            <Moon className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm opacity-90">Notes Soir</p>
            <p className="text-xl font-bold">
              {notes.filter(n => n.period === "soir").length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted border-0">
          <CardContent className="p-4 text-center">
            <StickyNote className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Total Notes</p>
            <p className="text-xl font-bold">{notes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire d'ajout */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Nouvelle Note Quotidienne
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="note-amount">Montant (€)</Label>
              <Input
                id="note-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="period">Période</Label>
              <Select value={period} onValueChange={(value: "matin" | "soir") => setPeriod(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matin">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Matin
                    </div>
                  </SelectItem>
                  <SelectItem value="soir">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Soir
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={addNote}
                className="w-full bg-gradient-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions globales */}
      {notes.length > 0 && (
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-accent" />
                <span className="font-medium">
                  Montant total: <strong>{totalAmount.toFixed(2)}€</strong>
                </span>
              </div>
              <Button
                onClick={resetNotes}
                variant="destructive"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Affichage des notes par jour */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historique des Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedNotes).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Aucune note pour le moment</p>
              <p className="text-sm">Ajoutez votre première note ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedNotes)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([dateKey, dayNotes]) => {
                  const date = new Date(dateKey);
                  const dayTotal = dayNotes.reduce((sum, note) => sum + note.amount, 0);
                  
                  return (
                    <div key={dateKey} className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-lg">
                          {date.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </h3>
                        <Badge variant="outline" className="text-lg font-bold">
                          Total: {dayTotal.toFixed(2)}€
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                        {dayNotes
                          .sort((a, b) => a.date.getTime() - b.date.getTime())
                          .map((note) => (
                            <div
                              key={note.id}
                              className="flex items-center justify-between p-3 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${
                                  note.period === "matin" 
                                    ? "bg-primary/20 text-primary" 
                                    : "bg-secondary/20 text-secondary-foreground"
                                }`}>
                                  {note.period === "matin" ? (
                                    <Sun className="h-4 w-4" />
                                  ) : (
                                    <Moon className="h-4 w-4" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium capitalize">{note.period}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {note.date.toLocaleTimeString('fr-FR', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                              <Badge className="text-lg font-bold">
                                {note.amount.toFixed(2)}€
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};