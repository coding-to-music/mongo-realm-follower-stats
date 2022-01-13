import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaTwitter, FaArrowsAltH, FaGithub, FaDev } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePicture, AiOutlineArrowUp } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Header from "../components/Header";
import Spinner from "../components/icons/Spinner";
import Footer from "../components/Footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");

  const [message, setMessage] = useState("");

  return (
    <div className="">
      <Head>
        <title>Follow Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overflow-y-auto">
        <div className="bg-white">
          {/* <Header user={user} /> */}
          <main>
            {/* Hero section */}
            <div className="bg-gray-100">
              <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-600">
                    Last week's stats
                  </h2>
                  <h3 className="text-lg font-semibold text-gray-500">
                    Next email scheduled on <b className="font-bold">Monday</b>
                  </h3>

                  <div className="flex pl-4 mt-6 bg-white rounded-lg shadow pb-28">
                    {/* heading */}
                    <div className="w-1/2">
                      <div className="flex flex-col -mb-5 overflow-hidden">
                        <div className="flex-grow px-4 py-5 bg-white sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex text-gray-700">
                                  <span className="pt-5 font-semibold text-md">
                                    Social media
                                  </span>
                                </div>

                                <div className="flex font-semibold text-gray-700 -mr-7">
                                  <span className="text-md">
                                    Current Followers
                                  </span>
                                </div>

                                <div className="flex items-center -mr-4 font-semibold text-center text-gray-700 text-md">
                                  Change/wk.
                                </div>
                                {/* Above  */}
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Devto */}
                      <div className="flex flex-col overflow-hidden bg-white ">
                        <div className="flex-grow px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <FaDev className="w-10 h-10 text-[#090909]" />

                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    Dev.to
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    @geekysrm
                                  </span>
                                </div>

                                <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                  71,897
                                </div>

                                <div className="flex items-center ml-2 text-sm font-semibold text-green-500">
                                  <TiArrowSortedUp className="w-6 h-6 text-green-500" />
                                  <span className="text-lg font-extrabold">
                                    122
                                  </span>
                                </div>
                                {/* Above  */}
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Twitter */}
                      <div className="flex flex-col overflow-hidden bg-white">
                        <div className="flex-grow px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <FaTwitter className="w-10 h-10 text-[#1DA1F2]" />

                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    Twitter
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    @geekysrm
                                  </span>
                                </div>

                                <div className="text-2xl font-semibold text-gray-900">
                                  71,897
                                </div>

                                <div className="flex items-center ml-2 text-sm font-semibold text-green-500">
                                  <TiArrowSortedUp className="w-6 h-6 text-green-500" />
                                  <span className="text-lg font-extrabold">
                                    122
                                  </span>
                                </div>
                                {/* Above  */}
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* GitHub */}
                      <div className="flex flex-col overflow-hidden bg-white">
                        <div className="flex-grow px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <FaGithub className="w-10 h-10 text-[#333]" />

                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    GitHub
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    @geekysrm
                                  </span>
                                </div>

                                <div className="text-2xl font-semibold text-gray-900">
                                  71,897
                                </div>

                                <div className="flex items-center ml-2 text-sm font-semibold text-red-500">
                                  <TiArrowSortedDown className="w-6 h-6 text-red-500" />
                                  <span className="text-lg font-extrabold">
                                    12
                                  </span>
                                </div>
                                {/* Above  */}
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <img src="images/social-girl.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Footer */}
          <div className="absolute bottom-0 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
