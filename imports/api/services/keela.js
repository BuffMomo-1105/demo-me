import { Meteor } from "meteor/meteor";

const isLogin = (userId) => {
  if (!userId) {
    throw new Meteor.Error("Not authorized.");
  }
};

export default keela = { isLogin };
