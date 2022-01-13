import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import * as Realm from "realm-web";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");

  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div>
          New stuff
          <br />
          {/* <a href="/api/auth/login">Login</a> */}
          <Link href="/user">
            <a>Login</a>
          </Link>
          <br />
          <a href="/api/auth/logout">Logout</a>
        </div>
        <div>
          Enter email to signup
          <input
            type="email"
            className="border-2 border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          Enter your name
          <input
            className="border-2 border-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <br />
          Enter Twitter username
          <input
            className="border-2 border-blue-500"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />{" "}
          <br />
          Enter GitHub username
          <input
            className="border-2 border-black"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <button
          className="px-6 py-2 bg-red-300"
          onClick={async () => {
            // 1. Create new user in users collection
            // 2. In whichever social media the user has selected, create a new object with the data you want to store in that collection
            console.log("Clicked signup");
            let newUser = {
              name,
              email,
            };
            let socials = [];
            if (twitter) socials.push("twitter");
            if (github) socials.push("github");

            newUser.socials = socials;

            const REALM_APP_ID = "followers_tracker-vlmoo";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
              const user = await app.logIn(credentials);
              await user.functions.createUser(newUser);
              setMessage("user created. registering social media handles...");
            } catch (error) {
              console.error(error);
              setMessage("user creation failed. please try again later");
            }

            // Now registering the social media handles
            if (twitter) {
              try {
                const user = await app.logIn(credentials);
                await user.functions.registerSocialHandle({
                  social: "twitter",
                  username: twitter,
                  email: newUser.email,
                  followers: [],
                });
                setMessage("Twitter handle registered");
              } catch (error) {
                console.error(error);
                setMessage(
                  "Twitter handle registration failed. please register in settings after login"
                );
              }
            }
            if (github) {
              try {
                const user = await app.logIn(credentials);
                await user.functions.registerSocialHandle({
                  social: "github",
                  username: github,
                  email: newUser.email,
                  followers: [],
                });
                setMessage("github handle registered");
              } catch (error) {
                console.error(error);
                setMessage(
                  "github handle registration failed. please register in settings after login"
                );
              }
            }
          }}
        >
          SignUp
        </button>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
