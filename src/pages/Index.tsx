import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, BarChart, Target, CreditCard, TrendingUp, Settings } from "lucide-react";
import TransactionsPanel from "@/components/TransactionsPanel";
import BudgetsPanel from "@/components/BudgetsPanel";
import ObjectivesPanel from "@/components/ObjectivesPanel";
import InvestmentsPanel from "@/components/InvestmentsPanel";
import CreditPanel from "@/components/CreditPanel";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-2 sm:p-4 md:p-8">
        <h1 className="mb-4 sm:mb-8 text-2xl sm:text-3xl font-bold text-gray-900 px-2">
          Tableau de Bord
        </h1>
        
        <Tabs defaultValue="transactions" className="space-y-4">
          <div className="sticky top-0 z-50 bg-gray-50 pb-2">
            <TabsList className="grid w-full grid-cols-3 gap-1 sm:grid-cols-6 p-1 h-auto min-h-[2.5rem] sm:h-10">
              <TabsTrigger 
                value="transactions" 
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Transactions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="budgets"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Budgets</span>
              </TabsTrigger>
              <TabsTrigger 
                value="objectives"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Objectifs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="credit"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Crédit</span>
              </TabsTrigger>
              <TabsTrigger 
                value="investments"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Investissements</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 h-auto min-h-[2.5rem]"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Paramètres</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-2">
            <TabsContent value="transactions" className="m-0">
              <TransactionsPanel />
            </TabsContent>
            
            <TabsContent value="budgets" className="m-0">
              <BudgetsPanel />
            </TabsContent>
            
            <TabsContent value="objectives" className="m-0">
              <ObjectivesPanel />
            </TabsContent>
            
            <TabsContent value="credit" className="m-0">
              <CreditPanel />
            </TabsContent>
            
            <TabsContent value="investments" className="m-0">
              <InvestmentsPanel />
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <SettingsPanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;