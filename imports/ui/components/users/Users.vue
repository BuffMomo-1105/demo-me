<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1 m-4"
    style="left: 150px !important; position: absolute; width: 85%"
    data-app
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
      <v-btn class="mr-2" @click="editItem(item)"> Edit </v-btn>
      <v-btn class="mr-2" @click="deleteItem(item)"> Delete </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import Organizations from "../../../api/collections/Organizations";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        Meteor.call("addUser", {
          userPermisson: this.role,
          user: this.editedItem,
          orgId: this.$route.params.org_id,
        });
      }
      this.close();
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
