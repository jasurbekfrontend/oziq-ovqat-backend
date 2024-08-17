# API Documentation

## Endpoints

### 1. Mahsulot Qo'shish
- **URL:** `/products`
- **Method:** `POST`
- **Description:** Yangi mahsulot qo'shadi.
- **Request Body:**
    ```json
    {
        "name": "Mahsulot nomi",
        "buy_price": 1000,
        "sell_price": 1500,
        "quantity": 10,
        "olcham": "O'lcham",
        "category": "Kategoriya",
        "barcode": "123456789"
    }
    ```
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
    ```json
    {
        "_id": "60d5c0ef1c9d5b001f6b2a2d",
        "name": "Mahsulot nomi",
        "buy_price": 1000,
        "sell_price": 1500,
        "quantity": 10,
        "olcham": "O'lcham",
        "category": "Kategoriya",
        "barcode": "123456789",
        "__v": 0
    }
    ```
- **Error Response:**
    - **Code:** 500 Server Error

### 2. Mahsulotlar Ro'yxatini Olish
- **URL:** `/products`
- **Method:** `GET`
- **Description:** Barcha mahsulotlarni ro'yxatga oladi.
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
    ```json
    [
        {
            "_id": "60d5c0ef1c9d5b001f6b2a2d",
            "name": "Mahsulot nomi",
            "buy_price": 1000,
            "sell_price": 1500,
            "quantity": 10,
            "olcham": "O'lcham",
            "category": "Kategoriya",
            "barcode": "123456789",
            "__v": 0
        }
        // Boshqa mahsulotlar
    ]
    ```
- **Error Response:**
    - **Code:** 500 Server Error

### 3. Admin Tizimiga Kirish
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Admin tizimiga kirish uchun login va parolni tekshiradi va JWT token beradi.
- **Request Body:**
    ```json
    {
        "login": "admin",
        "password": "admin"
    }
    ```
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
    ```json
    {
        "token": "JWT_TOKEN"
    }
    ```
- **Error Response:**
    - **Code:** 401 Unauthorized
    - **Content:**
    ```json
    {
        "message": "Login yoki parol noto'g'ri"
    }
    ```

### 4. Mahsulotni O'chirish
- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** ID bo'yicha mahsulotni o'chiradi.
- **URL Parameters:**
    - **Required:** `id=[string]` (Mahsulotning ID-si)
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
    ```json
    {
        "message": "Product deleted successfully",
        "deletedItem": {
            "_id": "60d5c0ef1c9d5b001f6b2a2d",
            "name": "Mahsulot nomi",
            "buy_price": 1000,
            "sell_price": 1500,
            "quantity": 10,
            "olcham": "O'lcham",
            "category": "Kategoriya",
            "barcode": "123456789",
            "__v": 0
        }
    }
    ```
- **Error Response:**
    - **Code:** 404 Not Found
    - **Content:**
    ```json
    {
        "message": "Product not found"
    }
    ```
    - **Code:** 500 Server Error

### 5. Mahsulotni Tahrirlash
- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** ID bo'yicha mahsulotni yangilaydi.
- **URL Parameters:**
    - **Required:** `id=[string]` (Mahsulotning ID-si)
- **Request Body:**
    ```json
    {
        "name": "Yangilangan mahsulot nomi",
        "buy_price": 1200,
        "sell_price": 1700,
        "quantity": 15,
        "olcham": "Yangilangan o'lcham",
        "category": "Yangilangan kategoriya",
        "barcode": "987654321"
    }
    ```
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
    ```json
    {
        "message": "Product updated successfully",
        "updatedItem": {
            "_id": "60d5c0ef1c9d5b001f6b2a2d",
            "name": "Yangilangan mahsulot nomi",
            "buy_price": 1200,
            "sell_price": 1700,
            "quantity": 15,
            "olcham": "Yangilangan o'lcham",
            "category": "Yangilangan kategoriya",
            "barcode": "987654321",
            "__v": 0
        }
    }
    ```
- **Error Response:**
    - **Code:** 404 Not Found
    - **Content:**
    ```json
    {
        "message": "Product not found"
    }
    ```
    - **Code:** 500 Server Error

    

**Eslatma:** Har bir javobning holati va xato holatlari serverning qanday ishlashiga bog'liq bo'lishi mumkin. Xatoliklar yoki muvaffaqiyatli javoblar ko'rsatilgan usullarda ham mavjud bo'lishi mumkin.
