import { AccomodationOffer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Review } from './review';

export interface AppState {
  city: string;
  offersList: AccomodationOffer[];
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  sortType: string;
  currentOffer: AccomodationOffer | null;
  nearbyOffers: AccomodationOffer[];
  currentReviews: Review[];
  isLoadingReviews: boolean;
  isLoadingCurrentOffer: boolean;
  favoriteOffers: AccomodationOffer[];
}
