const Product = require('../model/product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { title, desc, price, image, rating, category } = req.body;

        // check product is existing
        const isExsting = await Product.findOne({ title });
        if (isExsting)
            return res.status(400).json({ message: 'Product is already exists.' });

        // Create new Product
        const product = new Product({

            title,
            desc,
            price,
            image,
            rating,
            category
        });
        await product.save();

        res.status(201).json({ product_id: product.id, message: 'Product registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Product 
exports.getAllProduct = async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;

        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                category: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get SPecific Product
exports.getProduct = async (req, res) => {
    try {
        const getProduct = await Product.findById(req.params.id);

        if (!getProduct)
            return res.status(400).json({ message: 'Product is not Found.' });

        const { id, title, desc, price, rating, image } = getProduct;

        res.status(200).json({ product_id: id, title, desc, price, rating, image });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Specific Product
exports.updateProduct = async (req, res) => {
    try {
        const getProduct = await Product.findOne({ _id: req.params.id });

        if (!getProduct)
            return res.status(400).json({ message: 'Product is not found.' });

        const updateProduct = await Product.findOneAndUpdate({ _id: req.params.id },
            {
                $set: req.body
            },
            { new: true });
        await updateProduct.save();

        const {id, title, desc, price, rating, image, category } = updateProduct;
        res.status(200).json({ product_id: id, title, desc, price, rating, image, category, message: 'Product is updated.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const getProduct = await Product.findOneAndDelete({ _id: req.params.id });

        if (!getProduct)
            return res.status(400).json({ message: 'Product is not Found.' });

        res.status(200).json({ getProduct, message: 'Product is deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
