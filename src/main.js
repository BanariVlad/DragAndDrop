import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.directive("draggable", {
  bind(el, binding, vNode) {
    let startX;
    let startY;
    let initialX;
    let initialY;
    let dragElement = el.querySelector(binding.arg);
    el.insertBefore(dragElement, el.firstChild);
    el.style.position = "absolute";
    el.style.top = binding.value.startPosition.y;
    el.style.left = binding.value.startPosition.x;

    const mouseMove = e => {
      let displayX = e.clientX - initialX;
      let displayY = e.clientY - initialY;
      let coordinates = {
        top: el.offsetTop - 10,
        right: el.offsetLeft + el.clientWidth + 10,
        bottom: el.offsetTop + el.clientHeight + 10,
        left: el.offsetLeft - 10,
        windowHeight: document.documentElement.clientHeight,
        windowWidth: document.documentElement.clientWidth
      };
      let outsideBorder = checkIfOutside(coordinates);

      switch (outsideBorder) {
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
          allowMoveForTopRight(displayX, displayY);
          break;
        case "rightBottom":
          allowMoveForRightBottom(displayX, displayY);
          break;
        case "bottomLeft":
          allowMoveForBottomLeft(displayX, displayY);
          break;
        case "leftTop":
          allowMoveForLeftTop(displayX, displayY);
          break;
        default:
          move(displayX, displayY);
          break;
      }
      fixIfOutside(coordinates);
    };

    const checkIfOutside = coordinates => {
      if (
        coordinates.top <= 0 &&
        coordinates.right >= coordinates.windowWidth
      ) {
        return "topRight";
      } else if (
        coordinates.right >= coordinates.windowWidth &&
        coordinates.bottom >= coordinates.windowHeight
      ) {
        return "rightBottom";
      } else if (
        coordinates.bottom >= coordinates.windowHeight &&
        coordinates.left <= 0
      ) {
        return "bottomLeft";
      } else if (coordinates.left <= 0 && coordinates.top <= 0) {
        return "leftTop";
      } else if (coordinates.top <= 0) {
        return "top";
      } else if (coordinates.right >= coordinates.windowWidth) {
        return "right";
      } else if (coordinates.bottom >= coordinates.windowHeight) {
        return "bottom";
      } else if (coordinates.left <= 0) {
        return "left";
      }
    };

    const fixIfOutside = coordinates => {
      if (coordinates.top < 0) {
        el.style.top = "10px";
      } else if (coordinates.right > coordinates.windowWidth) {
        el.style.left = coordinates.windowWidth - el.clientWidth - 10 + "px";
      } else if (coordinates.bottom > coordinates.windowHeight) {
        el.style.top = coordinates.windowHeight - el.clientHeight - 10 + "px";
      } else if (coordinates.left < 0) {
        el.style.left = "10px";
      }
    };

    const move = (displayX, displayY) => {
      el.style.top = startY + displayY + "px";
      el.style.left = startX + displayX + "px";
    };

    const lockMoveToTop = (displayX, displayY) => {
      if (displayY > 0) {
        el.style.top = startY + displayY + "px";
      }
      el.style.left = startX + displayX + "px";
    };

    const lockMoveToRight = (displayX, displayY) => {
      if (displayX < 0) {
        el.style.left = startX + displayX + "px";
      }
      el.style.top = startY + displayY + "px";
    };

    const lockMoveToBottom = (displayX, displayY) => {
      if (displayY < 0) {
        el.style.top = startY + displayY + "px";
      }
      el.style.left = startX + displayX + "px";
    };

    const lockMoveToLeft = (displayX, displayY) => {
      if (displayX > 0) {
        el.style.left = startX + displayX + "px";
      }
      el.style.top = startY + displayY + "px";
    };

    const allowMoveForTopRight = (displayX, displayY) => {
      if (displayX < 0 || displayY > 0) {
        move(displayX, displayY);
      }
    };

    const allowMoveForRightBottom = (displayX, displayY) => {
      if (displayX < 0 || displayY < 0) {
        move(displayX, displayY);
      }
    };

    const allowMoveForBottomLeft = (displayX, displayY) => {
      if (displayX > 0 || displayY < 0) {
        move(displayX, displayY);
      }
    };

    const allowMoveForLeftTop = (displayX, displayY) => {
      if (displayX > 0 || displayY > 0) {
        move(displayX, displayY);
      }
    };

    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      emit(vNode, "drop", {
        x: el.style.left,
        y: el.style.top
      });
    };

    const emit = (vnode, name, data) => {
      const handlers =
        (vnode.data && vnode.data.on) ||
        (vnode.componentOptions && vnode.componentOptions.listeners);

      if (handlers && handlers[name]) {
        handlers[name].fns(data);
      }
    };

    dragElement.addEventListener("mousedown", e => {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialX = e.clientX;
      initialY = e.clientY;
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
