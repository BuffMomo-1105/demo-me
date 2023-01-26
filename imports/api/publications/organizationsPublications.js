import { Meteor } from "meteor/meteor";
import Organizations from "../collections/Organizations";

Meteor.publish("organizations", function () {
  const currentUser = Meteor.users.findOne(this.userId);
  return Organizations.find({
    users: { $elemMatch: { email: currentUser.emails[0].address } },
  });
});
