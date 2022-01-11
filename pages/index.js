import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";

export default function Home() {
  // const [products, setProducts] = useState([]);

  // useEffect(async () => {
  //   const REALM_APP_ID = "products-xridh";
  //   const app = new Realm.App({ id: REALM_APP_ID });
  //   const credentials = Realm.Credentials.anonymous();
  //   try {
  //     const user = await app.logIn(credentials);
  //     const allProducts = await user.functions.getAllProducts();
  //     setProducts(allProducts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div>
          Enter email to login
          <input type="email" className="border-2 border-green-500" /> <br />
          Enter Twitter username
          <input className="border-2 border-blue-500" /> <br />
          Enter Medium username
          <input className="border-2 border-black" />
        </div>
      </main>
    </div>
  );
}
