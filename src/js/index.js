import '../sass/main.scss';
import countryCardTpl from '../partials/countryCard.hbs';
import countriesListTpl from '../partials/countriesList.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const refs = {
  searchInput: document.querySelector('#search'),
  countriesWrapper: document.querySelector('.countries-wrapper'),
};

refs.searchInput.addEventListener('input', debounce(searchCountriesByName, 500));

function searchCountriesByName(evt) {
  const searchCountry = evt.target.value.trim();

  fetchCountries(searchCountry)
    .then(initializeCountriesTemplate)
    .catch(showError('Something went wrong. Please try again.'));
}

function initializeCountriesTemplate(countries) {
  if (countries.length > 10) {
    showError('You should make the request more specific');
    console.log('more 10');
  } else if (countries.length > 1 && countries.length <= 10) {
    renderCountriesList(countries);
  } else if (countries.length === 1) {
    renderCountryCard(countries[0]);
  } else {
    showError('There is no country with that name.');
  }
}

function renderCountryCard(country) {
  refs.countriesWrapper.innerHTML = countryCardTpl(country);
}

function renderCountriesList(countries) {
  refs.countriesWrapper.innerHTML = countriesListTpl(countries);
}

function clearCountryWrapper() {
  refs.countriesWrapper.innerHTML = '';
}

function showError(msg) {
  error({
    text: msg,
    delay: 1000,
    sticker: false,
    closer: false,
    icons: 'brighttheme',
    animation: 'fade',
    animateSpeed: 'slow',
  });
  clearCountryWrapper();
}
