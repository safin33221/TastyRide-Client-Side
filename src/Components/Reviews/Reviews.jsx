import { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SectionTitle from '../../Shared/SectionTitle';
import Marquee from 'react-fast-marquee';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get('/api/reviews')
      .then(response => {
        if (response?.data?.success && Array.isArray(response?.data?.data)) {
          setReviews(response.data.data);
        } else {
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="space-y-4 py-8 mt-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 h-24 rounded-lg"
          ></div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load reviews. Please try again later.
      </div>
    );

  return (
    <section className=" mx-auto px-4 mt-10 ">

      <SectionTitle title={`Customer Feedback`} desc={`Real Stories, Honest Opinions — Because Your Experience Matters Most`} />


      <div className="  rounded-lg  p-4">
        <Marquee
          speed={60}
          gradient={false}
          loop={0}
          
          style={{ zIndex: '0' }}
          className='h-80'

        >
          <div className="flex gap-6">
            {reviews.map(review => (
              <div key={review._id} class="min-w-xs max-w-xs  mx-auto bg-gray-100 shadow-lg rounded-bl-4xl rounded-tr-4xl p-4 text-center relative">
                {/* <!-- Customer Image --> */}
                <div class="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div class="w-20 h-20 z-20 rounded-full border-4 border-red-500 overflow-hidden shadow-md">
                    {review?.userPhoto ?
                      <img src={review?.userPhoto} alt="Customer" class="w-full h-full object-cover" /> :
                      <div className="bg-blue-100  text-blue-600 rounded-full w-full h-full flex items-center justify-center font-bold mr-3">
                        {review.userId.charAt(0).toUpperCase()}
                      </div>

                    }
                  </div>
                </div>

                {/* <!-- Content --> */}
                <div class="mt-12 ">
                  {/* <!-- Stars --> */}
                  <div class="flex justify-center space-x-1 mb-2">
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* <!-- Name --> */}
                  <h3 class="text-gray-800 font-semibold text-lg mb-2">- - {review.userName}</h3>

                  {/* <!-- Text --> */}
                  <p class="text-gray-600 text-sm">
                    {review.review}
                  </p>
                </div>
              </div>

            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Reviews;
