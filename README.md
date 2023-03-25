# Modern Minds Magazine. CS50W Capstone Project

# Overview

This project is a full-stack application that uses Django Rest API as its backend and Next.js as its frontend. It's a website designed for a magazine that enables users to register for an account, verify their email address, and sign up for a newsletter. The newsletter feature utilizes the Sendgrid API for seamless and secure email communication. Additionally, users can browse and read articles on the site without creating an account or signing up for any services.

## Distinctiveness and Complexity

Although its foundation is grounded in many of the lessons from the CS50 course, this project is unlike any of the projects featured in the course. It's not a social media app or an e-commerce site, but rather a magazine site complete with a fully-fledged API and models that are significantly more complex than any of the projects in the course. The custom user model, secure JWT authentication, and secure storage of tokens in HTTP-only cookies protect the project against Cross-Site Scripting (XSS) attacks. Additionally, the content creation process extends beyond the capabilities of the normal Django admin by utilizing the Ckeditor package. This allows for flexible and stylish article creation, including the ability to add images anywhere within the body of the article. The project also features complex and advanced views for newsletter functionality and subscription using Sendgrid, as well as styled dynamic templates. The frontend is equally advanced and complex, utilizing the latest industry tools such as the React framework Next.js, Redux Toolkit for state management, and RTK Query for API fetches. There is no project in the course I'm aware of that compares to this one.

# Structure

## Backend

- `./backend`  Contains the django rest framework backend files.
    - `./modernminds`The main project directory, containing the project configuration files and settings.
        - `./storages.py` The additional file, which contains two custom classes for storing static and media files in an AWS S3 bucket using the S3Boto3Storage backend.
    - `./magazine` - A magazine app directory, which contains all models views, urls and serializers files for articles. 
    - `./newsletter` - The newsletter app directory containing the models, views, urls, serializers for the newsletter feature.
    - `./users` - The users app directory containing the models, views, urls and serializers files for users and authentication logic.
    - `requirements.text` - The file containing all the packages which are being used by the backend 

## Frontend
- `./frontend` - Contains the next.js frontend files
    - `./src/component/`
        - `/ExploreModal.jsx` - The Explore component with the list off all the categories with links to their respective categories.
        - `/Footer.jsx` - The footer component.
        - `/LatestArticles.jsx` - Lists the list of all the articles section of the magazine, listing them with pagination, 3 articles per page.
        - `/Layout.jsx` - The layout higher component
        - `/Login.jsx` - The login component, 
        - `/Navbar.jsx` - The navbar component, it loads user deatails and handles most of the state affecting component like Login, Register, ExploreModal etc.
        - `/PasswordReset.jsx` - The compenent for sending a request to the server for password reset. With an email input field only.
        - `/Register.jsx` - The register/Signup component
        - `/SpecialArticles.jsx` - Displays special articles like the Top Story and the Editors not, its also the parent component of the Today's Pick component.
        - `Today's Pick.jsx` - Maps the today's pick articles.
    - `./fonts` - contains the local font files.
    - `./config/index.js` - index file exporting the API_URL constant
    - `./lib/gtags.js` - Exports constants and functions for implementing Google Analytics tracking using gtag.js, including setting a tracking ID and functions for pageview and event tracking.
    - `pages/api/auth` - next js server api endpoints to access protected views in the django rest api. The httpOnly cookies are utilised here at the next.js server.
        - `/change_mail.js` - recieves request for email change from react client sent by RTK Query and sends it to django rest api.
        - `/delete_account.js` - for deleting a users account.
        - `/load_user.js` - loading the active users details, also sends the resfresh token to get a new access and refresh token is the access token have expired.
        - `/login.js` - sending loggin request to the rest api.
        - `/logout.js` - loging out, by simpl deleting the cookie with the tokens.
        - `/sendmianmails.js` - sends the request to send the weekly newsletter to the list of subscribers.
        - `/update_users.js` - send a request to update the user information when a user is updating their details on thieir profile page.
        - `/category/[slug].jsx` - dynamic route for the category page.
        - `/reset-password-confirm/[uid]/[token].jsx` - dynamic route for password confirm page when reseting password.
        - `/unsubscribe/[token].jsx` - dynamic route for unsubscibing from the newsletter.
        - `/verify-email/[uid]/[token].jsx` - route for email verification after account registration.
        - `/vefify-nl-email/[uid]/[token].jsx` - route newsletter subscribed email verification.
        - `/admin.jsx` - the page for the frontend admin actions.
        - `/search.jsx` - the page for searching all the articles.
        - `/userprofile.jsx` - the user profile page.
   - `/redux/api`
        - `/authApiSlice.js` - have an API slice for authentication using Redux Toolkit with a base URL set to "/api/ to the next.js server api endpoints.
        - `/authApi.js` - endpoints for the authApiSlice, injecting the authApiSlice to the endpoints.
        - `/generalApiSlice.js` - the api slice for general routes to the rest api that doesn't require authentication.
        - `/genaralApi,js` - the endpoints for the generalApiSlice going straight to the rest api views.
   - `/redux/slices`
        - `/appSlice.js` - a slice for the "app" state.
        - `authSlice.js` - a slice for the "auth" state.
   - `/Store.js` - the redux store.
        
        

## How to run

1.Clone the project with the following command or simply download the zipfile

```
git clone https://github.com/iamenochchirima/ModernMinds.git
```

3. Navigate to the `./backend` directory and run this command to install the python dependencies: 

```
pip install -r requirements.txt
```

4. avigate to the `./frontend` and run the following command to run install dependencies:

```
npm install
```

5. Create a .env file both in the `/backend` and `/frontend` directories.
6. Create a sendgrid account, create the dynamic template and get key that corresponds with the following backend env varibales.
7. In the backend env file set up the following  variables:

```
AWS_ACCESS_KEY = <your aws access key>
AWS_SECRET_ACCESS_KEY =  <your aws secret key>
AWS_STORAGE_BUCKET_NAME = <your aws bucket name>

SENDGRID_API_KEY = <your sendgrid api key>
HOST_PASSWORD_SENDGRID = <your sendgrid host password>

EMAIL_VERIFICATION_TEMPLATE_ID = <Id for a email verifyfication dynamic template you would have created on sendgrid>
PASSWORD_RESET_TEMPLATE_ID = <id for password reset template>
MAIN_NEWSLETTER_TEMPLATE_ID = <newsletter tempplate id>
NEWSLETTER_VERIFICATION_TEMPLATE_ID = <newsletter verification email template id>

FRONTEND_BASE_URL = <your frond end url. e.g: http://127.0.0.1:3000>

ALLOWED_HOSTS=127.0.0.1
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:8000

DATABASE_URL = <your db url>
PGDATABASE = <your db name>
PGHOST = <your db host>
PGPASSWORD = <your db password>
PGPORT = <your db port>
PGUSER = <your db user name>

```

8. In the frontend .env file setup the following variables:

```
NODE_ENV = 'development'
NEXT_PUBLIC_API_URL = 'http://localhost:8000'
NEXT_PUBLIC_ADMIN_URL = 'http://localhost:8000/admin'
```

9. When this is all done, navigate to `/backend` and run the following command:

```
python3 manage.py runserver
```

10. Create a new terminal and navigate to the `/frontend` directory and run this command:

```
npm run dev
```

The frontend and backend should both be running and connected.
