import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FaTwitter, FaGithub, FaDev, FaYoutube } from "react-icons/fa";

import Footer from "../components/Footer";
import Header from "../components/Header";

const supportedSocialMedia = ["twitter", "github", "devto", "youtube"];

export default function ProtectedSettingsPage() {
  const { user, error, isLoading } = useUser();

  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);
  const [twitterUsername, setTwitterUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [devtoUsername, setDevtoUsername] = useState("");
  const [youtubeUsername, setYoutubeUsername] = useState("");

  useEffect(() => {
    async function fn() {
      const REALM_APP_ID = "followers_tracker-vlmoo";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const mongoUser = await app.logIn(credentials);
        const userPresent = await mongoUser.functions.findUser(user.email);
        if (userPresent) {
          setSocialMediaNames(userPresent.socials);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fn();
  }, [user]);

  useEffect(() => {
    async function fn() {
      const REALM_APP_ID = "followers_tracker-vlmoo";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        let finalData = {};
        const mongoUser = await app.logIn(credentials);
        for (let i = 0; i < socialMediaNames.length; i++) {
          const data = await mongoUser.functions.getFollowers({
            email: user.email,
            social: socialMediaNames[i],
          });

          finalData[socialMediaNames[i]] = {
            username: data.username,
            followers: data.followers,
          };
          if (socialMediaNames[i] === "twitter") {
            setTwitterUsername(data.username);
          } else if (socialMediaNames[i] === "github") {
            setGithubUsername(data.username);
          } else if (socialMediaNames[i] === "devto") {
            setDevtoUsername(data.username);
          } else if (socialMediaNames[i] === "youtube") {
            setYoutubeUsername(data.username);
          }
        }

        setSocialData(finalData);
      } catch (error) {
        console.error(error);
      }
    }

    fn();
  }, [user, socialMediaNames]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="">
      <Head>
        <title>FollowStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overflow-y-auto">
        <div className="bg-white">
          <Header user={user} />
          <main>
            <div className="bg-gray-100">
              <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="p-20 bg-white rounded-lg shadow pb-28">
                  <h2 className="ml-10 text-3xl font-extrabold tracking-tight text-gray-600">
                    Settings
                  </h2>
                  <h3 className="ml-10 text-lg font-semibold text-gray-500">
                    <div className="flex items-center space-x-1">
                      Social Platforms{" "}
                    </div>
                  </h3>

                  <div className="flex pl-4 mt-6 ">
                    {/* heading */}
                    <div className="w-1/2">
                      <div className="flex flex-col -mb-5 overflow-hidden">
                        <div className="flex-grow py-5 bg-white sm:py-6">
                          <div className="flex items-center">
                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline space-x-44">
                                <div className="flex text-gray-700">
                                  <span className="pt-5 font-semibold text-md">
                                    Platform
                                  </span>
                                </div>

                                <div className="flex font-semibold text-gray-700">
                                  <span className="ml-6 text-md">Username</span>
                                </div>
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col overflow-hidden bg-white ">
                        <div className="flex-grow px-4 py-5 space-y-7 sm:p-6">
                          <div className="flex items-center">
                            <FaTwitter
                              className="w-10 h-10 text-[#1DA1F2]  mr-2"
                              style={{ color: "#1DA1F2" }}
                            />

                            <div className="flex-1 w-0">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    Twitter
                                  </span>
                                </div>

                                <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                  <input
                                    disabled={
                                      !!socialMediaNames.includes("twitter")
                                    }
                                    type="text"
                                    placeholder="Twitter Username"
                                    className="block w-full h-10 px-2 py-2 text-left bg-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    value={twitterUsername}
                                    onChange={(e) =>
                                      setTwitterUsername(e.target.value)
                                    }
                                  />
                                </div>
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaGithub
                              className="w-10 h-10 text-[#333] mr-2"
                              style={{ color: "#333" }}
                            />

                            <div className="flex-1 w-0">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    GitHub
                                  </span>
                                </div>

                                <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                  <input
                                    disabled={
                                      !!socialMediaNames.includes("github")
                                    }
                                    type="text"
                                    placeholder="GitHub Username"
                                    className="block w-full h-10 px-2 py-2 text-left bg-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    value={githubUsername}
                                    onChange={(e) =>
                                      setGithubUsername(e.target.value)
                                    }
                                  />
                                </div>
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaYoutube
                              className="w-10 h-10 text-[#ff0100] mr-2"
                              style={{ color: "#ff0100" }}
                            />

                            <div className="flex-1 w-0">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    YouTube
                                  </span>
                                </div>

                                <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                  <input
                                    disabled={
                                      !!socialMediaNames.includes("youtube")
                                    }
                                    type="text"
                                    placeholder="YouTube channel URL"
                                    className="block w-full h-10 px-2 py-2 text-left bg-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    value={youtubeUsername}
                                    onChange={(e) =>
                                      setYoutubeUsername(e.target.value)
                                    }
                                  />
                                </div>
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaDev
                              className="w-10 h-10 text-[#090909] mr-2"
                              style={{ color: "#090909" }}
                            />

                            <div className="flex-1 w-0">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex flex-col text-gray-900">
                                  <span className="text-2xl font-semibold ">
                                    Dev.to
                                  </span>
                                </div>

                                <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                  <input
                                    disabled={
                                      !!socialMediaNames.includes("devto")
                                    }
                                    type="password"
                                    placeholder="Dev.to API Key"
                                    className="block w-full h-10 px-2 py-2 text-left bg-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    value={devtoUsername}
                                    onChange={(e) =>
                                      setDevtoUsername(e.target.value)
                                    }
                                  />
                                </div>
                              </dd>
                            </div>
                          </div>
                          <a
                            href="https://developers.forem.com/api#section/Authentication/api_key"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-right text-blue-500"
                            style={{ marginTop: "1px" }}
                          >
                            How to get Dev.to API Key?
                          </a>
                          <div className="flex justify-end">
                            <button
                              onClick={async () => {
                                const REALM_APP_ID = "followers_tracker-vlmoo";
                                const app = new Realm.App({ id: REALM_APP_ID });
                                const credentials =
                                  Realm.Credentials.anonymous();
                                const mongoUser = await app.logIn(credentials);
                                await mongoUser.functions.registerSocialHandle({
                                  email: user.email,
                                  social: "twitter",
                                  username: twitterUsername,
                                  followers: [],
                                });
                                await mongoUser.functions.registerSocialHandle({
                                  email: user.email,
                                  social: "github",
                                  username: githubUsername,
                                  followers: [],
                                });
                                await mongoUser.functions.registerSocialHandle({
                                  email: user.email,
                                  social: "youtube",
                                  username: youtubeUsername,
                                  followers: [],
                                });
                                await mongoUser.functions.registerSocialHandle({
                                  email: user.email,
                                  social: "devto",
                                  username: devtoUsername,
                                  followers: [],
                                });
                              }}
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-right text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
                            >
                              Save
                            </button>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="flex mt-6 space-x-3 overflow-hidden">
                              <img
                                className="inline-block object-cover w-10 h-10 rounded-full "
                                src="/images/instagram.png"
                                alt=""
                              />
                              <img
                                className="inline-block object-cover w-10 h-10 rounded-full "
                                src="/images/mailchimp.png"
                                alt=""
                              />

                              <img
                                className="inline-block object-cover w-10 h-10 rounded-full "
                                src="/images/buttondown.png"
                                alt=""
                              />
                              <img
                                className="inline-block object-cover w-10 h-10 rounded-full "
                                src="/images/convertkit.png"
                                alt=""
                              />
                              <img
                                className="inline-block object-cover w-10 h-10 rounded-full "
                                src="/images/linkedin.png"
                                alt=""
                              />
                            </div>
                            <h3 className="mt-2 text-lg font-light text-gray-600">
                              Coming soon...
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <img src="images/add-platform.png" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-5 ml-10 -mb-5">
                    <div className="inline-flex items-center px-4 py-2 text-base font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
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
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      <Link href="/dashboard">
                        <a>Back to Dashboard</a>
                      </Link>
                    </div>
                  </div>
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

export const getServerSideProps = withPageAuthRequired();
