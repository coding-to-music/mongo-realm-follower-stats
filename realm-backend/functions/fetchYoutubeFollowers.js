exports = function () {
  const axios = require("axios");
  const kConvert = require('k-convert')
  
  let youtubeCollection = context.services
    .get("mongodb-atlas")
    .db("followers_tracker")
    .collection("youtube");

  const allYoutubeUsers = youtubeCollection.find({}).toArray();

  allYoutubeUsers.forEach(async (youtubeUser) => {
    const { data } = await axios.get(
      `https://youtube-scrape.herokuapp.com/api/search?q=${youtubeUser.username}`
    );
    
    const isChannel = Object.keys(data.results[0])[0] === 'channel'
    if(isChannel) {
        const subscribersText = data.results[0].channel.subscriber_count;
        const followersCount = kConvert.convertFrom(subscribersText.split(" ")[0]);
        const currentTimeStamp = new Date().toISOString();
    
        const newFollowers = [
          ...youtubeUser.followers,
          { timestamp: currentTimeStamp, count: followersCount },
        ];
  
      const query = { email: youtubeUser.email };
      const update = {
        $set: {
          followers: newFollowers,
        },
      };
      const options = { upsert: false };
      await youtubeCollection.updateOne(query, update, options);
    }
  });
};
