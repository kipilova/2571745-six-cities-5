import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteAction } from '../../action';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { AccomodationOffer } from '../../types/offer';
import { AppDispatch } from '../../store';

type CardProps = {
  accomodationOffer: AccomodationOffer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onTitleClick: () => void;
};

function Card({
  accomodationOffer,
  onMouseEnter,
  onMouseLeave,
  onTitleClick,
}: CardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus,
  );

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
    } else {
      dispatch(
        toggleFavoriteAction({
          offerId: accomodationOffer.id,
          status: accomodationOffer.isFavorite ? 0 : 1,
        }),
      );
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseEnter(accomodationOffer.id)}
      onMouseLeave={onMouseLeave}
    >
      {accomodationOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={accomodationOffer.previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{accomodationOffer.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              accomodationOffer.isFavorite
                ? 'place-card__bookmark-button--active'
                : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {accomodationOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${(accomodationOffer.rating / 5) * 100}%` }}
            ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
          onClick={onTitleClick}
          style={{ cursor: 'pointer' }}
        >
          {accomodationOffer.title}
        </h2>
        <p className="place-card__type">{accomodationOffer.type}</p>
      </div>
    </article>
  );
}

export default Card;
