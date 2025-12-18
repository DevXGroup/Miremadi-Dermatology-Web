
export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'Medical' | 'Cosmetic' | 'Surgical';
  imageUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  comingSoon?: boolean;
}
