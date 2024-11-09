import dataFileManager from "../utils/dataFileManager.mjs";

class Car {
	static loadCarsList() {
		try {
			return dataFileManager.loadData()
		} catch (error) {
			throw new Error('Не вдалось завантажити список автомобілів')
		}
	}

	static addNewCar(carObj) {
		try {
			dataFileManager.addItem({ id: new Date().getTime(), ...carObj })
		} catch (error) {
			throw new Error('Не вдалось додати автомобіль')
		}
	}

	static getCarById(id) {
		try {
			return dataFileManager.getItemById(id)
		} catch (error) {
			throw new Error('Не вдалось завантажити автомобіль')
		}
	}

	static updateCarInfo(id, carData) {
		try {
			dataFileManager.updateItemById(id, carData)
		} catch (error) {
			throw new Error('Не вдалось оновити інформацію про автомобіль')
		}
	}

	static deleteCarInfo(id) {
		try {
			dataFileManager.deleteItemById(id)
		} catch (error) {
			throw new Error('Не вдалось видалити автомобіль')
		}
	}
}

export default Car
