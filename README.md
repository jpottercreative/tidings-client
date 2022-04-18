# bromide-drag v1.0 CLIENT

## Welcome to Bromide Drag

***Bromide Drag:*** Characterized by uneven areas of development due to high concentrations of Bromide around sproket holes of film due to lack of agitation. 

---
Let's get agitated.

---

### Bromide Drag v1 is a simple photo gallery builder app!

This client is built in React using React Router for most of the navigation, MUI for those cute cute icons, and Redux for that sweet sweet global state management.  Authentication us accomplished through JSON Web Tokens.

Back end coolness is built on Rails with ActiveRecord, sending and serving files to an S3 bucket.

---

## Installation
Fork and clone the repo, `npm install` and `npm run` will get the client going.

Be sure to go grab the server here: https://github.com/hariseldon27/bromide-drag-server



---
### What's working:
>**Login / Sign-up:** you can login and signup - please use an email address.  There is currently no validation.

>**Gallery Builder:** it works, but is clunky and the only options available are to add an image, and create a text block that uses a random color for the background.

>**Gallery Show:** The gallery show feature currently presents full-screen modal style galleries with scroll, to close the show just click.  They currently just work in the app, each user can see their own galleries.

>The waiting spinner mostly works - if it ever gets stuck and you think it should be done - just click it away lol...

<!-- ### Straight Up Errors:
>There is a 401 unauthorized when you register a new user with a non-valid email address this is obv due to auth and no validation ... so, sign up with an email address plz -->


### What's still to come?
>**Gallery Deliver:** write gallery links to publicly available end-points. Goal is to use pretty urls, and/or custom subdomains.

>**Error handling/Validation:** This is a way stripped out app (error handling wise) - I only implemented snackbar alerts on two components (app home, login) to try them out - need to move all the error handling to global redux state so that I can trigger, and more importantly, pass error messages to it from anywhere.

>The UI needs lots of work.

>**Gallery Builder:** All the text block options need to be implemented into custom box-sizing and text placement.

>**Deployment to Heroku**

>Back End Fun: notes for the back end over there# tidings-client
