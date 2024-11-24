import Car from "../models/Car.mjs";

class CarsDBService {
	static async getList() {
		try {
			const exists = await Car.checkCollectionExists
			if (exists) {
				const data = await Car.find().exec()
				console.log('=====>>> data <<<======');
				console.log(data);
				return data
			}
			return (await Car.find({})) ?? []
		} catch (error) {
			return []
		}
	}

	static async create(data) {
		try {
			const car = new Car(data);
			return await car.save();
		} catch (error) {
			console.error('Помилка при створенні:', error);
			throw error;
		}
	}

	static async getById(id) {
		try {
			return await Car.findById(id);
		} catch (error) {
			console.error(`Помилка при отриманні авто за ідентифікатором - ${id}:`, error);
			return null;
		}
	}

	static async update(id, data) {
		try {
			return await Car.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true,
			});
		} catch (error) {
			console.error(`Помилка при оновленні даних авто за ідентифікатором - ${id}:`, error);
			throw error;
		}
	}

	static async deleteById(id) {
		try {
			return await Car.findByIdAndDelete(id);
		} catch (error) {
			console.error(`Помилка при видаленні авто за ідентифікатором - ${id}:`, error);
			return null;
		}
	}
}

export default CarsDBService
