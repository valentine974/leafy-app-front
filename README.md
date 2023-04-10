<!-- create readme based on the project -->

# LEAFY 
a leave request gestion app 

deployed on notlify: https://leafy.netlify.app/

---

#### To test the project yourself, you will need the following variables in .env

- **PORT**: the port you want to use for local testing
- **REACT_APP_SERVER_URL**: the deployed serveur url

---


## Description

This is the **frontend** of the Leafy project. It is a vacation request gestion app. It is a project for the ironhack bootcamp.

## Account creation

Since it's a vacation request gestion app, it's desinated for companies. So it will always be the HR who will create the account for all users.The user will then receive an email with a link to login wil with given credentials.

on first login, the user will be asked to change his password.

## Authentication

The user will be able to login with his email and password. The password will be encrypted with bcrypt, and token will be generated with JWT.


## User roles

There are 4 roles for the users:
- **admin** (super user)
- **hr** (human resources, user creator, vacation approver)
- **manager** (vacation approver)
- **employee** (basic user, no special rights)

## Pages: 

- **Home** (welcome page, for everyone)
- **Login** (only for not logged in users)
- **My company** (for logged in users)
- **My profile** (for logged in users)
- **My requests** (for logged in users)
- **Hanle requests** (for logged in approvers)
- **Create request** (for logged in users)
- **Edit request** (for logged in users)
- **Create user** (for logged in HR)
- **Edit user** (for logged in HR)
- **Create company** (for logged in Admin)
- **Edit company** (for logged in Admin and HR)

## Models
Models will be explained in the backend readme.

## Interesting features

- **react-calendar** (display loged in user's requests)
- **messaging** (for the chat)
- **nodemailer** (for the account creation, password reset, requests status change)

