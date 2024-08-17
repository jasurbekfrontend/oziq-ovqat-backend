Endpointlar
1. Mahsulot qo'shish
URL: /products
Metod: POST
Tavsif: Yangi mahsulot qo'shadi.
Tana (Body):

{
"name": "Mahsulot nomi",
"buy_price": 1000,
"sell_price": 1500,
"quantity": 10,
"olcham": "O'lcham",
"category": "Kategoriya",
"barcode": "123456789"
}
Javob (Response):
Muvaffaqiyatli qo'shilsa:

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
Xato holatda: 500 Server Error
2. Mahsulotlar ro'yxatini olish
URL: /products
Metod: GET
Tavsif: Barcha mahsulotlarni ro'yxatga oladi.
Javob (Response):
Muvaffaqiyatli olinsa:

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
Xato holatda: 500 Server Error
3. Admin tizimiga kirish
URL: /login
Metod: POST
Tavsif: Admin tizimiga kirish uchun login va parolni tekshiradi va JWT token beradi.
Tana (Body):

{
"login": "admin",
"password": "admin"
}
Javob (Response):
Muvaffaqiyatli kirish holatda:

{
"token": "JWT_TOKEN"
}
Xato holatda:

{
"message": "Login yoki parol noto'g'ri"
}
401 Unauthorized
Eslatma: Har bir javobning holati va xato holatlari serverning qanday ishlashiga bog'liq bo'lishi mumkin. Xatoliklar yoki muvaffaqiyatli javoblar ko'rsatilgan usullarda ham mavjud bo'lishi mumkin.
