<template>
  <v-navigation-drawer v-model="drawer" absolute class="navi-bar">
    <!-- <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
  
        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <router-link :to="`/organization/${$route.params.org_id}/${item.link}`">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
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
};
</script>
<style>
.v-overlay__scrim {
  opacity: 1 !important;
  background: transparent !important;
}
.navi-bar {
  top: 56px !important;
  width: 150px !important;
}
</style>
