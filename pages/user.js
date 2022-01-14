import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import Footer from "../components/Footer";
import Header from "../components/Header";
import socialMediaMappings from "../utils/socialMediaMappings";

export default function ProtectedUserPage() {
  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);

  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here, check if user is already present in users collection
    // If not present, create the user using Realm function - createUser()
    async function fn() {
      console.log("Clicked login");

      const REALM_APP_ID = "followers_tracker-vlmoo";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const mongoUser = await app.logIn(credentials);
        const userPresent = await mongoUser.functions.findUser(user.email);
        console.log(userPresent);
        if (userPresent) {
          console.log("user found");
          // router.push("/dashboard");
        } else {
          console.log("user not found");
          console.log("Creating user");
          let newUser = {
            name: user.name,
            email: user.email,
            socials: [],
          };

          try {
            await mongoUser.functions.createUser(newUser);
            console.log("successfully created new user");
          } catch (error) {
            console.error(error);
            console.log("could not create new user");
          }
          // router.push("/dashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        // router.push("/");
      }
    }
    fn();
  }, [user]);

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
                    Your Profile
                  </h2>
                  <h3 className="ml-10 text-lg font-semibold text-gray-500">
                    <div className="flex items-center space-x-1">
                      Welcome, {user.name}{" "}
                    </div>
                  </h3>

                  <div className="flex pl-4 mt-6 ">
                    {/* heading */}
                    <div className="w-1/2">
                      <div className="flex flex-col -mb-5 overflow-hidden">
                        <div className="flex-grow px-4 py-5 bg-white sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-1 w-0 ml-5">
                              <img
                                src={user.picture}
                                className="w-2/3"
                                alt={user.name}
                              />
                              <p className="mt-3">
                                <b>Your email:</b>
                                <br />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <img src="images/avatar.png" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-5 ml-10 -mb-5">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                        <Link href="/dashboard">
                          <a>Go to Dashboard</a>
                        </Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    )}
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
