const pluralize = (count, singular, plural) => {
  return count > 1 ? plural : singular;
};
export default pluralize;
