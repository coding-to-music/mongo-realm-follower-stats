import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";

export default function Login() {
  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [socialData, setSocialData] = useState(undefined);

  const currentUserEmail = "newnewnew@gmail.com";

  useEffect(() => {
    async function fn() {
      const REALM_APP_ID = "followers_tracker-vlmoo";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const userPresent = await user.functions.findUser(currentUserEmail);
        if (userPresent) {
          setSocialMediaNames(userPresent.socials);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fn();
  }, []);

  useEffect(() => {
    async function fn() {
      const REALM_APP_ID = "followers_tracker-vlmoo";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        let finalData = {};
        const user = await app.logIn(credentials);
        for (let i = 0; i < socialMediaNames.length; i++) {
          const data = await user.functions.getFollowers({
            email: currentUserEmail,
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

  //   console.log(socialMediaNames);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        Welcome to Dashboard, <b>{currentUserEmail}</b>
        {/* {user && <div>{JSON.stringify(user)}</div>} */}
        {/* {user?.socials?.length > 0 &&
          user.socials.map((social) => <div>{social}</div>)} */}
        {socialMediaNames?.length > 0 &&
          socialMediaNames?.map((socialMediaName) => (
            <div>{JSON.stringify(socialMediaName)}</div>
          ))}
        <br />
        <br />
        {JSON.stringify(socialData)}
      </main>
    </div>
  );
}
