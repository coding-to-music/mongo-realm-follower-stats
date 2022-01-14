import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaDev, FaTwitter, FaArrowsAltH, FaGithub } from "react-icons/fa";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { FiEdit } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import Header from "../components/Header";
import Spinner from "../components/icons/Spinner";
import Footer from "../components/Footer";

export default function Home() {
  const { user, error, isLoading } = useUser();

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
          <Header user={user} />
          <main>
            {/* Hero section */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2" />
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      className="object-cover w-full h-full"
                      src="/images/banner.jpg"
                      alt="FollowStats"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-700 to-blue-700"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
                      <span className="block text-white">FollowStats</span>
                    </h1>
                    <p className="max-w-lg mx-auto mt-6 text-2xl tracking-wide text-center text-blue-100 sm:max-w-3xl">
                      Keep track your followers and audience growth.
                      <br />
                      Delivered to your inbox, every Monday 9 AM.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative pt-16 pb-32 overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
              />
              <div className="relative">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                  <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                    <div>
                      <div>
                        <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-blue-400 to-blue-600">
                          <FaTwitter className="w-6 h-6 text-white" />
                        </span>
                      </div>
                      <div className="mt-6">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                          Keep a track of your followers
                        </h2>
                        <p className="mt-4 mr-10 text-xl text-gray-500">
                          FollowStats tracks your followers' count across
                          various platforms everyday. So you don't have to track
                          them yourself.
                        </p>
                        <div className="mt-6">
                          <Link href="/user">
                            <a className="inline-flex px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-800">
                              Get started
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 mt-8 border-t border-gray-200">
                      <blockquote>
                        <div>
                          <p className="text-base text-gray-500">
                            “Tracking your social media analytics is essential
                            because it helps you figure out what is or isn’t
                            working, enables you to track your progress
                            throughout a given time.”
                          </p>
                        </div>
                        <footer className="mt-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="w-6 h-6 rounded-full"
                                src="/images/blog.png"
                                alt=""
                              />
                            </div>
                            <a
                              href="https://www.seguetech.com/why-tracking-your-social-media-analytics-is-important/"
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-base font-medium text-gray-700"
                            >
                              seguetech.com
                            </a>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  <div className="mt-12 sm:mt-16 lg:mt-0">
                    <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                      <img
                        className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                        src="/images/screenshots/dashboard-screen.png"
                        alt="Inbox user interface"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-24">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                  <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                    <div>
                      <div>
                        <span className="flex items-center justify-center w-12 h-12 text-white rounded-md bg-gradient-to-r from-blue-400 to-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="mt-6">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                          Add all your social media platforms and newsletters
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                          (newsletters coming soon..)
                          <br /> You can track your followers across Dev.to,
                          GitHub, Twitter, YouTube. More integrations for
                          LinkedIn, Instagram, newsletters are coming soon.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="inline-flex px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-800"
                          >
                            Get started
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                    <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                      <img
                        className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                        src="/images/screenshots/settings-screen.png"
                        alt="Customer profile user interface"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Gradient Feature Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-500">
              <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Your followers' growth - to the moon 🚀 🌙
                </h2>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white">
              <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block">
                    Ready to be more{" "}
                    <span className="text-blue-500">intentional</span> about
                    growing your audience?
                  </span>
                  <span className="text-xl font-semibold text-blue-700">
                    Add your social media handles and track away!
                  </span>
                </h2>
                <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                  <Link href="/user">
                    <a className="inline-flex items-center justify-center px-4 py-2 ml-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-blue-800 bg-opacity-90">
                      Login
                    </a>
                  </Link>
                  <a
                    href="https://github.com/geekysrm/followstats"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-base font-medium text-gray-800 whitespace-nowrap hover:text-gray-900"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-800 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <FaGithub className="mr-1" /> View Source
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
