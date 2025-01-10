import Card from '../card/card';
import { useNavigate } from 'react-router-dom';
import { AccomodationOffer } from '../../types/offer';

type OfferListProps = {
  offers: AccomodationOffer[];
  onCardHover: (id: string | null) => void;
};

function OfferList({ offers, onCardHover }: OfferListProps): JSX.Element {
  // const offersList = useSelector((state: RootState) => state.offersList);
  // const currentCity = useSelector(selectCurrentCity);
  // const sortedOffers = useSelector(selectOffersSorted);
  const navigate = useNavigate();

  // if (sortedOffers.length === 0) {
  //   return <p>No offers available for {currentCity}</p>;
  // }

  const handleTitleClick = (id: string) => {
    navigate(`/offer/${id}`);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          accomodationOffer={offer}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
          onTitleClick={() => handleTitleClick(offer.id)}
        />
      ))}
    </div>
  );
}

export default OfferList;
