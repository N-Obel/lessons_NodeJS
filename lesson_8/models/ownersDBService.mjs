import Owner from "../models/Owner.mjs";

class OwnersDBService {
	static async getList() {
		try {
			const res = await Owner.find({})
			console.log('=====>>> res owners <<<======');
			console.log(res);
			return res
		} catch (error) {
			console.log('=====>>> error owners <<<======');
			console.log(error);
			return []
		}
	}
}

export default OwnersDBService