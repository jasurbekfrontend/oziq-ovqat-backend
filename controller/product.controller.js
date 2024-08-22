const ProductModel = require('../model/product.model');
const jwt = require('jsonwebtoken');
const ArchivedProductsModel = require('../model/archivedProducts.model');

exports.createProduct = async (req, res) => {
    try {
        const newItem = new ProductModel(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
}

exports.getProducts = async (req, res) => {
    try {
        const items = await ProductModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
}



// Mahsulotni ochirish
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await ProductModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json({ message: 'Mahsulot muvaffaqiyatli ochirildi', deletedItem });
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
};

// Mahsulotni tahrirlash
exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json({ message: 'Mahsulot muvaffaqiyatli yangilandi', updatedItem });
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ProductModel.findById(id);

        if (!item) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json(item);
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
}

// Mahsulotni arxivlash
exports.sellProduct = async (req, res) => {
    try {
        const { sold_products, total_price, sold_date } = req.body;
        const soldProductDetails = [];
        for (const soldProduct of sold_products) {
            const product = await ProductModel.findById(soldProduct.product_id);
            if (!product) {
                return res.status(404).json({ message: `Mahsulot ID: ${soldProduct.product_id} topilmadi` });
            }
            if (product.quantity < soldProduct.sold_quantity) {
                return res.status(400).json({ message: `Mahsulot ID: ${soldProduct.product_id} uchun yetarli miqdor mavjud emas` });
            }
            product.quantity -= soldProduct.sold_quantity;
            await product.save();
            soldProductDetails.push({
                product_id: product._id,
                name: product.name,
                sold_quantity: soldProduct.sold_quantity,
                price: product.sell_price,
                subtotal: product.sell_price * soldProduct.sold_quantity,
            });
        }
        const archivedProduct = new ArchivedProductsModel({
            sold_date,
            total_price,
            sold_products: soldProductDetails,
        });
        await archivedProduct.save();
        res.json({ message: 'Mahsulotlar muvaffaqiyatli sotildi va arxivlandi', archivedProduct });
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
};
exports.loginAdmin = async (req, res) => {
    const { login, password } = req.body;

    let role;
    if (login === 'admin' && password === 'admin') {
        role = 'admin';
    } else if (login === 'user' && password === 'user') {
        role = 'user';
    } else {
        return res.status(401).json({ message: 'Login yoki parol notogri' });
    }

    const secretKey = 'banan';
    const token = jwt.sign({ role }, secretKey, { expiresIn: '7d' });

    return res.status(200).json({ token });
};

exports.checkToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const secretKey = 'banan';

    if (!token) {
        return res.status(401).json({ message: 'Token topilmadi' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return res.status(200).json({ role: decoded.role });
    } catch (err) {
        return res.status(401).json({ message: 'Token yaroqsiz' });
    }
};