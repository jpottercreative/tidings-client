# tidings v1.0 CLIENT

![React 18 Badge](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Redux 1.8 Badge](https://img.shields.io/badge/Redux-1.8-blueviolet?style=flat-square&logo=redux)
![Material UI Badge](https://img.shields.io/badge/Material_UI-5.5-blue?style=flat-square&logo=materialdesignicons)
![Amazon s3 Badge](https://img.shields.io/badge/Amazon_S3--blueviolet?style=flat-square&logo=amazonaws)
![React Router 6 Badge](https://img.shields.io/badge/React_Router-6-red?style=flat-square&logo=reactrouter)
## Welcome to Tidings

### Tidings v1 is a simple photo gallery sharing app!

This client is built in React using React Router for most of the navigation, MUI for those cute cute icons, and Redux for that sweet sweet global state management.  Authentication is accomplished through JSON Web Tokens talking to Devise on the back end.

Keywords: Redux, React Router, Active Storage, S3, Material UI

This app has some neat stuff going on:
- Redux state management for global inc: 
  - Current User 
  - Gallery Being Built
  - Error handling for top level fetches
  - Snackbar messages and alerts
  - Loading state spinner
  - And, of course, light/dark mode

Some other fun bits to poke at:
  - Social Media Random String Link Generator is neat
  - The ImageUploadButton is a pretty solid start
  - The nav bar and header have some pretty conditional rendering

Back end coolness is built on Rails with ActiveRecord, sending and serving files to an S3 bucket.

n.b. this project was initially named Bromide Drag and there are still remnants of the original name all over the place - jp 4/18/22

---

## Installation
Fork and clone the repo, `npm install` and `npm run` will get the client going.

Be sure to go grab the server here: https://github.com/jpottercreative/tidings-server

---
### What's working:
>**Login / Sign-up:** you can login and signup - please use an email address.  There is currently limited validation.

>**Gallery Builder:** it works, but currently it only has options for image and text blocks. Plus, the advanced options are all disabled at the moment because there is no handling of them on the viewer yet.

>**Gallery Show:** The gallery show feature currently presents full-screen modal style galleries with scroll, to close the show just click.  They currently work in the app, each user can view their gallery - plus you can generate a share link to view share and view without login auth.

>**Error Handling:** is now captured by a global handler - so if the top level component (App, Gallery Presentation, Gallery Builder) fetch fails, it will throw an error to the global handler, which will then popup a message. Unfortunately it was going to be hard to customize completely and make it dynamic, so I opted for a single pink for all OK messages.  Needs more help, but works! 

>The waiting spinner mostly works - if it ever gets stuck and you think it should be done - just click it away lol...

---

### What's still to come?
>**Gallery Deliver:** The social share side works, and I'm happy with it; however, once this goes into deployment I'd like to play with subdomains per-user rather than having the share URL buried in a /share URL.

>**More handling/Validation:** There is a tiny bit of validation on the front end and back end. Would be nice to make those validations more robust, and at times more userfriendly (like check those regex's)

>**Gallery Builder:** All the text block options need to be implemented into custom box-sizing and text placement.

>**Deployment to Heroku**
---

>**Global User management!**

>**Custom useFetch hook:** this was on my stretch goals, and I didn't make it happen.  This is needed to consolidate the error handler, fetch, and messenger all into a single useable component. 

>**Global Login/Logout:** this again would fit in with the custom useFetch and global user management.

>**Global Messenger System:** Connected with the Redux state and global error handler
