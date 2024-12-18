import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCredits, Credit } from "@/hooks/useCredits";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export const CreditManager = () => {
  const { credits, addCredit, removeCredit, updateCredit } = useCredits();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCredit, setEditingCredit] = useState<Credit | null>(null);
  const [newCredit, setNewCredit] = useState({
    nom: "",
    montantInitial: 0,
    mensualite: 0,
    dateDebut: new Date().toISOString().split('T')[0],
    dureeEnMois: 12
  });

  const handleAddOrUpdateCredit = () => {
    if (newCredit.montantInitial > 0 && newCredit.mensualite > 0) {
      if (editingCredit) {
        updateCredit(editingCredit.id, newCredit);
      } else {
        addCredit(newCredit);
      }
      setIsDialogOpen(false);
      setEditingCredit(null);
      setNewCredit({
        nom: "",
        montantInitial: 0,
        mensualite: 0,
        dateDebut: new Date().toISOString().split('T')[0],
        dureeEnMois: 12
      });
    }
  };

  const handleEditCredit = (credit: Credit) => {
    setEditingCredit(credit);
    setNewCredit({
      nom: credit.nom,
      montantInitial: credit.montantInitial,
      mensualite: credit.mensualite,
      dateDebut: credit.dateDebut,
      dureeEnMois: credit.dureeEnMois
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Gestion des Crédits</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouveau Crédit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCredit ? "Modifier le crédit" : "Ajouter un nouveau crédit"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom du crédit</label>
                <Input
                  value={newCredit.nom}
                  onChange={(e) => setNewCredit({...newCredit, nom: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Montant initial</label>
                <Input
                  type="number"
                  value={newCredit.montantInitial}
                  onChange={(e) => setNewCredit({...newCredit, montantInitial: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensualité</label>
                <Input
                  type="number"
                  value={newCredit.mensualite}
                  onChange={(e) => setNewCredit({...newCredit, mensualite: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de début</label>
                <Input
                  type="date"
                  value={newCredit.dateDebut}
                  onChange={(e) => setNewCredit({...newCredit, dateDebut: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Durée (en mois)</label>
                <Input
                  type="number"
                  value={newCredit.dureeEnMois}
                  onChange={(e) => setNewCredit({...newCredit, dureeEnMois: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleAddOrUpdateCredit} className="w-full">
                {editingCredit ? "Modifier le crédit" : "Ajouter le crédit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Montant initial</TableHead>
              <TableHead>Mensualité</TableHead>
              <TableHead>Solde restant</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credits.map((credit) => (
              <TableRow key={credit.id}>
                <TableCell>{credit.nom}</TableCell>
                <TableCell>{credit.montantInitial.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR"
                })}</TableCell>
                <TableCell>{credit.mensualite.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR"
                })}</TableCell>
                <TableCell>{credit.soldeRestant.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR"
                })}</TableCell>
                <TableCell>{new Date(credit.dateDebut).toLocaleDateString()}</TableCell>
                <TableCell>{credit.dureeEnMois} mois</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCredit(credit)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCredit(credit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};