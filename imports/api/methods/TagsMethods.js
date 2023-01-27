import { Meteor } from "meteor/meteor";
import Tags from "../collections/Tags";
import keela from "../services/keela";

Meteor.methods({
  createTag(payload) {
    keela.isLogin(this.userId);
    const { name, orgId } = payload;
    Tags.insert(
      {
        org_id: orgId,
        name: name,
        createdAt: new Date(),
        createdBy: this.userId,
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
  updateTag(payload) {
    keela.isLogin(this.userId);
    const { name, _id } = payload;
    let Tag = Tags.findOne({
      _id: _id,
    });
    if (Tag) {
      Tags.update(
        { _id: _id },
        {
          $set: {
            name: name,
          },
        }
      );
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
  deleteTag(payload) {
    keela.isLogin(this.userId);
    const { tagId } = payload;
    let Tag = Tags.findOne({
      _id: tagId,
    });
    console.log(Tag)
    if (Tag) {
      Tags.remove({ _id: tagId });
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
});
