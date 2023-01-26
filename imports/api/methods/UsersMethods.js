import { Meteor } from "meteor/meteor";
import Organizations from "../collections/Organizations";
import keela from "../services/keela";

Meteor.methods({
  'addUser'(payload) {
    keela.isLogin(this.userId);
    const {userPermisson, user, orgId}=payload;
    if (userPermisson == "Admin" || userPermisson == "KeelaAdmin") {
      Organizations.update({ _id: orgId }, { $push: { users: user } });
    } else {
      throw new Meteor.Error("Not Authorized.");
    }
  },
});
