export interface Component {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  specs: Record<string, string | number>;
  description: string;
  compatibility: string[];
  pros: string[];
  cons: string[];
}

export interface Build {
  id: string;
  name: string;
  components: Component[];
  totalPrice: number;
  created: Date;
}

export interface BuildState {
  cpu?: Component;
  gpu?: Component;
  motherboard?: Component;
  memory?: Component;
  storage?: Component;
  psu?: Component;
}

export type ComponentCategory = 'cpu' | 'gpu' | 'motherboard' | 'memory' | 'storage' | 'psu';