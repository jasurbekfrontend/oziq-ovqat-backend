const ProductModel = require('../model/product.model');
const jwt = require('jsonwebtoken');
const ArchivedProductModel = require('../model/archivedProduct.model');

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

exports.loginAdmin = async (req, res) => {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'admin') {
        const secretKey = 'banan';
        const token = jwt.sign({ role: 'admin' }, secretKey, { expiresIn: '7d' });

        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Login yoki parol noto\'g\'ri' });
    }
};

// Mahsulotni o\'chirish
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await ProductModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json({ message: 'Mahsulot muvaffaqiyatli o\'chirildi', deletedItem });
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
exports.archiveProduct = async (req, res) => {
    try {
        const { sold_quantity, product_id, sold_date } = req.body;

        // Mahsulotni olish
        const product = await ProductModel.findById(product_id);

        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        // Mavjud miqdordan kamaytirish uchun tekshirish
        if (product.quantity < sold_quantity) {
            return res.status(400).json({ message: 'Arxivlash uchun yetarli miqdor mavjud emas' });
        }

        // Mahsulot miqdorini kamaytirish
        product.quantity -= sold_quantity;
        await product.save();

        // Arxivlangan mahsulotni yaratish va saqlash
        const archivedProduct = new ArchivedProductModel({
            product_id,
            sold_quantity,
            sold_date
        });

        await archivedProduct.save();

        res.json({ message: 'Mahsulot muvaffaqiyatli arxivlandi', archivedProduct });
    } catch (err) {
        res.status(500).send('Server xatosi');
    }
};
