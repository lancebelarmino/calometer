import toSort from './toSort';

export default function getRecentItems(arr) {
  let recentlyAddedItems = [];

  for (let i = 0; recentlyAddedItems.length < 5 && arr[i] !== undefined; i++) {
    if (arr[i] !== undefined && arr[i].board_items !== undefined) {
      arr[i].board_items.forEach((item) => {
        if (recentlyAddedItems.length < 5) {
          recentlyAddedItems.push(item);
        }
      });
    }
  }

  const sortedItems = toSort(recentlyAddedItems, 'recent');

  return sortedItems;
}
