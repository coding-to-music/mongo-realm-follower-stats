import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const supportedSocialMedia = ["twitter", "github"];

export default function ProtectedSettingsPage() {
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
  }, [user, socialMediaNames]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(socialMediaNames);
  console.log(socialData);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h2>Settings Page</h2>
        <div>Hey {user.name}, here are your enabled social media:</div>
        <div>
          {supportedSocialMedia.map((sm) => {
            const socialMediaPresent = socialMediaNames.includes(sm);
            let smUsername = "";
            if (socialData && socialData[sm]) {
              smUsername = socialData[sm]?.username;
            }
            return (
              <div>
                {sm} :{" "}
                <input
                  className="border-2 border-red-200"
                  defaultValue={
                    socialMediaPresent ? smUsername || "Loading..." : ""
                  }
                  readOnly={!!smUsername}
                />{" "}
                <button>X</button>
              </div>
            );
          })}
        </div>
        <button onClick={() => {}}>Save</button>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
