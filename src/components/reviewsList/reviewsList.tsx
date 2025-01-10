import Review from '../review/review';
import { selectReviews } from '../../selector';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadReviewsAction } from '../../action';

function ReviewsList(): JSX.Element {
  const { id: offerId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector(selectReviews);

  useEffect(() => {
    if (offerId) {
      dispatch(loadReviewsAction(offerId));
    }
  }, [dispatch, offerId]);

  // if (!Array.isArray(reviews)) {
  //   console.error('Expected reviews to be an array, but received:', reviews);
  //   return <p>No reviews available.</p>;
  // }

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
