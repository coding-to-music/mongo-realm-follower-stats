import React from "react";
import { FaTwitter, FaGithub, FaDev } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="" aria-labelledby="footerHeading">
        <h2 id="footerHeading" className="sr-only">
          Footer
        </h2>
        <div className="px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:pt-24 lg:px-8">
          <div className="pt-8 mt-12 border-t border-gray-200 md:flex md:items-center md:justify-between lg:mt-16">
            <div className="flex space-x-6 md:order-2">
              <a
                href="https://dev.to/geekysrm"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Twitter</span>
                <FaDev className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/geekysrm"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/geekysrm"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
              Made with ❤️ by{" "}
              <a
                href="https://soumya.dev"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold hover:underline hover:text-indigo-400"
              >
                geekySRM
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
