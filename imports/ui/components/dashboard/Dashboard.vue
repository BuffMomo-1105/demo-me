<template>
  <div>
    <v-row justify="center" data-app>
      <!-- Add Org section -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Create an Organization</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Organization Name*"
                    required
                    v-model="form.org_name"
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="createOrganization">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Add Org section -->
    </v-row>
    <div v-if="this.$subReady.organizations && organizations.length > 0" class="flex flex-wrap justify-center mt-12 " >
      <v-card
        elevation="2"
        shaped
        max-width="400"
        class="m-4"
        v-for="org in organizations"
        :key="org._id"
      >
        <v-card-title>{{ org.name }}</v-card-title>
        <v-card-actions>
          <v-btn text><router-link :to="`/organization/${org._id}/dashboard`">Visit</router-link>  </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import { Meteor } from "meteor/meteor";
import Organizations from "../../../api/collections/Organizations";
export default {
  data: () => ({
    dialog: false,
    form: {
      org_name: "",
    },
    rules: [(v) => !!v || "Name is required"],
  }),
  methods: {
    createOrganization() {
      Meteor.call("createOrganization", this.form.org_name);
      this.dialog = false;
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
      contacts: [],
    },
    organizations() {
      return Organizations.find({}, { sort: { createdAt: -1 } }).fetch();
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>
