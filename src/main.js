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
    dragElement.style.width = "100%";
    dragElement.style.height = "20px";
    dragElement.style.background = "#aeaeae";
    el.insertBefore(dragElement, el.firstChild);
    el.style.position = "absolute";

    const mouseMove = (e) => {
      let displayX = e.clientX - initialX;
      let displayY = e.clientY - initialY;
      let offsetBottom = el.offsetTop + el.clientHeight;
      let offsetRight = el.offsetLeft + el.clientWidth + 10;
      let windowHeight = document.documentElement.clientHeight;
      let windowWidth = document.documentElement.clientWidth;

      if (el.offsetTop <= 0 && el.offsetLeft <= 0) {
        if (displayX > 0 || displayY > 0) {
          el.style.top = startY + displayY + "px";
          el.style.left = startX + displayX + "px";
        }
      } else if (el.offsetLeft <= 0 && offsetBottom >= windowHeight) {
        if (displayX > 0 || displayY < 0) {
          el.style.top = startY + displayY + "px";
          el.style.left = startX + displayX + "px";
        }
      } else if (offsetBottom >= windowHeight && offsetRight >= windowWidth) {
        if (displayX < 0 || displayY < 0) {
          el.style.top = startY + displayY + "px";
          el.style.left = startX + displayX + "px";
        }
      } else if (el.offsetTop <= 0 && offsetRight >= windowWidth) {
        if (displayX < 0 || displayY > 0) {
          el.style.top = startY + displayY + "px";
          el.style.left = startX + displayX + "px";
        }
      } else if (el.offsetTop <= 0) {
        if (displayY > 0) {
          el.style.top = startY + displayY + "px";
        }
        el.style.left = startX + displayX + "px";
      } else if (el.offsetLeft <= 0) {
        if (displayX > 0) {
          el.style.left = startX + displayX + "px";
        }
        el.style.top = startY + displayY + "px";
      } else if (offsetBottom >= windowHeight) {
        if (displayY < 0) {
          el.style.top = startY + displayY + "px";
        }
        el.style.left = startX + displayX + "px";
      } else if (offsetRight >= windowWidth) {
        if (displayX < 0) {
          el.style.left = startX + displayX + "px";
        }
        el.style.top = startY + displayY + "px";
      } else {
        el.style.top = startY + displayY + "px";
        el.style.left = startX + displayX + "px";
      }
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
