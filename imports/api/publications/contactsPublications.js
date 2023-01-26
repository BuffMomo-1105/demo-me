import { Meteor } from 'meteor/meteor';
import Contacts from '../collections/Contacts';

Meteor.publish('contacts', function publishContacts() {
  return Contacts.find({ userId: this.userId });
});