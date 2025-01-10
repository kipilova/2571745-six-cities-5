export interface AccomodationOffer {
  id: string;
  title: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  type: string;
  images?: [] | null;
  bedrooms?: number;
  maxAdults?: number;
  goods?: [];
  host?: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  description?: string;
}
