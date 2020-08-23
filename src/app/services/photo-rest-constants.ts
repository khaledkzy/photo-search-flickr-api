export const BASE_URL =
  'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
export const RESPONSE_FORMAT_TYPE = 'json';
export const RESPONSE_FORMAT = `format=${RESPONSE_FORMAT_TYPE}`;
export const NO_JSON_CALLBACK = 'nojsoncallback=1';
export const PAGES_NUMBER = '20';
export const PER_PAGE = 'per_page=';
export const PHOTOS_PER_PAGE = `${PER_PAGE + PAGES_NUMBER}`;
export const SAFE_SEARCH = 'safe_search=';
export const DEBOUNCE_TIME = 1000;
