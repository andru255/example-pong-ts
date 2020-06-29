const Easing = {
  linear: (
    time: number,
    begin: number,
    change: number,
    duration: number
  ): number => {
    return change * (time / duration) + begin;
  },
};
export default Easing;
