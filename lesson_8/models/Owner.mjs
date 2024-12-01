import mongoose from "mongoose";

const { Schema } = mongoose

const ownerSchema = new Schema({
	ownerName: {
		type: String,
		required: [true, 'Вкажіть власника авто!'],
		trim: true,
	},
})

const Owner = mongoose.model('Owner', ownerSchema)
export default Owner
