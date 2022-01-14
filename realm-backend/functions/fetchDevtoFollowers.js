const callDevtoApi = async (page, apiKey) => {
    const data = await context.http.get({ url: `https://dev.to/api/followers/users?page=${page}`, headers: {
      "Content-Type": [ "application/json" ],
      "api-key": [apiKey]
    } })
    .then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      const ejson_body = EJSON.parse(response.body.text());
      return ejson_body;
    });
    
    return data ? data.length : -1;
};

exports = async function () {

const axios = require('axios');


  let devtoCollection = context.services
    .get("mongodb-atlas")
    .db("followers_tracker")
    .collection("devto");

  const allDevtoUsers = devtoCollection.find({}).toArray();

  allDevtoUsers.forEach(async (devtoUser) => {

    let followersCount = 0;
    let i = 1;
      let value = await callDevtoApi(i, devtoUser.username);
      while(value >= 1) {
        followersCount += value;
        i++;
        value = await callDevtoApi(i, devtoUser.username);
      }
    
    const currentTimeStamp = new Date().toISOString();

    const newFollowers = [
      ...devtoUser.followers,
      { timestamp: currentTimeStamp, count: followersCount },
    ];

    const query = { email: devtoUser.email };
    const update = {
      $set: {
        followers: newFollowers,
      },
    };
    const options = { upsert: false };
    await devtoCollection.updateOne(query, update, options);
  });
};
