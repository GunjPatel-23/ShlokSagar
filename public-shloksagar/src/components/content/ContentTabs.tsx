import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Flame, BookOpen, ScrollText } from "lucide-react";
import { ReactNode } from "react";

interface ContentTabsProps {
  bhajan?: ReactNode;
  aarti?: ReactNode;
  chalisa?: ReactNode;
  stotra?: ReactNode;
}

const tabConfig = [
  { id: "bhajan", label: "Bhajan", hindi: "भजन", icon: Music },
  { id: "aarti", label: "Aarti", hindi: "आरती", icon: Flame },
  { id: "chalisa", label: "Chalisa", hindi: "चालीसा", icon: BookOpen },
  { id: "stotra", label: "Stotra / Path", hindi: "स्तोत्र / पाठ", icon: ScrollText },
];

export const ContentTabs = ({
  bhajan,
  aarti,
  chalisa,
  stotra,
}: ContentTabsProps) => {
  return (
    <Tabs defaultValue="bhajan" className="w-full">
      <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-secondary p-2 rounded-xl mb-8">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 min-w-[120px] flex items-center gap-2 py-4 text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.hindi}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value="bhajan" className="animate-fade-in">
        {bhajan || <EmptyState type="Bhajan" />}
      </TabsContent>

      <TabsContent value="aarti" className="animate-fade-in">
        {aarti || <EmptyState type="Aarti" />}
      </TabsContent>

      <TabsContent value="chalisa" className="animate-fade-in">
        {chalisa || <EmptyState type="Chalisa" />}
      </TabsContent>

      <TabsContent value="stotra" className="animate-fade-in">
        {stotra || <EmptyState type="Stotra" />}
      </TabsContent>
    </Tabs>
  );
};

const EmptyState = ({ type }: { type: string }) => (
  <div className="text-center py-16 bg-secondary/30 rounded-xl">
    <p className="text-xl text-muted-foreground">
      {type} content coming soon...
    </p>
  </div>
);
