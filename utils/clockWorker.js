let seconds = 0;
let intervalId = null;

onmessage = function (e) {
  switch (e.data) {
    case "start":
      if (!intervalId) {
        intervalId = setInterval(() => {
          seconds += 1;
          postMessage(seconds);
        }, 1000);
      }
      break;
    case "stop":
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      break;
    case "reset":
      seconds = 0;
      postMessage(seconds);
      break;
    default:
      break;
  }
};
