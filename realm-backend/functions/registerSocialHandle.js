exports = async function(arg){
  // create new strings in user collection
    let usersCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection('users');
    let foundUser = usersCollection.findOne({email:arg.email});
    let currentSocials = foundUser.socials;
    
    const newSocials = [...currentSocials, arg.social]
    
    const query = { email: arg.email };
    const update = {
      $set: {
        socials: newSocials,
      },
    };
    const options = { upsert: false };
  if(!currentSocials.includes(arg.social)) {
     await usersCollection.updateOne(query, update, options);
  
    // add the data to the collection
    let socialCollection = context.services.get("mongodb-atlas").db("followers_tracker").collection(arg.social);
    const { social, ...socialData } = arg;
  
  
    await socialCollection.insertOne(socialData)
  }
   

};