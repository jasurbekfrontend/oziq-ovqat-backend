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
