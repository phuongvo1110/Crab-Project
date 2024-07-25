const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
    zoom: 0.9,
  },
  animate: () => ({
    opacity: 1,
    y: 0,
    zoom: 1,
    transition: { delay: 0.2 },
  }),
};

export default fadeIn;
