<template>
  <div class="org-dashboard">
    <h1 class="text-center text-5xl mt-6">
      Welcome to {{ organization.name }}
    </h1>
  </div>
</template>
<script>
import Organizations from "../../../api/collections/Organizations";
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Users", link: "users" },
        { title: "Contacts", link: "contacts" },
        { title: "Tags", link: "tags" },
      ],
    };
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
  },
};
</script>
<style>
.org-dashboard {
  left: 150px;
  position: relative;
}
</style>
