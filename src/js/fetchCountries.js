export default name => {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`,
  )
    .then(res => {
      if (res.ok) res.json();
      return new Error(res.statusText);
    })
    .catch(err => console.log(err));
};
