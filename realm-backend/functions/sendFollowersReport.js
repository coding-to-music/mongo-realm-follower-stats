exports = function () {
  const axios = require("axios");
  let usersCollection = context.services
    .get("mongodb-atlas")
    .db("followers_tracker")
    .collection("users");

  const allUsers = usersCollection.find({}).toArray();

  // for each user, find the social handles they have
  // Get the current followers count by quering each social media collection
  // Get the last week's followers count by quering each social media collection
  // If not present last week's data, then take the last available data
  // Calculate the difference between the current and last week's followers count
  // Send an email to the user with the current followers count and the difference

  allUsers.forEach(async (user) => {
    const socialMedia = user.socials; // array: ["github", "twitter"]
    let finalData = {};
    socialMedia.forEach((sm) => {
      let socialCollection = context.services
        .get("mongodb-atlas")
        .db("followers_tracker")
        .collection(sm);
      const foundData = socialCollection.findOne({ email: user.email });
      const followersData = foundData.followers;
      const currentFollowers = followersData[followersData.length - 1].count;
      let lastWeekFollowers = 0;
      if (followersData.length >= 8) {
        lastWeekFollowers = followersData[followersData.length - 8].count;
      } else {
        lastWeekFollowers = followersData[0].count;
      }
      const difference = currentFollowers - lastWeekFollowers;
      finalData[sm] = {
        username: foundData.username,
        totalFollowers: currentFollowers,
        changeFollowers: difference,
      };
    });

    // Email sending logic:
    const body = {
      from: {
        email: "hey@followstats.soumya.dev",
      },
      personalizations: [
        {
          to: [
            {
              email: user.email,
            },
          ],
          dynamic_template_data: {
            name: user.name,
            twitter: finalData.twitter,
            github: finalData.github,
            youtube: finalData.youtube,
            devto: finalData.devto,
          },
        },
      ],
      template_id: "d-07d8ac1b1bce4d4aa4d1ed476d75a830",
    };
    const headers = {
      Authorization: "Bearer <SENDGRID_API_KEY>",
      "Content-Type": "application/json",
    };
    // Sending email below
    await axios.post("https://api.sendgrid.com/v3/mail/send", body, {
      headers,
    });
  });
};
