import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const supportedSocialMedia = ["twitter", "github"];

export default function ProtectedSettingsPage() {
  const { user, error, isLoading } = useUser();

  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);
  const [twitterUsername, setTwitterUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [devtoUsername, setDevtoUsername] = useState("");

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h2>Settings Page</h2>
        <div>Hey {user.name}, here are your enabled social media:</div>
        <div>
          <div>
            Twitter:{" "}
            <input
              placeholder="twitter username"
              className="border-2 border-red-200"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
            />
          </div>
          <div>
            GitHub:{" "}
            <input
              placeholder="gitHub username"
              className="border-2 border-red-200"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />
          </div>
          <div>
            Devto:{" "}
            <input
              placeholder="devto api key"
              className="border-2 border-red-200"
              value={devtoUsername}
              onChange={(e) => setDevtoUsername(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-blue-500"
          onClick={async () => {
            // do saves for all social media one by one
            const REALM_APP_ID = "followers_tracker-vlmoo";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            // Twitter registration
            const mongoUser = await app.logIn(credentials);
            await mongoUser.functions.registerSocialHandle({
              social: "twitter",
              username: twitterUsername,
              email: user.email,
              followers: [],
            });
            // GitHub registration
            await mongoUser.functions.registerSocialHandle({
              social: "github",
              username: githubUsername,
              email: user.email,
              followers: [],
            });
            // Devto registration
            await mongoUser.functions.registerSocialHandle({
              social: "devto",
              username: devtoUsername,
              email: user.email,
              followers: [],
            });
          }}
        >
          SAVE
        </button>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
