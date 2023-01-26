<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="#">My App</a>
    </div>
    <div class="navbar-menu">
      <ul>
        <li @click="logout">Logout</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "NavBar",
  data() {
    return {
      links: [
        { id: 1, name: "Home", url: "#" },
        { id: 2, name: "About", url: "#about" },
        { id: 3, name: "Contact", url: "#contact" },
      ],
    };
  },
  methods:{
    logout(){
      Meteor.logout();
    }
  },
  computed: {
    username() {
        return Meteor.user() ? Meteor.user().emails[0].address :'';
    }
}
};
</script>

<style scoped>
.navbar {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
}

.navbar-menu ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar-menu ul li {
  margin-right: 20px;
}

.navbar-menu ul li a {
  color: #333;
  text-decoration: none;
  font-size: 1.2em;
}

.navbar-menu ul li a:hover {
  color: #007bff;
}
</style>
