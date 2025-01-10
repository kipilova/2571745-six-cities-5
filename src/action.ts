import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AccomodationOffer } from './types/offer';
import { AxiosInstance, AxiosError } from 'axios';
import { AuthorizationStatus } from './const';
import { Review } from './types/review';

export const Action = {
  SET_CURRENT_CITY: 'SET_CURRENT_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS',
};

export const setAuthorizationStatusAction = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);
export const setUserEmailAction = createAction<string>('user/setUserEmail');
export const setSortTypeAction = createAction<string>('app/setSortType');
export const signOutAction = createAction('user/signOut');

export const loadOffersAction = createAsyncThunk<
  AccomodationOffer[],
  undefined,
  { extra: AxiosInstance }
>('data/loadOffers', async (_, { extra: api, rejectWithValue }) => {
  // console.log('Extra argument (API):', api);
  try {
    const { data } = await api.get<AccomodationOffer[]>('/offers');
    return data;
  } catch (error) {
    const err = error as { message: string };
    return rejectWithValue(err.message);
  }
});

export const setCurrentCityAction = createAction(
  Action.SET_CURRENT_CITY,
  (value) => {
    return {
      payload: value,
    };
  },
);

export const loginAction = createAsyncThunk<
  number,
  { email: string; password: string },
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { extra: api, dispatch, rejectWithValue }) => {
    try {
      if (!email.trim() || !password.trim()) {
        return rejectWithValue('Email and password must not be empty.');
      }

      const response = await api.post('/login', { email, password });
      const { data } = response;
      // console.log('Full Login Response:', data);

      localStorage.setItem('six-cities-token', data.token);
      api.defaults.headers.common['X-Token'] = data.token;
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
      dispatch(setUserEmailAction(data.email));
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError;
      //   console.error('Login failed:', error);
      const errorMessage =
        (axiosError.response?.data as any)?.message || 'Failed to login';
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_, { extra: api, dispatch }) => {
  try {
    await api.get('/login');
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
  } catch (error) {
    // console.error('Authorization check failed:', error);
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
  }
});

export const loadOfferDetailsAction = createAsyncThunk<
  { offer: AccomodationOffer; nearbyOffers: AccomodationOffer[] },
  string,
  { extra: AxiosInstance }
>('data/loadOfferDetails', async (offerId, { extra: api, rejectWithValue }) => {
  try {
    const { data: offer } = await api.get<AccomodationOffer>(
      `/offers/${offerId}`,
    );
    const { data: nearbyOffers } = await api.get<AccomodationOffer[]>(
      `/offers/${offerId}/nearby`,
    );
    // console.log('Fetched Offer:', offer);
    // console.log('Nearby Offers:', nearbyOffers);
    return { offer, nearbyOffers };
  } catch (error) {
    return rejectWithValue('Failed to load offer details');
  }
});

export const loadReviewsAction = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>('data/loadComments', async (offerId, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    // console.log(data);
    return data;
  } catch (error) {
    return rejectWithValue('Failed to load comments');
  }
});

export const postReviewAction = createAsyncThunk<
  Review[],
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'data/postComment',
  async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Review[]>(`/comments/${offerId}`, {
        comment,
        rating,
      });
      return data;
    } catch (error) {
      return rejectWithValue('Failed to post comment');
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk<
  AccomodationOffer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>(
  'favorites/toggleFavorite',
  async ({ offerId, status }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<AccomodationOffer>(
        `/favorite/${offerId}/${status}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue('Failed to update favorite status');
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<
  AccomodationOffer[],
  void,
  { extra: AxiosInstance }
>('favorites/fetchFavorites', async (_, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<AccomodationOffer[]>(`/favorite`);
    return data;
  } catch (error) {
    return rejectWithValue('Failed to fetch favorites');
  }
});
