import { Meteor } from "meteor/meteor";

const isLogin = (userId) => {
  if (!userId) {
    throw new Meteor.Error("Not authorized.");
  }
};
const isAdmin = (role) => {
  if (role == "Admin" || role == "KeelaAdmin") {
    return true;
  } else {
    throw new Meteor.Error("Not Authorized.");
  }
};

export default keela = { isLogin, isAdmin};
