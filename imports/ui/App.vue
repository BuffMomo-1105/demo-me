<template>
  <div>
    <NavBar/>
    <NavSide v-if="$route.params.org_id"/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/nav/nav-bar.vue';
import NavSide from './components/nav/nav-side.vue';
export default {
  components: {
    NavBar,NavSide
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 0;
    margin: 0 ;
}
</style>
<style src="./assets/tailwind.css"></style>