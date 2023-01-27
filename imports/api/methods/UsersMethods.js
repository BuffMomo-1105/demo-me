import { Meteor } from "meteor/meteor";
import Organizations from "../collections/Organizations";
import keela from "../services/keela";

const getUser = (user, orgId) => {
  let users = Organizations.findOne({
    _id: orgId,
  }).users;
  const validUser = users.filter((item) => item.email == user.email);
  return validUser;
};

Meteor.methods({
  addUser(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, user, orgId } = payload;
    keela.isAdmin(userPermisson);
    const validUser = getUser(user, orgId);
    if (validUser && validUser.length > 0) {
      throw new Meteor.Error("User Exists");
    } else {
      Organizations.update({ _id: orgId }, { $push: { users: user } });
    }
  },
  updateUser(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, user, orgId } = payload;
    keela.isAdmin(userPermisson);
    const validUser = getUser(user, orgId);
    if (validUser && validUser.length > 0) {
      Organizations.update(
        { _id: orgId, "users.email": user.email },
        { $set: { "users.$.role": user.role } }
      );
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
  deleteUser(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, user, orgId } = payload;
    keela.isAdmin(userPermisson);
    const validUser = getUser(user, orgId);
    if (validUser && validUser.length > 0) {
      Organizations.update(
        { _id: orgId },
        { $pull: { users: { email: user.email } } },
        false, // Upsert
        true // Multi
      );
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
});
