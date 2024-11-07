# User Profile React App


## Overview

This React app provides a user profile page where users can input personal details, which are stored in local storage. The page also retrieves data from external APIs for location and user profile information.

## Steps Taken to Design the React Pages

### 1. Project Setup

- Initialized a React app using `create-react-app`.
- Installed dependencies: TailwindCSS for styling.
- Configured TailwindCSS by adding directives in `src/index.css` and setting up `tailwind.config.js`.

### 2. Page Layout (UserProfilePage)

- Created a `UserProfilePage.js` component inside the `src/pages` directory.
- Designed a centered form layout using TailwindCSS with `flex`, `justify-center`, and `items-center` classes to center the form both horizontally and vertically.

### 3. Form Fields and State Management
- Defined an initial state using useState to store user profile fields: `name`, `age`, `gender`, `location`, etc.
- Added input elements for each field, utilizing the `value` and `onChange` properties to bind the inputs to the state.
- Used a `<select>` element for gender with only two options ("male" and "female") to limit choices.

### 4. Validation Implementation
- Added input validation to ensure fields are not empty, age is above zero, gender has only two options, and email follows a valid format.
- Displayed error messages below each input if validation criteria were not met.

### 5. Local Storage for Persisting Data
- Implemented functionality to save form data to local storage on clicking the "Save" button.
- Used `useEffect` to load data from local storage when the component mounts, allowing the app to persist data across page refreshes.

### 6. External API Integrations

- Location API: Implemented `fetchLocation` to retrieve the user's city and country from the Abstract API and display it in the location field.
- User Profile API: Used `fetchUserProfile` to get user data (email, username, display name, and avatar URI) from the GotArtifact API.
- Stored API keys and tokens securely using environment variables in an `.env` file, which is excluded from version control using `.gitignore`.

### 7. Environment Variables
- Set up environment variables in an `.env` file to securely store sensitive information such as the API key for Abstract API and the authorization token for the GotArtifact API.
- Accessed environment variables using `process.env` in the `fetchLocation` and `fetchUserProfile` functions.


## Running the Project

1. Clone the repository:
    ```
    git clone https://github.com/gentleman9999/user-profile-app.git
    cd user-profile-app
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Set up environment variables:
    - Create an `.env` file in the project root with the following content:
        ```
        REACT_APP_ABSTRACT_API_KEY=your_abstractapi_key_here
        REACT_APP_AUTH_TOKEN=your_gotartifact_auth_token_here
        ```
4. Start the development server:
    ```
    npm start
    ```
