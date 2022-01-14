exports = function () {
  const axios = require("axios");
  let githubCollection = context.services
    .get("mongodb-atlas")
    .db("followers_tracker")
    .collection("github");

  const allGithubUsers = githubCollection.find({}).toArray();

  allGithubUsers.forEach(async (githubUser) => {
    const { data } = await axios.get(
      `https://api.github.com/users/${githubUser.username}`
    );

    const followersCount = data.followers;
    const currentTimeStamp = new Date().toISOString();

    const newFollowers = [
      ...githubUser.followers,
      { timestamp: currentTimeStamp, count: followersCount },
    ];

    const query = { email: githubUser.email };
    const update = {
      $set: {
        followers: newFollowers,
      },
    };
    const options = { upsert: false };
    await githubCollection.updateOne(query, update, options);
  });
};
