# Photo-Search

### To build and run the project locally:
    1. Install Node.js 12+ LTS version and (npm) from https://nodejs.org/en/
    2. Install Angular Cli from here. ( https://cli.angular.io/ )
    3. Make sure you are in the root directory of the project then, in your terminal type `npm install` and press enter.
    4. To start the app, in your terminal type `ng serve` and press enter.
    5. This app supports Chrome Browser and Firefox Browser (it has been tested on `Chrome Version 84` and `Firefox 72`), Start any one of these two browsers and then navigate to http://localhost:4200/. 

### Third Libraries:
    1. ngx-infinite-scroll url:(https://www.npmjs.com/package/ngx-infinite-scroll)
        a. Used to trigger a callback when an element has been scrolled.
        b. It throttle the users scroll so we do not end up with multiple rest calls.  

### Features:
    1. The app search bar input values are debounced for 1 second.
    2. The app uses CSS Flexbox to display the list of photos.
    3. Each photo within the app is designed to resize according to the screen width.
    4. The margin is removed for screen sizes that are less than 450px. To ensure extra spaces.
    5. The app uses two different sizes of the searched image. 
        a. The medium size is used to display the image within the grid.
        b. The large size is used to display the image within the modal once the user clicks on the image.
    6. Using CSS hover effects the image title appears every time the user hover over the image. 

### Flickr Resources:
    1. You would need to create an api https://www.flickr.com/services/api/
    2. The api that has been used to search a photo https://www.flickr.com/services/api/flickr.photos.search.html
    3. The apps uses ( JSON ) format for GET requests. https://www.flickr.com/services/api/response.json.html
    4. To get the URL of the photo https://www.flickr.com/services/api/misc.urls.html.

### Unit testing
    1. To run the unit tests type `ng test` in the terminal. ( Make sure you have chrome installed.)
    2. Jasmine and karama are used to write the unit tests.

### Linting and Typsecript config.
    1. This app uses the default `tsconfig.json` that was generated by the Angular CLI.
    2. This app uses the default `tslint.json` that was generated by the Angular CLI with one rule added.
        a. `"no-unused-expression": [true, "allow-fast-null-checks"]` has been added to allow fast null checks using the && operator, 
        example from the code.
        ```js
        res && res.photos
        ```

### The RAW JSON Returned From The GET REQUEST: 
```json
{
  "page": 1,
  "pages": 18919,
  "perpage": 12,
  "total": "227024",
  "photo": [
    {
      "id": "50240327291",
      "owner": "8070463@N03",
      "secret": "aa78da317d",
      "server": "65535",
      "farm": 66,
      "title": "Serious looking tigressq",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
    },
    {
      "id": "50239671208",
      "owner": "189831661@N08",
      "secret": "d1e984d090",
      "server": "65535",
      "farm": 66,
      "title": "sell cell phones",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
    }
  ]
}
```