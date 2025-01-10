import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Header from '../../components/header/header';
import OfferList from '../../components/offersList/offersList';
import { AccomodationOffer } from '../../types/offer';

function FavoritesPage(): JSX.Element {
  // const favoriteOffers = useSelector((state: RootState) => state.offersList.filter((offer) => offer.isFavorite));
  const favoriteOffers = useSelector(
    (state: RootState) => state.favoriteOffers,
  );

  const groupedFavorites = favoriteOffers.reduce(
    (acc, offer) => {
      if (!acc[offer.city.name]) {
        acc[offer.city.name] = [];
      }
      acc[offer.city.name].push(offer);
      return acc;
    },
    {} as Record<string, AccomodationOffer[]>,
  );

  // const handleTitleClick = (id: string) => {
  //   navigate(`/offer/${id}`);
  // };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {Object.entries(groupedFavorites).length > 0 ? (
              <ul className="favorites__list">
                {Object.entries(groupedFavorites).map(([city, offers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList offers={offers} onCardHover={() => {}} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nothing yet saved.</p>
            )}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
