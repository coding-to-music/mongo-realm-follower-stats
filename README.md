# mongo-realm-follower-stats

# 🚀

- MongoDB Realm functions for backend
- MongoDB Realm Triggers to keep track of follower count on schedule and send email on Monday
- Auth0 for login
- Taiwind CSS for styling
- Next.js as frontend framework
  🚀

https://github.com/coding-to-music/mongo-realm-follower-stats

https://mongo-realm-follower-stats.vercel.app

From / By https://github.com/geekysrm

https://github.com/geekysrm/followstats - deleted, the new one is https://github.com/geekysrm/follow-stats

https://dev.to/geekysrm/followstats-keep-track-of-your-followers-and-subscribers-and-get-weekly-emails-2f03

2022 article:

https://dev.to/geekysrm/followstats-keep-track-of-your-followers-and-subscribers-and-get-weekly-emails-4g7o

https://followstats.vercel.app/

## Environment variables:

```java
AUTH0_SECRET=<Auth0 secret>
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL=<Auth0 domain>
AUTH0_CLIENT_ID=<Auth0 client ID>
AUTH0_CLIENT_SECRET=<Auth0 client secret>

REALM_APP_ID=""
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/mongo-realm-follower-stats.git
git push -u origin main
```

## Asked question on dev.to to the author

https://dev.to/geekysrm/followstats-keep-track-of-your-followers-and-subscribers-and-get-weekly-emails-4g7o

Does the repo work "as-is" or does the init code need to be written? https://github.com/geekysrm/follow-stats/blob/main/utils/init.js

init.js says:

```
// Initialize mongoDB and connect to correct Realm function
```

# FollowStats

### Overview of My Submission

As part of the [MongoDB Atlas + Dev hackathon](https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m), I am glad to present [FollowStats](https://followstats.vercel.app/).
FollowStats enables you to be more intentional about building an audience and helps you to track your followers, subscribers from various platforms periodically. It keeps a daily track of your followers and subscribers count. You can view your growth/ decline of your followers and subscribers in an organized dashboard.
It also sends you a weekly overview of your audience to your email every Monday morning at 09:00.

[Live Application](https://followstats.vercel.app/)

### Submission Category: Action Star

### How to run the application locally

- The `realm-backend` folder contains the code for MongoDB Realm Functions.
- A Sendgrid API Key is needed to be used in file https://github.com/geekysrm/followstats/blob/main/realm-backend/functions/sendFollowersReport.js#L66.
- The sendgrid email HTML code is here: https://github.com/geekysrm/followstats/blob/main/sendgrid-email-template.html
- Install all dependencies for the frontend: `npm i`
- The root app is a Next.js app which can be run by using: `npm run dev`.
- Auth0 also needs to be configured with GitHub as social login.
- Please create a `env.local` file at the root of the project with the following content:

```
AUTH0_SECRET=<Auth0 secret>
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL=<Auth0 domain>
AUTH0_CLIENT_ID=<Auth0 client ID>
AUTH0_CLIENT_SECRET=<Auth0 client secret>
```

### Additional Resources / Info

#### Screenshots and Video

**User Dashboard**
![User Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ktm0yifuoknzhzpwqnwo.png)

**Settings Page**

![Settings Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bari64vpkix3utaqwz3h.png)

**Weekly Email Report**

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gcyk52hhzacwrf37qfx8.png)

I have prepared a **demo video** which can be viewed here: [Video Link](https://link.soumya.dev/atlas-hack-demo)

#### Technologies used

- MongoDB Realm functions for backend
- MongoDB Realm Triggers to keep track of follower count on schedule and send email on Monday
- Auth0 for login
- Taiwind CSS for styling
- Next.js as frontend framework

#### My experience

I had previously used MongoDB but was unaware of the cool functionalities like Realm functions, triggers etc.
I was really fascinated by how easy it is to build your backend using MongoDB Realm functions. We can easily import npm packages and use those too. I also used triggers for the first time to fetch followers' count everyday and send email report every Monday.

#### Challenges faced

The major challenge was to figure out the way to fetch followers/ subscribers data from various platforms. I had to try many methods (like using official API, scraping etc.) before I arrived at a method that works.

#### What's next for FollowStats?

- Add more platforms like Instagram, LinkedIn and newsletter platforms like Mailchimp, Convertkit, Buttondown etc.
- Add charts and graphs to visualize followers' growth.

#### Try it Out

[Live Application](https://followstats.vercel.app/)

[View Source Code](https://github.com/geekysrm/followstats)

Please try this out and give your valuable feedback in the comments below or on [Twitter](https://twitter.com/geekysrm).
