import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ProtectedSettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Followers Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h2>Settings Page</h2>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
