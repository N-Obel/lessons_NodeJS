import Owner from "./Owner.mjs";

class OwnersDBService {
	static async getList() {
		try {
			const res = await Owner.find({})
			return res
		} catch (error) {
			console.log('=====>>> error owners <<<======');
			console.log(error);
			return []
		}
	}
}

export default OwnersDBService