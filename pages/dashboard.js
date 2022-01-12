import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function ProtectedDashboardPage() {
  const { user, error, isLoading } = useUser();
  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);

  // useEffect(() => {
  //   async function fn() {
  //     const REALM_APP_ID = "followers_tracker-vlmoo";
  //     const app = new Realm.App({ id: REALM_APP_ID });
  //     const credentials = Realm.Credentials.anonymous();
  //     try {
  //       const mongoUser = await app.logIn(credentials);
  //       const userPresent = await mongoUser.functions.findUser(user.email);
  //       if (userPresent) {
  //         setSocialMediaNames(userPresent.socials);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fn();
  // }, []);

  // useEffect(() => {
  //   async function fn() {
  //     const REALM_APP_ID = "followers_tracker-vlmoo";
  //     const app = new Realm.App({ id: REALM_APP_ID });
  //     const credentials = Realm.Credentials.anonymous();
  //     try {
  //       let finalData = {};
  //       const mongoUser = await app.logIn(credentials);
  //       for (let i = 0; i < socialMediaNames.length; i++) {
  //         const data = await mongoUser.functions.getFollowers({
  //           email: user.email,
  //           social: socialMediaNames[i],
  //         });
  //         console.log(data);

  //         finalData[socialMediaNames[i]] = {
  //           username: data.username,
  //           followers: data.followers,
  //         };
  //       }
  //       setSocialData(finalData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fn();
  // }, [socialMediaNames]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
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
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
