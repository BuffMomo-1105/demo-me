<template>
  <div class="mt-4 ml-4" style="position: absolute; left: 150px" data-app>
    <template>
      <div class="text-center">
        <v-dialog
          v-model="openAddModal"
          width="500"
          v-if="role == 'KeelaAdmin' || role == 'Admin'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              Add Contact
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{isEdit?'Edit Contact':'Add Contact'}}
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="form.name"
                      :rules="[(v) => !!v || 'Name is required']"
                      label="Name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="form.email"
                      :rules="[(v) => !!v || 'Email is required']"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="form.gender"
                      :items="['Male', 'Female', 'Others']"
                      :rules="[(v) => !!v || 'Gender is required']"
                      label="Gender"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="form.tags"
                      :items="tags"
                      label="Tags"
                      item-text="name"
                      return-object
                      multiple
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="addContact">  {{isEdit?'Edit':'Add'}} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Gender</th>
            <th class="text-left">Tags</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody v-if="contacts && contacts.length > 0">
          <tr v-for="item in contacts" :key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <div v-if="item.tags.length > 0">
                <p v-for="tag in item.tags" :key="tag._id">{{ tag.name }}</p>
              </div>
              <div v-else>-</div>
            </td>
            <td>
              <div v-if="role == 'KeelaAdmin' || role == 'Admin'">
                <v-btn @click="openEditModal(item)">Edit</v-btn>
                <v-btn @click="confirmDelete(item._id)">Delete</v-btn>
              </div>
              <div v-else>-</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteContact">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Contacts from "../../../api/collections/Contacts";
import Organizations from "../../../api/collections/Organizations";
import Tags from "../../../api/collections/Tags";
export default {
  data: () => ({
    openAddModal: false,
    dialogDelete: false,
    form: {
      name: "",
      email: "",
      gender: "",
      tags: [],
    },
    contact_id: "",
    contact: "",
    isEdit: false,
  }),
  methods: {
    addContact() {
      if (this.isEdit) {
        Meteor.call("updateContact", {
          ...this.form,
          userPermisson: this.role,
          contactId: this.contact._id,
        });
      } else {
        Meteor.call("createContact", {
          ...this.form,
          orgId: this.$route.params.org_id,
          userPermisson: this.role,
        });
      }
      this.openAddModal = false;
      this.isEdit = false;
      this.form = { name: "", email: "", gender: "", tags: [] };
    },
    confirmDelete(id) {
      this.contact_id = id;
      this.dialogDelete = true;
    },
    deleteContact() {
      Meteor.call("deleteContact", {
        userPermisson: this.role,
        contactId: this.contact_id,
      });
      this.dialogDelete = false;
    },
    openEditModal(item) {
      this.contact = item;
      this.isEdit = true;
      this.openAddModal = true;
      this.form = { ...this.contact };
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
      contacts: [],
      tags: [],
    },
    organization() {
      return Organizations.findOne({
        _id: this.$route.params.org_id,
      });
    },
    contacts() {
      return Contacts.find(
        { org_id: this.$route.params.org_id },
        { sort: { createdAt: -1 } }
      ).fetch();
    },
    tags() {
      return Tags.find(
        { org_id: this.$route.params.org_id },
        { sort: { createdAt: -1 } }
      ).fetch();
      // return tags.map((item) => (item['value'] = item));
    },
    role() {
      if (this.$subReady.organizations) {
        let users = this.organization.users;
        currentUserEmail = Meteor.user().emails[0].address;
        return users.find((user) => user.email == currentUserEmail).role;
      }
    },
  },
};
</script>
