# 🏦 Digital Banking Backend

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![JWT](https://img.shields.io/badge/Security-JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![H2 Database](https://img.shields.io/badge/Database-H2-1E90FF?style=for-the-badge&logo=h2&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

*A comprehensive backend application for digital banking operations built with Spring Boot 3.2.0 and Java 21*

[🚀 Getting Started](#getting-started) • [📚 API Documentation](#api-documentation) • [🔒 Security](#security) • [🧪 Testing](#testing)

</div>

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- **JWT-based Authentication** - Secure token-based authentication system
- **User Registration & Login** - Complete user onboarding flow
- **Password Management** - Secure password change functionality
- **Role-based Access Control** - Three-tier access system (USER, ADMIN, BANKER)

### 👥 **Customer Management**
- **Full CRUD Operations** - Create, read, update, and delete customers
- **Advanced Search** - Find customers by name or email
- **Audit Tracking** - Complete audit trail with timestamps and user tracking

### 💰 **Account Operations**
- **Multi-Account Types** - Support for current and savings accounts
- **Transaction Management** - Debit, credit, and transfer operations
- **Transaction History** - Paginated account history with detailed records

### 🛠️ **Technical Excellence**
- **In-Memory Database** - H2 database with web console access
- **Interactive Documentation** - Swagger/OpenAPI integration
- **Comprehensive Auditing** - Full audit trail for all operations
- **Clean Code** - Lombok for reduced boilerplate
- **Data Access Layer** - Spring Data JPA repositories

---

## 🔧 Technologies Used

<table>
<tr>
<td align="center" width="200px">

### 🏗️ **Core Framework**
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-6DB33F?style=flat-square&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)

</td>
<td align="center" width="200px">

### 💾 **Database**
![H2](https://img.shields.io/badge/H2-1E90FF?style=flat-square&logo=h2&logoColor=white)

### 🔐 **Security**
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens)
![BCrypt](https://img.shields.io/badge/BCrypt-FF6B6B?style=flat-square)

</td>
<td align="center" width="200px">

### 📖 **Documentation**
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square&logo=openapi-initiative&logoColor=white)

### 🔨 **Utilities**
![Lombok](https://img.shields.io/badge/Lombok-BC4521?style=flat-square)
![ModelMapper](https://img.shields.io/badge/ModelMapper-4285F4?style=flat-square)

</td>
</tr>
</table>

---

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ☕ **Java 21 JDK** or higher
- 📦 **Maven 3.6+** for dependency management
- 🔧 **Git** for version control

### 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vanhayten/Digital_Banking.git
   cd digital-banking-backend
   ```

2. **Build the project:**
   ```bash
   mvnd clean install
   ```

### ▶️ Running the Application

```bash
mvnd spring-boot:run
```

> 🌐 **The application will be available at:** http://localhost:8080

---

## 📚 API Documentation

<div align="center">

### 🎯 Interactive API Explorer

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Swagger UI** | http://localhost:8080/swagger-ui/index.html | Interactive API documentation |
| 📄 **OpenAPI JSON** | http://localhost:8080/v3/api-docs | Raw API specification |

</div>

---

## 🔒 Security

### 🎫 **JWT Authentication**

After registration or login, include the JWT token in your requests:

```http
Authorization: Bearer <your_token>
```

### 👤 **User Roles**

| Role | Permissions