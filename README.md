<<<<<<< HEAD
# Speedo
=======
# Speedo

This project involves developing a user-friendly web application where users can create an account and upload Excel or CSV files containing trip coordinates. Once the data is uploaded, users can visualize their trip paths on an interactive map. The application will calculate key metrics such as total distance, total duration, overspeeding duration, and distance during stops for each trip.

Key Features:

- User Account Creation: Secure login and user management.
- File Upload: Support for Excel and CSV formats to import trip data.
- Map Visualization: Display individual and multiple trip paths on an interactive map.
- Data Analysis: Calculate and display total distance, total duration, overspeeding duration, and stopped duration for each trip.
- Multi-Trip Selection: Allow users to select and visualize multiple trips simultaneously.
- Trip Detail Toggle: Easily toggle between trip details to view selected trips on the map, enhancing user interaction and analysis.

This application aims to help users gain insights into their travel patterns, improve route efficiency, and monitor driving behavior effectively.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v12 or later)
- npm (comes with Node.js)
- MongoDB (or use MongoDB Atlas for a cloud solution)
- Git

## Installation

Installation Steps

1.  Clone the Repository
    Open your terminal and run the following command to clone the repository:

```bash
  git clone https://github.com/saurabh7000/Speedo.git
```

2. Navigate to the Project Directory

```bash
 cd <repository-name>
```

Replace <repository-name> with the name of the cloned directory.

3. Install Server Dependencies
   Navigate to the server directory (if applicable):

```bash
cd backend
```

Install the server dependencies:

```bash
npm install
```

4. Set Up Environment Variables
   Create a .env file in the server directory and set up your environment variables. Here’s an example:

```bash
MONGODB_URI=mongodb://localhost:27017/yourdbname
PORT=5000
```

5. Start the Server
   Run the following command to start the server:

```bash
npm run server
```

Install Client Dependencies
Open a new terminal window (or tab), navigate to the client directory, and install the dependencies:

```bash
cd frontend
npm create vite@latest
```

7. Start the Client
   Run the following command to start the client:

```bash
npm run dev
```

8.To run the server side and client side concurrently, open a command terminal.

```bash
cd root directory
npm run start
```

## Depedencies

# Server Side

    "bcryptjs": "^2.4.3"
    "concurrently": "^9.0.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "csvtojson": "^2.0.10",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "geolib": "^3.3.4",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.1",
    "multer": "^1.4.5-lts.1",
    "validator": "^13.12.0"

# Client Side

    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.3",
    "@mui/material": "^6.1.4",
    "@mui/styles": "^6.1.4",
    "@reduxjs/toolkit": "^2.2.8",
    "axios": "^1.7.7",
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.3.0",
    "react-leaflet": "^4.2.1",
    "react-leaflet-cluster": "^2.1.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.27.0",
    "redux": "^5.0.1",
    "redux-thunk": "^3.1.0"

## Troubleshooting

- If you encounter any issues, ensure that MongoDB is running.
- Check for any errors in the terminal output for both the server and client.
- Refer to the project documentation for additional setup instructions.

## Usage

You can now access the application in your browser at http://localhost:3000. Make sure both the server and client are running.
>>>>>>> origin/master
