import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.directive("draggable", {
  bind(el) {
    let startX;
    let startY;
    let initialX;
    let initialY;
    let dragElement = document.createElement("h2");
    dragElement.style.cursor = "move";
    dragElement.innerText = "Drag me to move!";
    el.insertBefore(dragElement, el.firstChild);
    el.style.position = "absolute";

    const mouseMove = (e) => {
      let displayX = e.clientX - initialX;
      let displayY = e.clientY - initialY;
      el.style.top = startY + displayY + "px";
      el.style.left = startX + displayX + "px";
    }

    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }

    dragElement.addEventListener("mousedown", function (e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialX = e.clientX;
      initialY = e.clientY;
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    });
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
