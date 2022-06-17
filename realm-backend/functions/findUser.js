exports = function (arg) {
  let usersCollection = context.services
    .get("mongodb-atlas")
    .db("mongo-realm-follower-stats")
    .collection("users");

  return usersCollection.findOne({ email: arg });
};
