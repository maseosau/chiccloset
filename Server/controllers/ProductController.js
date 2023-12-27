const productsModel = require('../models/productsModel');

class ProductController {
    async getProductById(req, res, next) {
        try {
            const productId = req.params.productId;

            const product = await productsModel.findById(productId);

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                message: 'Product information retrieved successfully',
                product: product,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await productsModel.find();

            if (!products) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                message: 'Product information retrieved successfully',
                products: products,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    async getProductsByCategory(req, res, next) {
        try {
            const category = req.params.category;

            // Tìm kiếm sản phẩm với category là 'áo'
            const products = await productsModel.find({ category });

            if (!products || products.length === 0) {
                return res.status(404).json({
                    message: 'Không tìm thấy sản phẩm có category là "áo"',
                });
            }

            res.status(200).json({
                message: 'Danh sách sản phẩm có category "áo"',
                products: products,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Lỗi máy chủ nội bộ',
            });
        }
    }
    async search(req, res, next) {
        try {
            const keyword = req.params.keyword;
            
            const products = await productsModel.find({
                $or: [
                  { title: { $regex: keyword, $options: 'i' } }, 
                  { description: { $regex: keyword, $options: 'i' } }, 
                  { category: { $regex: keyword, $options: 'i' } }, 
                ],
              });

            res.status(200).json({
                products: products,
                message: 'Kết quả tìm kiếm thành công',
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Lỗi máy chủ nội bộ',
            });
        }
    }
}

module.exports = new ProductController;