# Web-Based Chatroom

Web-Based Chatroom is a multi-user chat application designed for interactive messaging.

## Features

- **Tools & Technologies Used:**
  - MongoDB
  - Express.js
  - Node.js
  - HTML
  - CSS with Tailwind CSS
  - JWT

- **RESTful API Development:**
  - Created RESTful APIs with Express.js for posting and updating content.

- **Database Integration:**
  - Integrated MongoDB for database management and storage of chat messages.

- **UI Design:**
  - Designed a user-friendly interface with Tailwind CSS, enhancing user experience.

## Sign-Up Page

![Web-Based Chatroom Screenshot](https://github.com/user-attachments/assets/3fc739f8-e117-4018-ae87-26ff2d0fde90)

- **Security Features**
  - Secure Registration: Utilizes bcrypt for password hashing and checks for existing users to prevent duplicate registrations.
  - JWT Token Generation: Generates a JWT for authenticated user sessions, including email and user ID in the token payload.
  - Cookie-Based Session Management: Sets an HTTP-only cookie with the JWT token for secure and persistent user authentication across sessions.

## Log-in Page
![image](https://github.com/user-attachments/assets/1ccd59e3-9159-4f3f-a361-a951efe788d7)
- **Security Features**
  - Secure Password Handling: Uses bcrypt.compare() to securely compare hashed passwords, preventing plaintext exposure and enhancing password security.
  - JWT Token Generation: Generates a JWT (JSON Web Token) with user details (email and userid) upon successful password verification, ensuring secure authentication.
  - Robust Error Handling: Implements proper error handling to manage scenarios where the username provided in the login form does not match existing user records, enhancing user privacy and security.

## Main Home Page Page
![image](https://github.com/user-attachments/assets/4cac39d9-ca28-4453-85b5-5e8d5365ee30)
![image](https://github.com/user-attachments/assets/1c826880-6e2d-49e3-ad83-afc9a01dff85)

- **Design**
  - A clean , Minimalist and Simplistic layout tha wont confuse anybody.
- **Creation of new post**
  - Provided a text box in main body to enable easy post creation.
- **Personal Postst**
  - All of a user's posts are organized into one place to give an overview into post history
  - Posts equiped witha like counter and an edit option along with a timestamp

## Community Posts Page
![image](https://github.com/user-attachments/assets/1bab6dc2-6396-412a-813c-6b14ed7fc4a2)
- **Visibility**
  - Posts from all users are seen in one consolidated place
- **Interraction With Community**
  - Provided a like/unlike option to see who's posts are gaining traction
