
exports = function() {
  const axios = require("axios");
  let twitterCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection("twitter");
 
  const allTwitterUsers = twitterCollection.find({}).toArray();

allTwitterUsers.forEach(async (twitterUser) => {
  
    const { data } = await axios.get(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${twitterUser.username}`)

    const followersCount = data[0].followers_count;
    const currentTimeStamp = new Date().toISOString();

    const newFollowers = [
      ...twitterUser.followers,
      { timestamp: currentTimeStamp, count: followersCount },
    ];

    const query = { email: twitterUser.email };
    const update = {
      $set: {
        followers: newFollowers,
      },
    };
    const options = { upsert: false };
    await twitterCollection.updateOne(query, update, options);
  });
  
  
  
};
