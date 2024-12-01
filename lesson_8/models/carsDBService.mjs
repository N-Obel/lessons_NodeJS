import Car from "../models/Car.mjs";

class CarsDBService {
	static async getList() {
		try {
			const data = await Car.find().populate('owner', 'ownerName ownerCity').exec()
			console.log('=======>>>> data new')
			console.log(data)
			return data
		} catch (error) {
			console.log('====>>> error')
			console.log(error)
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
			return await Car.findById(id).populate('owner', 'ownerName ownerCity').exec();
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
