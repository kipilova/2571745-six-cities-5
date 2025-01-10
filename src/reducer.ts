import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentCityAction,
  loadOffersAction,
  setAuthorizationStatusAction,
  signOutAction,
  setUserEmailAction,
  setSortTypeAction,
  loadOfferDetailsAction,
  postReviewAction,
  loadReviewsAction,
  toggleFavoriteAction,
  fetchFavoritesAction,
} from './action';
import { AppState } from './types/state';
import { AuthorizationStatus } from './const';

const initialState: AppState = {
  city: 'Paris',
  offersList: [],
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: '',
  sortType: 'popular',
  currentOffer: null,
  nearbyOffers: [],
  currentReviews: [],
  isLoadingCurrentOffer: false,
  isLoadingReviews: false,
  favoriteOffers: [],
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCityAction, (state, action) => {
      state.city = action.payload;
    })
    // LOAD OFFERS
    .addCase(loadOffersAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadOffersAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.offersList = action.payload;
      state.favoriteOffers = action.payload.filter((offer) => offer.isFavorite);
    })
    .addCase(loadOffersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    .addCase(setAuthorizationStatusAction, (state, action) => {
      if (action.payload === AuthorizationStatus.NoAuth) {
        state.userEmail = '';
      }
      state.authorizationStatus = action.payload;
    })
    .addCase(signOutAction, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      localStorage.removeItem('six-cities-token');
    })
    .addCase(setUserEmailAction, (state, action) => {
      // console.log('Reducer setUserEmailAction:', action.payload);
      state.userEmail = action.payload;
    })
    .addCase(setSortTypeAction, (state, action) => {
      state.sortType = action.payload;
    })

    // LOAD DETAILS
    .addCase(loadOfferDetailsAction.pending, (state) => {
      state.isLoadingCurrentOffer = true;
      state.error = null;
    })
    .addCase(loadOfferDetailsAction.fulfilled, (state, action) => {
      state.isLoadingCurrentOffer = false;
      state.currentOffer = action.payload.offer;
      state.nearbyOffers = action.payload.nearbyOffers || [];
    })
    .addCase(loadOfferDetailsAction.rejected, (state, action) => {
      state.isLoadingCurrentOffer = false;
      state.error = action.payload as string;
    })

    // LOAD REVIEWS
    .addCase(loadReviewsAction.pending, (state) => {
      state.isLoadingReviews = true;
      state.error = null;
    })
    .addCase(loadReviewsAction.fulfilled, (state, action) => {
      // console.log('loadReviewsAction result:', action.payload);
      state.isLoadingReviews = false;
      state.currentReviews = action.payload;
    })
    .addCase(loadReviewsAction.rejected, (state, action) => {
      state.isLoadingReviews = false;
      state.error = action.payload as string;
    })

    // POST REVIEWS
    .addCase(postReviewAction.pending, (state) => {
      state.isLoadingReviews = true;
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      state.isLoadingReviews = false;
      // console.log('postReviewAction payload', action.payload);
      // console.log('Currentreviews state', state.currentReviews);
      state.currentReviews = [...state.currentReviews, action.payload];
    })
    .addCase(postReviewAction.rejected, (state, action) => {
      state.isLoadingReviews = false;
      state.error = action.payload as string;
    })

    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      // Update offersList
      const offerIndex = state.offersList.findIndex(
        (offer) => offer.id === updatedOffer.id,
      );
      if (offerIndex !== -1) {
        state.offersList[offerIndex] = updatedOffer;
      }

      // Update favoriteOffers
      const favoriteIndex = state.favoriteOffers.findIndex(
        (offer) => offer.id === updatedOffer.id,
      );
      if (updatedOffer.isFavorite) {
        if (favoriteIndex === -1) {
          state.favoriteOffers.push(updatedOffer);
        }
      } else {
        if (favoriteIndex !== -1) {
          state.favoriteOffers.splice(favoriteIndex, 1);
        }
      }

      if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
    })
    .addCase(fetchFavoritesAction.rejected, (state, action) => {
      state.error = action.payload as string;
    })
    .addCase(toggleFavoriteAction.rejected, (state, action) => {
      state.error = action.payload as string;
    });
});
