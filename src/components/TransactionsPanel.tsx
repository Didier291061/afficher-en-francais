import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import { useCredits } from "@/hooks/useCredits";
import { TransactionSummary } from "./transactions/TransactionSummary";
import { TransactionSearch } from "./transactions/TransactionSearch";
import { TransactionList } from "./transactions/TransactionList";
import { NewTransactionDialog } from "./transactions/NewTransactionDialog";

const TransactionsPanel = () => {
  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const { credits, updateCreditBalance } = useCredits();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.categorie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTransaction = (newTransaction: any) => {
    const transaction = addTransaction(newTransaction);

    if (newTransaction.creditId) {
      updateCreditBalance(parseInt(newTransaction.creditId), newTransaction.montant);
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <TransactionSummary />

      <Card className="p-4">
        <TransactionSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNewTransaction={() => setIsDialogOpen(true)}
        />

        <TransactionList 
          transactions={filteredTransactions}
          onDeleteTransaction={removeTransaction}
        />

        <NewTransactionDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddTransaction={handleAddTransaction}
          credits={credits}
        />
      </Card>
    </div>
  );
};

export default TransactionsPanel;