<template>
  <div>
    <button @click="increment">Click Me</button>
    <p class="mt-4">You've pressed the button {{counter}} times.</p>
    <h1 class="text-3xl font-bold underline">
      Hello world!
</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    increment() {
      this.counter += 1
    }
  },
}
</script>

<style scoped>
  p {
    font-family: serif;
  }
</style>
