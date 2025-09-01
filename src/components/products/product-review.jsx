import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Stars from "../layouts/stars";

export default function ProductReview() {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id} className="mb-14">
            <div className="relative">
              <div
                className={`custom-transition h-full rounded-lg border border-gray-100 bg-white p-6 shadow-md`}
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-4 overflow-hidden rounded-full border border-gray-100 shadow-md">
                    <img
                      src={item.profileImage}
                      alt={item.name}
                      className="size-24 object-cover"
                    />
                  </div>
                  <div>
                    <Stars number={item.rating} className="mb-1 -ml-1" />
                    <h4 className="font-bold">{item.name}</h4>
                    {item.designation && (
                      <p className="text-sm text-gray-500">
                        - {item.designation}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">{item.statement}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const reviews = [
  {
    id: "user-1",
    reviewerId: "rev-101",
    name: "Aarav Shrestha",
    designation: "Chef",
    statement: "The tomatoes were really fresh and juicy, perfect for salads.",
    rating: 5,
    profileImage: "/dummy/profile/profile-1.jpg",
  },
  {
    id: "user-2",
    reviewerId: "rev-102",
    name: "Priya Gurung",
    designation: "Home Cook",
    statement:
      "Good quality carrots, though a few were slightly smaller in size.",
    rating: 4,
    profileImage: "/dummy/profile/profile-2.jpg",
  },
  {
    id: "user-3",
    reviewerId: "rev-103",
    name: "Ramesh Koirala",
    designation: "Nutritionist",
    statement:
      "Bananas were ripe and sweet, excellent source of natural energy.",
    rating: 5,
    profileImage: "/dummy/profile/profile-3.jpg",
  },
  {
    id: "user-4",
    reviewerId: "rev-104",
    name: "Sneha Adhikari",
    designation: "Food Blogger",
    statement: "The spinach was fresh but not as tender as expected.",
    rating: 3,
    profileImage: "/dummy/profile/profile-4.jpg",
  },
  {
    id: "user-5",
    reviewerId: "rev-105",
    name: "Bikash Lama",
    designation: "Restaurant Owner",
    statement: "Excellent potatoes, cooked evenly and had a great taste.",
    rating: 5,
    profileImage: "/dummy/profile/profile-5.jpg",
  },
  {
    id: "user-6",
    reviewerId: "rev-106",
    name: "Sita Maharjan",
    designation: "Dietitian",
    statement: "The apples were crunchy and flavorful, a healthy snack option.",
    rating: 4,
    profileImage: "/dummy/profile/profile-6.jpg",
  },
];
