<template>
  <div class="hello">
    <div id="toolbar"></div>
    <div>Content</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#toolbar {
  height: 1em;
  background: #ff0000;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  width: 500px;
  height: 300px;
  border: 1px solid red;
}
</style>
