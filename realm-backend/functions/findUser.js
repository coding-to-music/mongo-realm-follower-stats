exports = function(arg){
  let usersCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection("users");
 
  return usersCollection.findOne({email:arg});
};