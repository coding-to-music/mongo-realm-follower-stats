exports = async function(arg){
  let socialCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection(arg.social);
 
  return await socialCollection.findOne({email:arg.email});
};