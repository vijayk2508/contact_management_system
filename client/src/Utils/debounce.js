const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    // const args = arguments; We can use this also it is feature of ES6 then no need to pass ...args in the function
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
