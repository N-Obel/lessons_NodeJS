import Product from '../models/productModel.mjs'

class ProductsController {
	static mainProducts(req, res) {
		const productsList = Product.loadProductsList()
		res.render('products/productsList',
			{
				products: productsList,
				title: 'Каталог ігор'
			}
		)
	}

	static productDetail(req, res) {
		const id = req.params.id
		const product = Product.getProductById(id)
		res.render('products/productDetail', {
			product
		})
	}

	static addProduct(req, res) {
		res.render('products/addProduct', {
			title: 'Додай нову гру!',

			//todo --> імітація завантаження зображення
			imagePath: `/images/${Product.getRandomImg()}`
		})
	}

	static createProduct(req, res) {
		const productData = req.body
		// console.log(productData);

		productData.imagePath = `${Product.getRandomImg()}`;
		Product.addNewProduct(productData)
		res.redirect('/products')
	}
}

export default ProductsController