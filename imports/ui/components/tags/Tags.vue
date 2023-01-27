<template>
  <div class="mt-4 ml-4" style="position: absolute; left: 150px" data-app>
    <template>
      <div class="text-center">
        <v-dialog v-model="openAddModal" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              Add Tag
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{isEdit?'Edit Tag':'Add Tag'}}
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
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="addContact">  {{isEdit?'Edit ':'Add '}} </v-btn>
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
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody v-if="tags && tags.length > 0">
          <tr v-for="item in tags" :key="item._id">
            <td>{{ item.name }}</td>
            <td>
              <v-btn @click="openEditModal(item)">Edit</v-btn>
              <v-btn @click="confirmDelete(item._id)">Delete</v-btn>
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
          <v-btn color="blue darken-1" text @click="deleteTag">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Tags from "../../../api/collections/Tags";
import Organizations from "../../../api/collections/Organizations";
export default {
  data: () => ({
    openAddModal: false,
    dialogDelete: false,
    form: {
      name: "",
    },
    tag_id: "",
    tag: "",
    isEdit: false,
  }),
  methods: {
    addContact() {
      if (this.isEdit) {
        Meteor.call("updateTag", {
          ...this.form,
          userPermisson: this.role,
        });
      } else {
        Meteor.call("createTag", {
          ...this.form,
          orgId: this.$route.params.org_id,
          userPermisson: this.role,
        });
      }
      this.openAddModal = false;
      this.isEdit = false;
      this.form = { name: "" };
    },
    confirmDelete(id) {
      this.tag_id = id;
      this.dialogDelete = true;
    },
    deleteTag() {
      Meteor.call("deleteTag", {
        userPermisson: this.role,
        tagId: this.tag_id,
      });
      this.dialogDelete = false;
    },
    openEditModal(item) {
      this.tag = item;
      this.isEdit = true;
      this.openAddModal = true;
      this.form = { ...this.tag };
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
      tags: [],
    },
    organization() {
      return Organizations.findOne({
        _id: this.$route.params.org_id,
      });
    },
    tags() {
      return Tags.find(
        { org_id: this.$route.params.org_id },
        { sort: { createdAt: -1 } }
      ).fetch();
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
