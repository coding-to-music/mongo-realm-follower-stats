import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ProtectedUserPage() {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>FollowStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        {user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Link href="/dashboard">
                <a>Go to Dashboard</a>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
