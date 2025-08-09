import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  MinusCircle, 
  Euro, 
  TrendingUp, 
  History,
  Calendar,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "depot" | "depense";
  amount: number;
  description: string;
  date: Date;
}

export const PiggyBankSection = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "depot" | "depense">("all");
  const { toast } = useToast();

  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === "depot" 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);

  const addTransaction = (type: "depot" | "depense") => {
    if (!amount || !description.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      date: new Date(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setAmount("");
    setDescription("");
    
    toast({
      title: type === "depot" ? "Dépôt ajouté !" : "Dépense enregistrée !",
      description: `${type === "depot" ? "+" : "-"}${amount}€ - ${description}`,
    });
  };

  const filteredTransactions = transactions.filter(transaction => 
    filter === "all" || transaction.type === filter
  );

  const totalDepots = transactions
    .filter(t => t.type === "depot")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDepenses = transactions
    .filter(t => t.type === "depense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header avec solde */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Tirelire</h2>
        <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl shadow-glow">
          <Euro className="h-6 w-6" />
          <span className="text-2xl font-bold">{balance.toFixed(2)}€</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-accent text-accent-foreground border-0">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm opacity-90">Total Dépôts</p>
            <p className="text-xl font-bold">+{totalDepots.toFixed(2)}€</p>
          </CardContent>
        </Card>
        
        <Card className="bg-warning text-warning-foreground border-0">
          <CardContent className="p-4 text-center">
            <MinusCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm opacity-90">Total Dépenses</p>
            <p className="text-xl font-bold">-{totalDepenses.toFixed(2)}€</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted border-0">
          <CardContent className="p-4 text-center">
            <History className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire d'ajout */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Nouvelle Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Montant (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez la transaction..."
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => addTransaction("depot")}
              className="flex-1 bg-gradient-accent hover:bg-accent/90 text-accent-foreground"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter Dépôt
            </Button>
            <Button
              onClick={() => addTransaction("depense")}
              variant="destructive"
              className="flex-1"
            >
              <MinusCircle className="h-4 w-4 mr-2" />
              Enregistrer Dépense
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique des transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historique des Transactions
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Tout
              </Button>
              <Button
                variant={filter === "depot" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("depot")}
              >
                Dépôts
              </Button>
              <Button
                variant={filter === "depense" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("depense")}
              >
                Dépenses
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Aucune transaction pour le moment</p>
              <p className="text-sm">Ajoutez votre première transaction ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "depot" 
                        ? "bg-accent/20 text-accent" 
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {transaction.type === "depot" ? (
                        <PlusCircle className="h-4 w-4" />
                      ) : (
                        <MinusCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {transaction.date.toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={transaction.type === "depot" ? "default" : "destructive"}
                      className="text-lg font-bold"
                    >
                      {transaction.type === "depot" ? "+" : "-"}
                      {transaction.amount.toFixed(2)}€
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};