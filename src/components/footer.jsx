import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

import {
  companyLinks,
  faqLinks,
  helpLinks,
  resourcesLinks,
} from "../libs/constants";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer className="bg-background/70 padding-y">
      <div className="max-width padding-x flex justify-between">
        {/* logo , description and social media*/}
        <div>
          <h2 className="font-extrabold">SHOP.CO</h2>
          <p className="text-secondary-text mt-4 max-w-72">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>

          {/* social media */}
          <div className="mt-4 flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                href={social.link}
                target="_blank"
                key={social.id}
                className="custom-transition rounded-full border p-1 hover:bg-black hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* footer columns */}
        <FooterColumn title="COMPANY" arr={companyLinks} />
        <FooterColumn title="HELP" arr={helpLinks} />
        <FooterColumn title="FAQS" arr={faqLinks} />
        <FooterColumn title="RESOURCES" arr={resourcesLinks} />
      </div>

      {/* line */}
      <div className="max-width padding-x">
        <div className="mt-10 mb-6 h-px bg-gray-500"></div>
        <p className="text-center">
          &copy; Copyright {currentDate.getFullYear()} . All rights reserved by{" "}
          <strong>Bigyan Sapkota</strong>
        </p>
      </div>
    </footer>
  );
}

const FooterColumn = ({ title, arr }) => {
  return (
    <div>
      <h6 className="mb-3 font-medium tracking-wider">{title}</h6>
      <div>
        {arr.map((item) => (
          <Link
            to={item.route}
            key={item.id}
            className="text-secondary-text block"
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

const socialLinks = [
  {
    id: 1,
    icon: <FaTwitter />,
    link: "https://twitter.com/",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    link: "https://facebook.com/",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    link: "https://instagram.com/",
  },
  {
    id: 4,
    icon: <FaGithub />,
    link: "https://github.com/",
  },
];
