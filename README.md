# Assignment Submission & Review App

## Overview
This full-stack application allows students to submit assignments and get them reviewed by code reviewers in a coding boot camp. It provides a dashboard for students and Code reviewers that they can log in to it using their bootcamp credentials to track their assignments and notifications for updates.

## Features
- Student dashboard with due assignments, submission status, and review updates.
- Assignment submission with GitHub URL and branch info.
- Email notifications for assignment status updates.
- Assignment re-submission and review completion with video recording URL.

## Technologies Used
- Front-end: JavaScript, React, Bootstrap, CSS
- Back-end: Spring Boot RESTful API (stateless with exposed API endpoints), Hibernate
- Database: MySQL
- Containerization: Docker and Docker Compose
- Authentication: JWT


## Getting Started
1. Clone the repository.
2. Install dependencies.
3. Run Docker Compose to start the application.
4. Insert Manually 2 users with valid Email addresses in the user_name column in users table and insert in the authority column in the authorities table with ROLE_STUDENT and ROLE_CODE_REVIEWER to be able to log 
   in and test the app.
   

