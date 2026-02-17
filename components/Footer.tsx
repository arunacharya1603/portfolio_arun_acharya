import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import { siteConfig } from "@/lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full pt-20 pb-10 scroll-mt-32" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          width={1000}
          height={1000}
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out today and let&apos;s discuss how I can help you achieve your
          goals.
        </p>
        <a href={`mailto:${siteConfig.email}`}>
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white-200">
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/locations" className="hover:text-white">
            Locations
          </Link>
        </div>
        <p className="mt-3 text-center text-xs text-white-200">
          Freelance web developer available for global projects. Email:{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {year} Arun Acharya
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              onClick={() =>
                typeof window !== "undefined" &&
                window.open(info.link, "_blank")
              }
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image
                width={20}
                height={20}
                src={info.img}
                alt="icons"
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
