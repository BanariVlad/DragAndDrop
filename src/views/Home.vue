<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      v-draggable:#toolbar="{ startPosition }"
      msg="Welcome to Your Vue.js App"
      @drop="savePosition($event)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: {
    startPosition() {
      return JSON.parse(localStorage.getItem("blockPositions"));
    }
  },
  methods: {
    savePosition(blockPosition) {
      localStorage.setItem("blockPositions", JSON.stringify(blockPosition));
    }
  }
};
</script>
