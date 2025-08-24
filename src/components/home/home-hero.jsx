import clsx from "clsx";
import CountUp from "react-countup";

export default function HomeHero() {
  return (
    <section className="bg-[#f2f0f1]">
      <div className="max-width padding-x flex flex-col items-center justify-between lg:flex-row">
        {/* text and stats */}
        <div className="">
          <h1 className="max-w-[28rem] font-extrabold!">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p className="text-secondary-text my-8 max-w-[30rem]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="w-full rounded-full bg-black px-14 py-2 text-white lg:w-fit">
            Shop Now
          </button>

          <Stats className="mt-10" />
        </div>

        {/* image */}
        <div className="relative pt-8">
          <img src="/home/models.png" alt="models" className="w-200" />

          {/* larger star */}
          <img
            src="/icons/star.svg"
            alt="star"
            className="absolute top-10 right-0 w-20 lg:top-32 lg:right-10 lg:w-auto"
          />

          {/* smaller star */}
          <img
            src="/icons/star.svg"
            alt="star"
            className="absolute bottom-40 left-0 w-14 md:bottom-64 lg:bottom-96 lg:w-20"
          />
        </div>
      </div>
    </section>
  );
}

const Stats = ({ className }) => {
  const statsData = [
    { id: 1, count: 200, text: "International Brands" },
    {
      id: 2,
      count: 2000,
      text: "High-quality Products",
    },
    { id: 3, count: 30000, text: "Happy Customers" },
  ];

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-center gap-y-8 lg:flex-nowrap",
        className,
      )}
    >
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="border-secondary-text px-8 lg:border-l lg:first:border-l-0"
        >
          <h2 className="flex justify-center gap-1 text-center text-2xl lg:text-4xl">
            <CountUp end={stat.count} enableScrollSpy /> +
          </h2>
          <p className="text-secondary-text w-28 text-center md:w-auto">
            {stat.text}+
          </p>
        </div>
      ))}
    </div>
  );
};
