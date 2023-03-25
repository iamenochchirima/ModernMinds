# Modern Minds Magazine. CS50W Capstone Project

## Overview

This project is a full-stack application that uses Django Rest API as its backend and Next.js as its frontend. It's a website designed for a magazine that enables users to register for an account, verify their email address, and sign up for a newsletter. The newsletter feature utilizes the Sendgrid API for seamless and secure email communication. Additionally, users can browse and read articles on the site without creating an account or signing up for any services.

## Distinctiveness and Complexity

Although its foundation is grounded in many of the lessons from the CS50 course, this project is unlike any of the projects featured in the course. It's not a social media app or an e-commerce site, but rather a magazine site complete with a fully-fledged API and models that are significantly more complex than any of the projects in the course. The custom user model, secure JWT authentication, and secure storage of tokens in HTTP-only cookies protect the project against Cross-Site Scripting (XSS) attacks. Additionally, the content creation process extends beyond the capabilities of the normal Django admin by utilizing the Ckeditor package. This allows for flexible and stylish article creation, including the ability to add images anywhere within the body of the article. The project also features complex and advanced views for newsletter functionality and subscription using Sendgrid, as well as styled dynamic templates. The frontend is equally advanced and complex, utilizing the latest industry tools such as the React framework Next.js, Redux Toolkit for state management, and RTK Query for API fetches. There is no project in the course that compares to this one.

## Structure

- ./backend
