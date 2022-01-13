import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>FollowStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div>
          Enter email to login
          <input
            type="email"
            className="border-2 border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
        </div>
        <button
          className="px-6 py-2 bg-red-300"
          onClick={async () => {
            // Just allow login if present in users table
            console.log("Clicked login");

            const REALM_APP_ID = "followers_tracker-vlmoo";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
              const user = await app.logIn(credentials);
              const userPresent = await user.functions.findUser(email);
              if (userPresent) {
                setMessage("user present. logging you in");
                router.push("/dashboard");
              } else {
                setMessage("user not present. cant login");
              }
            } catch (error) {
              console.error(error);
              setMessage("user login failed. please try again later");
            }
          }}
        >
          Login
        </button>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
