# To-Do List v2

### Live Version

You can access the live version of the app by visiting [this link](https://to-do-list-v2-usgi.onrender.com/).

## Project Architecture

```
└── 📁to-do-list-v2
    └── README.md
    └── 📁backend
        └── .gitignore
        └── 📁controllers
            └── todoControllers.js
        └── 📁models
            └── Todo.js
        └── package-lock.json
        └── package.json
        └── 📁routes
            └── todoRoutes.js
        └── server.js
        └── 📁sockets
            └── socketManager.js
        └── utils.js
    └── 📁frontend
        └── .eslintrc.cjs
        └── .gitignore
        └── index.html
        └── package-lock.json
        └── package.json
        └── postcss.config.js
        └── 📁public
            └── favicon-16x16.png
        └── 📁src
            └── App.jsx
            └── 📁Components
                └── AddTodoForm.jsx
                └── EditModal.jsx
                └── Footer.jsx
                └── Header.jsx
                └── Main.jsx
                └── MainMenu.jsx
                └── Todo.jsx
                └── TodoList.jsx
            └── 📁assets
                └── hulk-apps-logo.webp
                └── shop-circle-logo.png
            └── index.css
            └── main.jsx
        └── tailwind.config.js
        └── vite.config.js
```

## How to Start the Application

1. **Clone the Repository:**

    - Open your terminal or command prompt.
    - Run the following command to clone the repository:
        ```
        git clone https://github.com/AdnanPobrklic/to-do-list-v2
        ```
    - This will create a local copy of your project.

2. **Navigate into the Directory:**

    - Change your working directory to the cloned project folder:
        ```
        cd to-do-list-v2
        ```

3. **Navigate into the backend directory**

    - Change your working directory to the cloned project folder:
        ```
        cd backend
        ```

4. **Install Dependencies:**

    - In the root directory of your project, you'll find `package.json`. This file lists all the dependencies required for your app.
    - Run the following command to install the necessary packages:
        ```
        npm install
        ```

5. **Navigate into the frontend directory**

    - Change your working directory to the cloned project folder:
        ```
        cd ../frontend
        ```

6. **Install Dependencies:**

    - In the root directory of your project, you'll find `package.json`. This file lists all the dependencies required for your app.
    - Run the following command to install the necessary packages:
        ```
        npm install
        ```

7. **Set Up Environment Variables:**

    - IF YOU SKIP THIS STEP DEFAULT LOCALHOST VALUE WILL BE PROVIDED AUTOMATICALLY
    - Create a `.env` file in both the `backend` and `frontend` directories.
    - Add the following environment variables to each `.env` file:

        Backend `.env`:

        ```
        CLIENT_URL=<your-client-url>
        DB_URI=<your-database-uri>
        PORT=<your-port>

        ```

        Frontend `.env`:

        ```
        VITE_BACKEND_API_URL=<your-backend-api-url>

        ```

8. **Start the Backend Server:**

    - Your backend code is located in the `backend` folder.
    - Make sure you have the required environment variables set up in the `.env` file.
    - Run the following command to start the backend server:
        ```
        cd ../backend
        ```
        ```
        npm run dev
        ```
    - Your backend server should now be running.

9. **Start the Frontend Development Server:**

    - Your frontend code is located in the `frontend` folder.
    - Navigate to the `frontend` directory:
        ```
        cd ../frontend
        ```
    - Start the development server:
        ```
        npm run dev
        ```
    - Your frontend development server should now be running.

10. **Access Your App:**
    - Open your web browser and go to `http://localhost:5173`.
    - You should see your To-Do List app up and running!

## Libraries and npm Packages

-   `react`: ^18.0.2
-   `react-dom`: ^18.0.2
-   `gsap`: "^3.12.5"
-   `tailwindcss`
-   `axios`: "^1.7.2"
-   `socket.io-client`: "^4.7.5"
-   `uuid`: "^9.0.1"
-   `dotenv`: "^16.4.5"
-   `express`: "^4.19.2"
-   `mongoose`: "^8.4.0"
-   `socket.io`: "^4.7.5"
-   `nodemon`: "^3.1.1"

## External Resources

-   [Font Awesome](https://fontawesome.com)
-   [CSS Gradient](https://cssgradient.io)
-   [Flaticon](https://flaticon.com)
-   [Google Fonts](https://fonts.google.com)
