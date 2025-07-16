import { Component } from "@/types/component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ComponentCardProps {
  component: Component;
  onAddToBuild?: (component: Component) => void;
  onAddToCompare?: (component: Component) => void;
  showAddToBuild?: boolean;
  showAddToCompare?: boolean;
}

const ComponentCard = ({ 
  component, 
  onAddToBuild, 
  onAddToCompare, 
  showAddToBuild = true, 
  showAddToCompare = true 
}: ComponentCardProps) => {
  const handleAddToBuild = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToBuild?.(component);
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCompare?.(component);
  };

  return (
    <Card className="component-card group overflow-hidden">
      <div className="relative">
        <img
          src={component.image}
          alt={component.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {showAddToCompare && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={handleAddToCompare}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg leading-tight">{component.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {component.brand}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {component.category.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="price-tag">
            ${component.price.toFixed(2)}
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {value}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {component.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/component/${component.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
        {showAddToBuild && (
          <Button 
            className="flex-1 gaming-button" 
            onClick={handleAddToBuild}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Build
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;