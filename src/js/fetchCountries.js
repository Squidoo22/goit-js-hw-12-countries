export default name => {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`,
  )
    .then(res => {
      return res.json();
    })
    .catch(err => {
      throw new Error(err.message);
    });
};
