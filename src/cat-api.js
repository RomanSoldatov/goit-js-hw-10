const BASE_URL = 'https://api.thecatapi.com';
const BREEDS_EP = 'v1/breeds';
const CATS_EP = 'v1/images/search';

const option = {
  headers: {
    'x-api-key':
      'live_v9q8Ffz8Q54vm2yDpsKt0k4j9Se5XAPVxSGXEz5Jhp4FT9wukJsSmwnzxukzr8HM',
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/${BREEDS_EP}`, option).then(resp => {
    if (!resp.ok) {
      throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/${CATS_EP}?breed_ids=${breedId}`, option).then(
    resp => {
      if (!resp.ok) {
        throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
      }
      return resp.json();
    }
  );
}
