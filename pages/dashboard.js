import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FaDev } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import Footer from "../components/Footer";
import Header from "../components/Header";
import socialMediaMappings from "../utils/socialMediaMappings";

export default function ProtectedDashboardPage() {
  const { user, error, isLoading } = useUser();
  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);

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
          console.log(data);

          finalData[socialMediaNames[i]] = {
            username: data.username,
            followers: data.followers,
          };
        }
        setSocialData(finalData);
      } catch (error) {
        console.error(error);
      }
    }

    fn();
  }, [socialMediaNames]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(socialData);
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
                    Last week's stats
                  </h2>
                  <h3 className="ml-10 text-lg font-semibold text-gray-500">
                    <div className="flex items-center space-x-1">
                      Next email scheduled on{" "}
                      <b className="ml-1 font-bold">Monday</b>{" "}
                      <MdOutlineMarkEmailUnread className="w-4 h-4" />
                    </div>
                  </h3>

                  <div className="flex pl-4 mt-6 ">
                    {/* heading */}
                    <div className="w-1/2">
                      <div className="flex flex-col -mb-5 overflow-hidden">
                        <div className="flex-grow px-4 py-5 bg-white sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-1 w-0 ml-5">
                              <dd className="flex items-baseline justify-between">
                                <div className="flex text-gray-700">
                                  <span className="pt-5 font-semibold text-md">
                                    Platform
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

                      {socialData &&
                        socialMediaNames.map((sm) => {
                          const followersData = socialData[sm]?.followers;
                          const currentFollowers =
                            followersData &&
                            followersData[followersData?.length - 1]?.count;
                          let lastWeekFollowers = 0;
                          if (followersData?.length >= 8) {
                            lastWeekFollowers =
                              followersData &&
                              followersData[followersData?.length - 8]?.count;
                          } else {
                            lastWeekFollowers =
                              followersData && followersData[0]?.count;
                          }
                          const difference =
                            currentFollowers - lastWeekFollowers;
                          return (
                            <div className="flex flex-col overflow-hidden bg-white ">
                              <div className="flex-grow px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                  {socialMediaMappings[sm].logo}

                                  <div className="flex-1 w-0 ml-5">
                                    <dd className="flex items-center justify-between">
                                      <div className="flex flex-col text-gray-900">
                                        <span className="text-2xl font-semibold ">
                                          {socialMediaMappings[sm].name}
                                        </span>
                                        {!socialMediaMappings[sm]
                                          .maskedUsername && (
                                          <a
                                            className="text-sm text-gray-600"
                                            href={`${socialMediaMappings[sm].url}{socialData[sm]?.username}`}
                                          >
                                            @{socialData[sm]?.username}
                                          </a>
                                        )}
                                      </div>

                                      <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                        {currentFollowers}
                                      </div>

                                      <div className="flex">
                                        {difference === 0 && (
                                          <div>
                                            <span
                                              className={
                                                "text-md font-medium text-blue-500"
                                              }
                                            >
                                              No change
                                            </span>
                                          </div>
                                        )}
                                        {difference !== 0 && (
                                          <div className="flex items-center ml-2 text-sm font-semibold">
                                            {difference > 0 ? (
                                              <TiArrowSortedUp className="w-6 h-6 text-green-500" />
                                            ) : (
                                              <TiArrowSortedDown className="w-6 h-6 text-red-500" />
                                            )}
                                            <span
                                              className={`text-lg font-extrabold ${
                                                difference > 0
                                                  ? "text-green-500"
                                                  : "text-red-500"
                                              }`}
                                            >
                                              {difference}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </dd>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="w-1/2">
                      <img src="images/social-girl.png" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-5 ml-10 -mb-5">
                    <div className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <Link href="/settings">
                        <a>Add Platform</a>
                      </Link>
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

export const getServerSideProps = withPageAuthRequired();
