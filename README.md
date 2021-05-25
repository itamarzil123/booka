## watch LIVE at:

https://goofy-swirles-cdb887.netlify.app/

## ABOUT:

a React search component with pagination and caching (React-Query), using the google books api.

## APP_CONFIGURATION:

Configuration files are names someFile.config.ts and determine the application configuration.

env.config.ts:
MOD: TEST
which means the data is MOCK data and the google API is OFF by default
best while coding and not depending on the books google API to work / fetch limitations (there is a limited amount
of books you can fetch a day)

    MOD: DEVELOPMENT/PRODUCTION
        turn on google API, and real data fetching

npm install
npm start

## AUTHENTICATION:

Only one username and password exists locally (no persistence).
username: 'username'
password: 'password'

## STATE_MANAGEMENT:

React Context API

## STACK:

React, Typescript, Axios, React-Query, react-pdf
