# Ecommerce Demo

An ecommerce platform that has basic user and admin functionalities

[Demo](https://youtu.be/KI8Go5kc788)

## Table of Contents

- Project Overview
- Technologies
- Getting Started
- Notes
- Usage

## Project Overview

Ecommerce Demo is a small project that lets users browse products by category, view details, and add items to their carts with a simple UI. It also includes admin permissions, allowing them to reorder categories and products using drag-and-drop functionality.

## Technologies

- Next.js
- Spring Boot (with JWT authentication)
- PostgreSQL
- Tailwind CSS
- Material UI

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- IntelliJ IDEA
- PostgreSQL (PgAdmin)

### Installation

1. Clone the repository

```
git clone https://github.com/geowashere/EcommerceDemo.git
```

2. Go to the project directory and install dependencies for both the client and the server:

- **Client**: Navigate to the client folder and run:

```
npm install
```

- **Server**: Open `DemoApplication.java` and load gradle dependencies.

3. Ensure that all information in `application.properties` is correct. The `spring.datasource.username` and `spring.datasource.password` should match a PostgreSQL user with the necessary permissions for a database named `EcommerceDemo`.

4. Ensure that the jdk version matches the one in `build.gradle` `languageVersion = JavaLanguageVersion.of(your_jdk_version)`.

5. Seed data in the Products & Categories tables:

- Insert in Categories first:

```
INSERT INTO categories (name, description, position) VALUES
('Electronics', 'Electronic devices', 1),
('Clothing', 'Fashion apparel', 2),
('Books', 'Literature', 3),
('Home', 'Appliances', 4),
('Sports', 'Outdoor gear', 5);
```

- Insert in Products:

```
INSERT INTO products (name, price, description, position, category_id) VALUES
('Smartphone', 799.99, 'Flagship phone', 1, 1),
('Laptop', 1299.99, 'Ultrabook', 2, 1),
('Headphones', 149.99, 'Noise-cancelling', 3, 1),
('T-Shirt', 24.99, 'Cotton', 4, 2),
('Jeans', 59.99, 'Slim fit', 5, 2),
('Jacket', 129.99, 'Winter', 6, 2),
('Novel', 14.99, 'Bestseller', 7, 3),
('Textbook', 39.99, 'Academic', 8, 3),
('Cookbook', 24.99, 'Recipes', 9, 3),
('Blender', 49.99, 'Countertop', 10, 4),
('Toaster', 29.99, '2-slice', 11, 4),
('Pan Set', 89.99, 'Non-stick', 12, 4),
('Yoga Mat', 29.99, 'Non-slip', 13, 5),
('Dumbbells', 79.99, '10kg set', 14, 5),
('Basketball', 24.99, 'Official size', 15, 5);
```

6. **Start the server:** Open `DemoApplication.java` in IntelliJ and run the application.
7. **Start the client:** Navigate to the client folder and run:

```
npm run dev
```

8. When the server starts, an admin user is automatically created with the following credentials:

```
admin@example.com
admin123
```

## Notes

- This project was built in 4 days.
- The user experience is very basic, and the design is simple.
- JWT authentication is functional but not highly secure, e.g: normal users can access admin endpoints.
- Backend responses were minimalistic for simplicity.
- Some code is clean, but there's room for improvement.
- Unexpected behavior may occur since user experience was not the main focus.

## Usage

https://youtu.be/KI8Go5kc788
