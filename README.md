## watch LIVE at:

https://goofy-swirles-cdb887.netlify.app/

## ABOUT:

a React search component with pagination and caching (React-Query), using the google books api.

## APP_CONFIGURATION:

Configuration files for the application can be found at file-name.config.ts

in env.config.ts use:
export const **ENV** = Environments.DEVELOPMENT; // for real api
or use:
export const **ENV** = Environments.TEST; // for mock api
NOTE: with Environments.TEST (which is meant only for developers testing ui and never in production) please remember that you need to first clean your local wishlist (in local storage) because otherwise items with IDs that were added from real DATA do not have
matching items in the local mock data, therefore leading to inconsistencies between number of items in wishlist and real items rendered
in wishlist.

## RUNNING LOCALLY:

npm install
npm start

## AUTHENTICATION:

Only one username and password exists locally (no persistence).
username: 'itamar'
password: 'itamar'

## STATE_MANAGEMENT:

React Context API

## STORAGE:

localStorage / sessionStorage

## STACK:

React, Typescript, Axios, React-Query, react-pdf
