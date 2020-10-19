const Reward = require("../models/Reward.model");

require("dotenv").config();

const addRewards = async (rewards) => {
  let rewardsIDs = [];
  console.log("made it");
  if(Array.isArray(rewards)){
    for (const item of rewards){
      console.log(item);
      const reward = new Reward({
        name: item.name,
        content: item.content,
      });
      const savedReward = await reward.save();
      rewardsIDs = rewardsIDs.concat(savedReward._id);
    }
    console.log("and out")
    return rewardsIDs;
  }
};

module.exports.addRewards = addRewards;
