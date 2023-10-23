export const scrollTo = (x, y, behavior = 'smooth') => {
  window.scroll({
    top: y,
    left: x,
    behavior: behavior,
  });
};
