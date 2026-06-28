export interface Content {
  brand: string;
  modelName: string;
  tagline: string;
  description: string;
  category: string;

  heroImage: string | null;
  productImage: string | null;
  treadImage: string | null;

  carType: string;
  season: string;
  grade: string;

  quickSpecs: { id: number; code: string; label: string }[];

  recommendTitle: string;
  recommendItems: { id: number; text: string; image: string | null }[];

  performance: { label: string; value: number }[];

  comparison: {
    thisLabel: string;
    compLabel: string;
    metrics: {
      id: number;
      label: string;
      thisVal: number;
      compVal: number;
    }[];
  };

  checkpoints: {
    id: number;
    number: string;
    title: string;
    description: string;
    image: string | null;
  }[];

  reviews: {
    average: number;
    totalCount: number;
    distribution: { stars: number; count: number }[];
    items: {
      id: number;
      author: string;
      rating: number;
      date: string;
      text: string;
    }[];
  };

  options: { id: number; size: string; season: string }[];

  keySpecs: { id: number; label: string; value: string }[];

  featureIcons: {
    id: number;
    label: string;
    description: string;
    image: string | null;
  }[];

  brandValues: {
    id: number;
    title: string;
    description: string;
    image: string | null;
  }[];
}
