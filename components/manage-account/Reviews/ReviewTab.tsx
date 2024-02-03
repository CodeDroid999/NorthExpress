import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../../firebase'; // Update the path accordingly

const ReviewsTab = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        // Get userId from the router query
        const { id } = router.query;
        if (id) {
          setUserId(id);
          const reviewsQuery = query(collection(db, 'reviews'), where('tutorId', '==', id));
          const reviewDocs = await getDocs(reviewsQuery);

          const fetchedReviews = reviewDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setReviews(fetchedReviews);
        } else {
          setUserId(null);
          setReviews([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [router.query]);

  const calculateAverageRating = () => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews.length || 0;
    return averageRating.toFixed(1);
  };

  return (
    <div className="w-full rounded bg-blue-100 p-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Reviews</h2>
      <div className="flex w-full items-center justify-center space-x-2 rounded bg-gray-100 px-4 pt-4">
        {/* Remaining code for reviews count and average rating */}
      </div>
      <div className="flex-column flex w-full rounded bg-white">
        <div className="w-full bg-gray-100 p-2" style={{ height: '50vh', overflowY: 'auto' }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.length === 0 && <p className="pt-1 pb-2 text-lg">No reviews available.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
