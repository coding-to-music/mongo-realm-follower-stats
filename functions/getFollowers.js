exports = async function (arg) {
  let socialCollection = context.services
    .get("mongodb-atlas")
    .db("mongo-realm-follower-stats")
    .collection(arg.social);

  return await socialCollection.findOne({ email: arg.email });
};
