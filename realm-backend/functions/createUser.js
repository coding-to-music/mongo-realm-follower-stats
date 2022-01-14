exports = async function(arg){
  // only create new user in the users collection
  let usersCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection("users");
  
 await usersCollection.insertOne(arg)
};