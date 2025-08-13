export interface ProductTag {
  text: string;
  icon: React.ElementType; // Using React.ElementType for component type
  iconColorClass?: string; // Added for specific icon color
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags?: ProductTag[];
  category?: string;
  price?: string;
  calories?: string;
  ingredients?: string[];
  preparation?: string[];
  storage?: string;
  allergyInfo?: string;
  certifications?: string[];
  slug?: string; // Optional: for generating URLs
  // Add other relevant fields as needed
}
