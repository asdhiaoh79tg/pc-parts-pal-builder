import { useState, useEffect } from 'react';
import { Component, BuildState } from '@/types/component';
import { toast } from '@/hooks/use-toast';

export const useBuild = () => {
  const [build, setBuild] = useState<BuildState>({});
  const [compareList, setCompareList] = useState<Component[]>([]);

  useEffect(() => {
    const savedBuild = localStorage.getItem('pcbuild');
    if (savedBuild) {
      setBuild(JSON.parse(savedBuild));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pcbuild', JSON.stringify(build));
  }, [build]);

  const addToBuild = (component: Component) => {
    const category = component.category as keyof BuildState;
    setBuild(prev => ({
      ...prev,
      [category]: component
    }));
    
    toast({
      title: "Component Added",
      description: `${component.name} has been added to your build.`,
    });
  };

  const removeFromBuild = (category: keyof BuildState) => {
    setBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[category];
      return newBuild;
    });
    
    toast({
      title: "Component Removed",
      description: "Component has been removed from your build.",
    });
  };

  const addToCompare = (component: Component) => {
    setCompareList(prev => {
      if (prev.find(item => item.id === component.id)) {
        toast({
          title: "Already in Compare List",
          description: "This component is already in your compare list.",
          variant: "destructive",
        });
        return prev;
      }
      
      if (prev.length >= 3) {
        toast({
          title: "Compare List Full",
          description: "You can only compare up to 3 components at a time.",
          variant: "destructive",
        });
        return prev;
      }
      
      toast({
        title: "Added to Compare",
        description: `${component.name} has been added to your compare list.`,
      });
      
      return [...prev, component];
    });
  };

  const removeFromCompare = (componentId: string) => {
    setCompareList(prev => prev.filter(item => item.id !== componentId));
    
    toast({
      title: "Removed from Compare",
      description: "Component has been removed from your compare list.",
    });
  };

  const clearBuild = () => {
    setBuild({});
    toast({
      title: "Build Cleared",
      description: "Your build has been cleared.",
    });
  };

  const getTotalPrice = () => {
    return Object.values(build).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const getCompatibilityWarnings = () => {
    const warnings: string[] = [];
    
    if (build.cpu && build.motherboard) {
      const cpuSocket = build.cpu.specs.socket;
      const mbSocket = build.motherboard.specs.socket;
      
      if (cpuSocket !== mbSocket) {
        warnings.push(`CPU socket (${cpuSocket}) is not compatible with motherboard socket (${mbSocket})`);
      }
    }
    
    if (build.memory && build.motherboard) {
      const ramType = build.memory.specs.type;
      const mbMemoryType = build.motherboard.specs.memoryType;
      
      if (ramType !== mbMemoryType) {
        warnings.push(`RAM type (${ramType}) is not compatible with motherboard memory type (${mbMemoryType})`);
      }
    }
    
    return warnings;
  };

  return {
    build,
    compareList,
    addToBuild,
    removeFromBuild,
    addToCompare,
    removeFromCompare,
    clearBuild,
    getTotalPrice,
    getCompatibilityWarnings,
  };
};