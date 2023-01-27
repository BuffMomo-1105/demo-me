<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1 m-4"
    style="left: 150px !important; position: absolute; width: 85%; text-align: center !important;"
    data-app
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Add user -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
          v-if="role == 'KeelaAdmin' || role == 'Admin'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="[(v) => !!v || 'Name is required']"
                      label="Name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      :rules="[(v) => !!v || 'Email is required']"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.gender"
                      :items="['Male', 'Female', 'Others']"
                      :rules="[(v) => !!v || 'Gender is required']"
                      label="Gender"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.role"
                      :items="['Admin', 'Coordinator']"
                      :rules="[(v) => !!v || 'Role is required']"
                      label="Role"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Add user -->
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Role</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.role"
                      :items="['Admin', 'Coordinator']"
                      :rules="[(v) => !!v || 'Role is required']"
                      label="Role"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="edit"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <div v-if="role == 'KeelaAdmin' || role == 'Admin'">
        <v-btn class="mr-2" @click="editItem(item)"> Edit </v-btn>
        <v-btn class="mr-2" @click="deleteItem(item)"> Delete </v-btn>
      </div>
      <div v-else>-</div>
    </template>
  </v-data-table>
</template>
<script>
import Organizations from "../../../api/collections/Organizations";
export default {
  data: () => ({
    dialog: false,
    editDialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      gender: "",
      email: "",
      role: "",
    },
    defaultItem: {
      name: "",
      gender: "",
      email: "",
      role: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User" : "Edit User";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.editDialog=false;
      this.editedItem=this.defaultItem;
    },

    closeDelete() {
      Meteor.call("deleteUser", {
        userPermisson: this.role,
        user: this.editedItem,
        orgId: this.$route.params.org_id,
      });
      this.dialogDelete = false;
    },

    save() {
      Meteor.call("addUser", {
        userPermisson: this.role,
        user: this.editedItem,
        orgId: this.$route.params.org_id,
      });
      this.close();

    },
    edit() {
      Meteor.call("updateUser", {
        userPermisson: this.role,
        user: this.editedItem,
        orgId: this.$route.params.org_id,
      });
      this.editDialog=false;
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
    },
    organization() {
      return Organizations.findOne({
        _id: this.$route.params.org_id,
      });
    },
    role() {
      if (this.$subReady.organizations) {
        let users = this.organization.users;
        currentUserEmail = Meteor.user().emails[0].address;
        return users.find((user) => user.email == currentUserEmail).role;
      }
    },
    users() {
      currentUserEmail = Meteor.user().emails[0].address;
      return this.$subReady.organizations &&
        this.organization.users &&
        this.organization.users.length > 0
        ? this.organization.users.filter(
            (user) => user.email != currentUserEmail
          )
        : [];
    },
  },
};
</script>
