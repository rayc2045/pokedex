export default {
  async fetchData(api) {
    return await fetch(api).then(res => res.json());
  },
  firstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  getNextItem(arr, currentItem) {
    if (currentItem === arr.at(-1)) return arr[0];
    return arr[arr.indexOf(currentItem) + 1];
  },
  getProgress(numerator, denominator) {
    return `${((numerator / denominator) * 100).toFixed()}%`;
  },
};