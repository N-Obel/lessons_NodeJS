import dataFileManager from "../utils/dataFileManager.mjs";

class Product {
	static loadProductsList() {
		try {
			return dataFileManager.loadData()
		} catch (error) {
			throw new Error("Can`t load product list!");
		}
	}

	static addNewProduct(productObject) {
		try {
			dataFileManager.addItem(
				{
					id: new Date().getTime(), ...productObject
				}
			)
		} catch (error) {
			throw new Error("Can`t add new product");
		}
	}

	static getProductById(id){
		try {
			return dataFileManager.getItemById(id)
		} catch (error) {
			throw new Error("Can`t get product ID");
		}
	}

	static updateProduct(id, productData){
		try {
			dataFileManager.updateItemById(id, productData)
		} catch (error) {
			throw new Error("Can`t update product ID");
		}
	}

	static deleteProductById(id){
		try {
			dataFileManager.deleteItemById(id)
		} catch (error) {
			throw new Error("Can`t delete product ID");
		}
	}

	static getRandomImg(){
		const images = ['rand_g1.png', 'rand_g2.png', 'rand_g3.png', 'rand_g4.png'];
		//const randImg = images[Math.floor(Math.random() * images.length)];
		return images[Math.floor(Math.random() * images.length)];
	}
}
export default Product