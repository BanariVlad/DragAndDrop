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

    const move = (displayX, displayY) => {
      el.style.top = startY + displayY + "px";
      el.style.left = startX + displayX + "px";
    }

    const lockMoveToTop = (displayX, displayY) => {
      if (displayY > 0) {
        el.style.top = startY + displayY + "px";
      }
      el.style.left = startX + displayX + "px";
    }

    const lockMoveToRight = (displayX, displayY) => {
      if (displayX < 0) {
        el.style.left = startX + displayX + "px";
      }
      el.style.top = startY + displayY + "px";
    }

    const lockMoveToBottom = (displayX, displayY) => {
      if (displayY < 0) {
        el.style.top = startY + displayY + "px";
      }
      el.style.left = startX + displayX + "px";
    }

    const lockMoveToLeft = (displayX, displayY) => {
      if (displayX > 0) {
        el.style.left = startX + displayX + "px";
      }
      el.style.top = startY + displayY + "px";
    }

    const checkPassed = (coordinates) => {
      if (coordinates.top <= 0 && coordinates.right >= coordinates.windowWidth) {
        return "topRight"
      } else if (coordinates.right >= coordinates.windowWidth && coordinates.bottom >= coordinates.windowHeight) {
        return "rightBottom"
      } else if (coordinates.bottom >= coordinates.windowHeight && coordinates.left <= 0) {
        return "bottomLeft"
      } else if (coordinates.left <= 0 && coordinates.top <= 0) {
        return "leftTop"
      } else if (coordinates.top <= 0) {
        return "top";
      } else if (coordinates.right >= coordinates.windowWidth) {
        return "right"
      } else if (coordinates.bottom >= coordinates.windowHeight) {
        return "bottom"
      } else if (coordinates.left <= 0) {
        return "left"
      }
    }

    const fixIfPassed = (coordinates) => {
      if (coordinates.top + 10 < 10) {
        el.style.top = "10px"
      } else if (coordinates.right > coordinates.windowWidth) {
        el.style.left = coordinates.windowWidth - el.clientWidth - 10 + "px"
      } else if (coordinates.bottom > coordinates.windowHeight) {
        el.style.top = coordinates.windowHeight - el.clientHeight - 10 + "px"
      } else if (coordinates.left < 0) {
        el.style.left = "10px"
      }
    }

    const mouseMove = (e) => {
      let displayX = e.clientX - initialX;
      let displayY = e.clientY - initialY;
      let coordinates = {
        top: el.offsetTop - 10,
        right: el.offsetLeft + el.clientWidth + 10,
        bottom: el.offsetTop + el.clientHeight + 10,
        left: el.offsetLeft - 10,
        windowHeight: document.documentElement.clientHeight,
        windowWidth: document.documentElement.clientWidth
      }
      let passedBorder = checkPassed(coordinates);

      switch (passedBorder) {
        case "top":
          lockMoveToTop(displayX, displayY);
          break;
        case "right":
          lockMoveToRight(displayX, displayY);
          break;
        case "bottom":
          lockMoveToBottom(displayX, displayY);
          break;
        case "left":
          lockMoveToLeft(displayX, displayY);
          break;
        case "topRight":
          if (displayX < 0 || displayY > 0) {
            move(displayX, displayY);
          }
          break;
        case "rightBottom":
          if (displayX < 0 || displayY < 0) {
            move(displayX, displayY);
          }
          break;
        case "bottomLeft":
          if (displayX > 0 || displayY < 0) {
            move(displayX, displayY);
          }
          break;
        case "leftTop":
          if (displayX > 0 || displayY > 0) {
            move(displayX, displayY);
          }
          break;
        default:
          move(displayX, displayY);
          break;
      }
      fixIfPassed(coordinates);
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
