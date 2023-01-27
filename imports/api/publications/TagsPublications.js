import { Meteor } from "meteor/meteor";
import Tags from "../collections/Tags";

Meteor.publish("tags", function publishTags() {
  return Tags.find({});
});
