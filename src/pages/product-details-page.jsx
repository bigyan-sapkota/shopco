import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Stars from "../components/layouts/stars";
import useProduct from "../queries/use-product";
import ProductReview from "../components/products/product-review";

const tabList = [
  { value: "product-details", text: "Product Details" },
  { value: "rating-&-reviews", text: "Rating & Reviews" },
  { value: "faqs", text: "FAQs" },
];

export default function ProductDetailsPage() {
  const [isActiveTab, setIsActiveTab] = useState("product-details");
  const { data } = useProduct("suqj3dnekjqhwb64idppql09");

  const product = data?.product;

  if (!product) {
    return null;
  }

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
          <Stars number={4} className="mt-1" />
          <h4 className="mt-2">NPR.{product.price}</h4>
          <p className="mt-3 text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* rating and review */}
      <div>
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

        <div className="mt-8">
          {isActiveTab === "product-details" && (
            <p className="text-secondary-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio incidunt suscipit mollitia cum consequatur
              necessitatibus vitae molestias voluptates placeat, vero fuga
              similique. Tempora ad quod quibusdam dignissimos iusto error velit
              blanditiis. Dolore, laboriosam voluptatibus quae dolorem voluptate
              omnis magnam, rem labore, quam cupiditate voluptatum consequatur
              adipisci eius ipsam soluta sed quisquam? Dicta, reiciendis quae
              numquam reprehenderit at libero velit molestias est sapiente
              voluptatibus corrupti saepe eos nam repudiandae unde minima minus
              voluptas quisquam itaque totam quam cum tempora. Quis tenetur
              quidem est, minima maxime soluta dolore? Temporibus consequuntur
              recusandae impedit repudiandae dolore ipsa laboriosam, earum ut!
              Quia eius dicta deserunt?
            </p>
          )}
          {isActiveTab === "rating-&-reviews" && <ProductReview />}
        </div>
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
