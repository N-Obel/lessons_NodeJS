import mongoose from "mongoose";
import config from "../config/default.mjs";

const { Schema } = mongoose

const carSchema = new Schema({
	carBrand: {
		type: String,
		required: [true, 'Введіть марку авто!'],
		minlength: [3, 'Марка авто має бути не менше 3 символів'],
		maxlength: [20, 'Марка авто має бути не більше 20 символів'],
		trim: true,
	},
	carYear: {
		type: Number,
		required: [true, 'Введіть рік випуску авто!'],
		min: [4, 'Рік випуску авто має складати 4 символи'],
		toInt: true,
	},
	carNum: {
		type: String,
		required: [true, 'Введіть державний номер авто!'],
		min: [8, 'Державний номер має складати 8 символів!'],
		max: [10, 'Державний номер має бути не більше 10 символів!'],
		trim: true,
	},
	imgSrc: {
		type: String,
		required: false,
		trim: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Owner'
	},
})

carSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
carSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: 'cars' }).toArray()
		return collections.length > 0
	}
	return false
}

const Car = mongoose.model('Car', carSchema)
export default Car
