# 🌍 Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore, create, view, edit, and delete property listings. It provides a simple and responsive interface for discovering places to stay.
Live on : **https://wanderlust-aoyn.onrender.com**

## 🚀 Features

* 🏠 Browse available property listings
* 🔍 View detailed information about each listing
* ➕ Create new listings
* ✏️ Edit existing listings
* 🗑️ Delete listings
* ⭐ Add and delete reviews
* 📍 Display listing locations on an interactive map
* 🔐 User authentication and authorization
* 📱 Responsive design using Bootstrap
* ☁️ Image upload and cloud storage
* 💾 Store listing and user data in MongoDB

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Technologies

* Cloudinary – Image storage
* Leaflet / Mapbox – Maps and location display
* Passport.js – Authentication

## 📂 Project Structure

```text
Wanderlust/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
│   ├── css/
│   └── js/
├── utils/
├── init/
├── app.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

## 🗄️ Database

Wanderlust uses **MongoDB** as its database and **Mongoose** for interacting with MongoDB.

The application stores:

* User information
* Property listings
* Reviews
* Listing images
* Location information

## 🔐 Authentication

Wanderlust includes user authentication and authorization. Users can:

* Register an account
* Login and logout
* Create listings
* Edit their own listings
* Delete their own listings
* Add reviews to listings

## 🗺️ Maps & Location

The project uses an interactive map to display the location of each property listing.

Listing location data is converted into coordinates and displayed using a map interface.

## 📸 Image Upload

Property images are uploaded and stored using **Cloudinary**, allowing images to be managed separately from the application server.

## 🎨 UI

The frontend is built using **Bootstrap** to provide:

* Responsive layouts
* Navigation bar
* Cards
* Forms
* Buttons
* Alerts
* Mobile-friendly design

## 📌 Future Improvements

* 💳 Online booking and payment system
* ❤️ Wishlist functionality
* 🔎 Advanced search and filtering
* 📧 Email notifications
* 👤 User profile pages
* ⭐ Improved rating system
* 📱 Better mobile UI
* 🧭 Advanced map-based search

## 👨‍💻 Author

**Tanmay Wagh**

This project was developed as a full-stack web development project to practice Node.js, Express.js, MongoDB, authentication, CRUD operations, APIs, and responsive web development.

## 📄 License

This project is created for educational and learning purposes.
