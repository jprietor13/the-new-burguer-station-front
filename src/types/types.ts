export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface PropsBurger {
  burger: Burger;
}

export interface Option {
  id: number;
  name: string;
  price: number;
}
