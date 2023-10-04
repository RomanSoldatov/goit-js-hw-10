import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '#single',
// });

const breedList = document.querySelector('.breed-select');
const catInfoBox = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const body = document.querySelector('body');

catInfoBox.style.display = 'flex';
catInfoBox.style.gap = '50px';
catInfoBox.style.color = 'white';
body.style.background =
  'radial-gradient( circle 610px at 5.2% 51.6%,  rgba(5,8,114,1) 0%, rgba(7,3,53,1) 97.5% )';

showLoader();

document.addEventListener('DOMContentLoaded', BreedsSearch);
function BreedsSearch() {
  fetchBreeds()
    .then(data => {
      breedList.innerHTML = BreedsListMarkup(data);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      catInfoBox.innerHTML = '';
    });
}

function BreedsListMarkup(arr) {
  hideLoader();
  return arr
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
}

breedList.addEventListener('change', OnSelectSet);
function OnSelectSet(event) {
  showLoader();
  fetchCatByBreed(event.target.value)
    .then(data => {
      hideLoader();
      catInfoBox.innerHTML = `
        <img src="${data[0].url}" width="400px" alt="${data[0].breeds[0].name}" />
        <div>
        <h2>${data[0].breeds[0].name}</h2>
        <p>Description: ${data[0].breeds[0].description}</p>
        <p>Temperament: ${data[0].breeds[0].temperament}</p>
        </div>
        `;
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      catInfoBox.innerHTML = '';
    });
}
function showLoader() {
  loader.style.visibility = 'visible';
  breedList.style.visibility = 'hidden';
  catInfoBox.style.visibility = 'hidden';
  error.style.visibility = 'hidden';
}

function hideLoader() {
  loader.style.visibility = 'hidden';
  breedList.style.visibility = 'visible';
  catInfoBox.style.visibility = 'visible';
}
