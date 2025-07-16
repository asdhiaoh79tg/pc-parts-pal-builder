import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentCard from "@/components/ComponentCard";
import { useBuild } from "@/hooks/useBuild";
import componentsData from "@/data/components.json";
import { Component } from "@/types/component";
import { Trash2, AlertTriangle } from "lucide-react";

const Builder = () => {
  const { build, addToBuild, removeFromBuild, addToCompare, getTotalPrice, getCompatibilityWarnings } = useBuild();
  const [activeCategory, setActiveCategory] = useState("cpus");

  const categories = [
    { id: "cpus", label: "CPU", key: "cpu" as keyof typeof build },
    { id: "gpus", label: "Graphics Card", key: "gpu" as keyof typeof build },
    { id: "motherboards", label: "Motherboard", key: "motherboard" as keyof typeof build },
    { id: "memory", label: "Memory", key: "memory" as keyof typeof build },
    { id: "storage", label: "Storage", key: "storage" as keyof typeof build },
    { id: "psu", label: "Power Supply", key: "psu" as keyof typeof build },
  ];

  const warnings = getCompatibilityWarnings();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Component Selection */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">PC Builder</h1>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {(componentsData[category.id as keyof typeof componentsData] as Component[])?.map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onAddToBuild={addToBuild}
                      onAddToCompare={addToCompare}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Build Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Build
                <span className="price-tag">${getTotalPrice().toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {warnings.length > 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-destructive mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Compatibility Issues</span>
                  </div>
                  {warnings.map((warning, index) => (
                    <p key={index} className="text-sm text-destructive/80">
                      {warning}
                    </p>
                  ))}
                </div>
              )}

              {categories.map((category) => {
                const component = build[category.key];
                return (
                  <div key={category.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{category.label}</span>
                      {component && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromBuild(category.key)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {component ? (
                      <div>
                        <p className="text-sm font-medium">{component.name}</p>
                        <p className="text-xs text-muted-foreground">{component.brand}</p>
                        <p className="text-sm font-semibold text-accent">${component.price}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No component selected</p>
                    )}
                  </div>
                );
              })}

              <Button className="w-full gaming-button mt-4">
                Save Build
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Builder;