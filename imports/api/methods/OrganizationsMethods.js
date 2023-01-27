import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Organization from "../collections/Organizations";
import keela from "../services/keela";

Meteor.methods({
  createOrganization(name) {
    check(name, String);
    keela.isLogin(this.userId);
    const currentUser = Meteor.users.findOne(this.userId);
    Organization.insert(
      {
        name: name,
        users: [
          {
            userId: this.userId,
            role: "KeelaAdmin",
            email: currentUser.emails[0].address,
            name: currentUser.emails[0].address,
          },
        ],
        createdAt: new Date(),
      },
      function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
  },
});
