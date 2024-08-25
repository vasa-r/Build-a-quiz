const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num;
  }
};

const shrinkName = (str) => {
  if (str.length > 10) {
    return str.slice(0, 10) + "...";
  }
  return str;
};

export { formatNumber, shrinkName };
