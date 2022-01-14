import { FaDev, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const socialMediaMappings = {
  twitter: {
    name: "Twitter",
    logo: (
      <FaTwitter
        className="w-10 h-10 text-[#1DA1F2]"
        style={{ color: "#1DA1F2" }}
      />
    ),
    url: "https://twitter.com/",
  },
  github: {
    name: "GitHub",
    logo: (
      <FaGithub className="w-10 h-10 text-[#333]" style={{ color: "#333" }} />
    ),
    url: "https://github.com/",
  },
  devto: {
    name: "Dev.to",
    logo: (
      <FaDev
        className="w-10 h-10 text-[#090909]"
        style={{ color: "#090909" }}
      />
    ),
    url: "https://dev.to/",
    maskedUsername: true,
  },
  youtube: {
    name: "YouTube",
    logo: (
      <FaYoutube
        className="w-10 h-10 text-[#ff0100]"
        style={{ color: "#ff0100" }}
      />
    ),
    url: "",
    maskedUsername: true,
  },
};

export default socialMediaMappings;
