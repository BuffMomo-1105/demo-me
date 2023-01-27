import { Meteor } from "meteor/meteor";
import Contacts from "../collections/Contacts";
import keela from "../services/keela";

Meteor.methods({
  createContact(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, name, email, gender, tags, orgId } = payload;
    keela.isAdmin(userPermisson);
    Contacts.insert(
      {
        org_id: orgId,
        name: name,
        email: email,
        gender: gender,
        tags: tags,
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
  updateContact(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, name, email, gender, tags, contactId } = payload;
    keela.isAdmin(userPermisson);
    let contact = Contacts.findOne({
      _id: contactId,
    });
    if (contact) {
      Contacts.update(
        { _id: contactId },
        {
          $set: {
            name: name,
            email: email,
            gender: gender,
            tags: tags,
          },
        }
      );
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
  deleteContact(payload) {
    keela.isLogin(this.userId);
    const { userPermisson, contactId } = payload;
    keela.isAdmin(userPermisson);
    let contact = Contacts.findOne({
      _id: contactId,
    });
    if (contact) {
      Contacts.remove({ _id: contactId });
    } else {
      throw new Meteor.Error("User Not FOund");
    }
  },
});
