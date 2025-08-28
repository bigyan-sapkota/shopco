import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const tabList = [
  { value: "product-details", text: "Product Details" },
  { value: "rating-&-reviews", text: "Rating & Reviews" },
  { value: "faqs", text: "FAQs" },
];

const product = {
  id: "moyagjt68kbz2n14jr24qldp",
  title: "Fresh Oranges",
  image:
    "https://ch-api.healthhub.sg/api/public/content/3e5a938cb19a44398e1dc1edd99ed2c2?v=a2f62a2a&t=livehealthyheaderimage",
  category: "fruits",
  description:
    "The orange is a culinary treasure, offering a wealth of flavor and versatility in the kitchen. Its juice is a refreshing beverage, while its zest adds a bright and zesty note to baked goods, sauces, and marinades. From orange marmalade to orange chicken, the possibilities are endless with this vibrant and delicious fruit.",
  stock: 45,
  ownerId: "tb3vf8e41xpnaapwlu2g83qo",
  price: 100,
  discount: 7,
  createdAt: "2025-12-27 02:44:54.46+00",
  owner: {
    id: "tb3vf8e41xpnaapwlu2g83qo",
    name: "Bibek Bhattarai",
    email: "bibekbhattarai137@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocICini1E2iYwVLreJLhxZ3g7OjyLO4Z8LiDg_qTs5FDXX99K4M=s96-c",
    phone: null,
    authSource: "google",
    isVerified: false,
    role: "user",
    createdAt: "2025-02-02 09:30:18.023686+00",
    address: null,
  },
};

export default function ProductDetailsPage() {
  const [isActiveTab, setIsActiveTab] = useState("product-details");

  return (
    <main className="max-width padding-x padding-y">
      {/* breadcrumb */}
      <BreadCrumb title={product.title} />

      {/* main product detail */}
      <div className="mt-9 mb-14 flex items-start gap-10">
        <div className="w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-cover object-left"
          />
        </div>
        <div className="w-1/2">
          <h1 className="font-bold">{product.title}</h1>
          {/* rating here */}
          <h4 className="mt-2">NPR.{product.price}</h4>
          <p className="mt-3 text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* rating and review */}
      <div className="flex justify-between border-b border-gray-400">
        {tabList.map((tab, i) => (
          <button
            key={i}
            onClick={() => setIsActiveTab(tab.value)}
            className={`w-full cursor-pointer border-b-2 pb-2 text-lg ${isActiveTab === tab.value ? "border-b-black" : "border-b-transparent"}`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      {/* more products */}
      <div></div>
    </main>
  );
}

const BreadCrumb = ({ title }) => {
  const arr = [
    { route: "/", text: "Home" },
    { route: "/products", text: "Products" },
    { route: "", text: title },
  ];

  return (
    <div className="flex items-center gap-2">
      {arr.map((item, i) => (
        <div key={i}>
          {i === 2 ? (
            <p>{item.text}</p>
          ) : (
            <div className="text-secondary-text flex items-center gap-2">
              <Link className="" to={item.route}>
                {item.text}
              </Link>
              <MdOutlineKeyboardArrowRight />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
