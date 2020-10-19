const Reward = require("../models/Reward.model");

require("dotenv").config();

const addRewards = async (rewards) => {
  let rewardsIDs = [];
  if(Array.isArray(rewards)){
    for (const item of rewards){
      const reward = new Reward({
        name: item.name,
        content: item.content,
      });
      const savedReward = await reward.save();
      rewardsIDs = rewardsIDs.concat(savedReward._id);
    }
    return rewardsIDs;
  }
};

module.exports.addRewards = addRewards;
