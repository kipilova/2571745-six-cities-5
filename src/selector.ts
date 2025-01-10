import { createSelector } from 'reselect';
import { RootState } from './store';

// Input selectors
const selectOffersList = (state: RootState) => state.offersList;
export const selectCurrentCity = (state: RootState) => state.city;
const selectSortType = (state: RootState) => state.sortType;

// Memoized selector
export const selectOffersForCity = createSelector(
  [selectOffersList, selectCurrentCity],
  (offersList, currentCity) =>
    offersList.filter((offer) => offer.city.name === currentCity),
);

export const selectOffersSorted = createSelector(
  [selectOffersForCity, selectSortType],
  (cityOffers, sortType) =>
    [...cityOffers].sort((a, b) => {
      switch (sortType) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    }),
);

export const selectCurrentOffer = (state: RootState) => state.currentOffer;
export const selectReviews = (state: RootState) => state.currentReviews;
export const selectNearbyOffers = (state: RootState) => state.nearbyOffers;
