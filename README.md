# 👕 Kalii Clothing Store

Kalii Clothing Store is a modern full-stack e-commerce web application designed to provide customers with a seamless online shopping experience for fashion and clothing products. The platform allows users to browse products, create accounts, manage shopping carts, place orders, and complete secure checkout processes. The project combines a responsive front-end with a scalable Spring Boot backend architecture to simulate a real-world online clothing store.

---

## 📖 Project Overview

The goal of Kalii Clothing Store is to provide an intuitive and visually appealing shopping platform while demonstrating full-stack web development concepts such as authentication, product management, inventory tracking, order processing, payment handling, and administrative controls.

The application is designed with scalability in mind, allowing future integration with cloud services, payment gateways, and enterprise-level database solutions.

---

## ✨ Features

### Customer Features

- User Registration
- User Login & Authentication
- Forgot Password Functionality
- Product Browsing
- Product Search and Filtering
- Product Detail Pages
- Size and Color Selection
- Shopping Cart Management
- Wishlist Management
- Currency Conversion (ZAR, USD, EUR)
- Coupon and Discount System
- Checkout and Payment Processing
- Order Confirmation
- Order History
- Delivery Tracking
- Customer Profile Management
- Product Reviews and Ratings
- Responsive Mobile-Friendly Design

### Administrative Features

- Admin Dashboard
- Product Management
- Category Management
- Inventory Management
- Stock Updates
- Customer Management
- Order Management
- Coupon Management
- Sales Analytics
- Review Moderation
- Delivery Status Management
- Business Reporting

---

## 🏗️ System Architecture

```text
Frontend (HTML, CSS, JavaScript)
            │
            ▼
     Spring Boot REST API
            │
            ▼
       Service Layer
            │
            ▼
      Repository Layer
            │
            ▼
       MySQL Database
```

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage
- Responsive Design

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven
- Lombok

### Database

- MySQL

### Future Integrations

- PayFast
- Stripe
- Supabase
- Docker
- AWS

---

## 📂 Project Structure

```text
kalii-clothing-store/

├── frontend/
│   ├── index.html
│   ├── shop.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── success.html
│   ├── style.css
│   └── store.js
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── security/
│   ├── config/
│   └── exception/
│
└── database/
```

---

## 🛍️ Product Management

The system supports complete product lifecycle management including:

- Product creation
- Product updates
- Product deletion
- Product categorization
- Multiple product images
- Inventory tracking
- Stock management

Products may include:

- Hoodies
- T-Shirts
- Jackets
- Jeans
- Sneakers
- Accessories

---

## 👤 Authentication & Security

Authentication is handled using Spring Security and JWT.

### User Registration

New users can create accounts using:

- First Name
- Last Name
- Email Address
- Password

### Login

Users authenticate using:

- Email Address
- Password

### Security Features

- Password Encryption
- JWT Token Authentication
- Role-Based Authorization
- Session Protection

---

## 🛒 Shopping Cart

Customers can:

- Add products to cart
- Remove products from cart
- Update quantities
- Clear cart
- View totals
- Apply discount codes

Cart totals update dynamically and support multiple currencies.

---

## 💳 Checkout & Payments

The checkout process includes:

- Delivery Information
- Address Validation
- Payment Validation
- Order Creation
- Order Confirmation

Future payment integrations include:

- PayFast
- Stripe
- EFT Payments

---

## 📦 Order Management

Orders move through several stages:

```text
Pending
↓
Paid
↓
Processing
↓
Packed
↓
Shipped
↓
Delivered
```

Customers can track order progress through their accounts.

---

## 📊 Admin Dashboard

The admin dashboard provides tools for managing the store.

### Product Administration

- Add Products
- Edit Products
- Delete Products
- Manage Categories

### Inventory Administration

- Update Stock Levels
- Monitor Low Stock Items
- View Out-of-Stock Products

### Order Administration

- View Orders
- Update Order Status
- Process Deliveries

### Customer Administration

- View Registered Customers
- Review Customer Activity
- Manage Accounts

---

## 🗄️ Database Entities

Core entities include:

- User
- Role
- Address
- Product
- Category
- ProductImage
- Cart
- CartItem
- Wishlist
- Review
- Coupon
- Order
- OrderItem
- Payment

---

## 🚀 Future Enhancements

Planned improvements include:

- AI Shopping Assistant
- Product Recommendations
- Live Chat Support
- Email Notifications
- SMS Notifications
- Advanced Analytics
- Inventory Forecasting
- Loyalty Program
- Referral Program
- Multi-Vendor Marketplace Support

---

## 🎯 Learning Outcomes

This project demonstrates:

- Full-Stack Development
- REST API Design
- Authentication and Authorization
- Database Design
- E-Commerce Functionality
- Responsive Web Design
- Object-Oriented Programming
- Spring Boot Development
- Frontend and Backend Integration

---

## 👨‍💻 Author

**Nkosinathi Manda**

Kalii Clothing Store was developed as a full-stack e-commerce project to showcase modern web development practices and provide a scalable foundation for a real-world online clothing retail platform.

---

## 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project for educational and personal purposes.
