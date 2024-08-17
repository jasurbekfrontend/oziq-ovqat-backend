const ProductModel = require('../model/product.model');
const jwt = require('jsonwebtoken');

exports.createProduct = async (req, res) => {
    try {
        const newItem = new ProductModel(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

exports.getProducts = async (req, res) => {
    try {
        const items = await ProductModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
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

// Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await ProductModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', deletedItem });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Edit a Product
exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', updatedItem });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ProductModel.findById(id);

        if (!item) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(item);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
}