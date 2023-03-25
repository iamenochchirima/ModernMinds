# Modern Minds Magazine. CS50W Capstone Project

## Overview

This project is a full stack project with Django Rest API at backend and Next.js at frontend. Its a website for a magazine, It allows users to register accounts, verify their email addresses, signup for a newsletter, the newsletter uses Sengrid API. Users can also simply browse and read articles without creating any account or signing up for anything.

## Distinctiveness and Complexity

Even though its foundation is gounded on most of the lessons from the course, this project is unlike any of the projects in the CS50 course. Its not a social media app, or an e-commerce site, its a magazine site with full a fledged api and models that are quite complex as compared to any of the projects in the course. Custom user model, secure JWT authentication and securely storing tokens in httponly cookies to help project against Cross Site Scripting (XSS) attacks. The content creation also extends what the normal django admin has to offer, it utilises the Ckeditor package so articles for the magazine are created flexibly with style and ease, adding images at any position in the body of the articles. It aslo have quite complex and advanced views for the newsletter functionality and subscription using Sendgrid and styled dynamic templates. The frontend is also advanced and complex, it uses the latest  and advanced industry tools, the react framwork next.js, redux toolkit for state management, RTK Query for api fetches and the design of the layout
