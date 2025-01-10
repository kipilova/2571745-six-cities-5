import OfferList from '../../components/offersList/offersList';
import Map from '../../components/map/Map';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentCityAction, setSortTypeAction } from '../../action';
import { selectOffersForCity, selectOffersSorted } from '../../selector';
import { cities } from '../../mocks/cities';
import { AppDispatch } from '../../store';
import { useEffect } from 'react';
import { loadOffersAction } from '../../action';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import { useState } from 'react';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector((state: RootState) => state.city);
  const offers = useSelector(selectOffersForCity);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const sortType = useSelector((state: RootState) => state.sortType);
  const sortedOffers = useSelector(selectOffersSorted);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadOffersAction());
  }, [dispatch]);

  const cityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const cityData =
    cityOffers.length > 0
      ? {
          title: currentCity,
          lat: cityOffers[0].location.latitude,
          lng: cityOffers[0].location.longitude,
          zoom: cityOffers[0].location.zoom,
        }
      : {
          title: currentCity,
          lat: 52.3909553943508,
          lng: 4.85309666406198,
          zoom: 12,
        };

  const points = cityOffers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint = points.find((point) => point.id === selectedOfferId);

  const handleCityChange = (city: string) => {
    dispatch(setCurrentCityAction(city));
  };

  const handleSortChange = (type: string) => {
    dispatch(setSortTypeAction(type));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city.name}>
                  <a
                    className={`locations__item-link tabs__item ${
                      city.name === currentCity ? 'tabs__item--active' : ''
                    }`}
                    href="#"
                    onClick={() => handleCityChange(city.name)}
                  >
                    <span>{city.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {currentCity}
              </b>

              <Sorting currentSort={sortType} onSortChange={handleSortChange} />

              <OfferList
                offers={sortedOffers}
                onCardHover={setSelectedOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={cityData}
                points={points}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
