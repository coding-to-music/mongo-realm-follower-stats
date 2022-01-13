import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";
import { FaTwitter, FaArrowsAltH, FaGithub, FaDev } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Footer from "../components/Footer";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

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
                                  <FaDev className="w-10 h-10 text-[#090909]" />

                                  <div className="flex-1 w-0 ml-5">
                                    <dd className="flex items-baseline justify-between">
                                      <div className="flex flex-col text-gray-900">
                                        <span className="text-2xl font-semibold ">
                                          Dev.to
                                        </span>
                                        <span className="text-sm text-gray-600">
                                          @{socialData[sm]?.username}
                                        </span>
                                      </div>

                                      <div className="flex flex-col text-2xl font-semibold text-gray-700">
                                        {currentFollowers}
                                      </div>

                                      <div className="flex items-center ml-2 text-sm font-semibold text-green-500">
                                        {difference > 0 ? (
                                          <TiArrowSortedUp className="w-6 h-6 text-green-500" />
                                        ) : (
                                          <TiArrowSortedDown className="w-6 h-6 text-red-500" />
                                        )}
                                        <span className="text-lg font-extrabold">
                                          {difference}
                                        </span>
                                      </div>
                                      {/* Above  */}
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

      <div className="mx-auto">
        {/* <Header user={user} /> */}
        <div className="flex flex-col items-center md:items-stretch md:flex-row md:space-x-36">
          <h2>Welcome to your Dashboard {user.name}!</h2>

          <div>
            {socialMediaNames.map((sm) => {
              const followersData = socialData[sm]?.followers;
              // if(followersData)
              const currentFollowers =
                followersData &&
                followersData[followersData?.length - 1]?.count;
              let lastWeekFollowers = 0;
              if (followersData?.length >= 8) {
                lastWeekFollowers =
                  followersData &&
                  followersData[followersData?.length - 8]?.count;
              } else {
                lastWeekFollowers = followersData && followersData[0]?.count;
              }
              const difference = currentFollowers - lastWeekFollowers;
              return (
                <div>
                  LOGO {sm} @{socialData[sm]?.username} - {currentFollowers}{" "}
                  Followers | {difference || "Loading"} Followers/Week
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        Welcome to Dashboard, <b>{user.name}</b>
        {socialMediaNames?.length > 0 &&
          socialMediaNames?.map((socialMediaName) => (
            <div>{JSON.stringify(socialMediaName)}</div>
          ))}
        <br />
        <br />
        {JSON.stringify(socialData)}
        <div>
          GO to{" "}
          <Link href="/settings">
            <a>Settings</a>
          </Link>
        </div>
      </main> */}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
