<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    class="navi-bar"
    hide-overlay
    permanent
  >
    <v-divider></v-divider>

    <v-list dense>
      <span v-for="item in items" :key="item.title">
        <router-link :to="`/organization/${$route.params.org_id}/${item.link}`">
          <v-list-item
            link
            :class="{ activeNav: $route.path.includes(item.link) }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </span>
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
.activeNav {
  background: #d7d7d7;
}
</style>
