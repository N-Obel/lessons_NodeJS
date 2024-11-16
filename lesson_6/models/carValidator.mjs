class CarValidator {

	static carValidationSchema = {
		carBrand: {
			isLength: {
				options: { min: 3, max: 20 },
				notEmpty: { errorMessage: 'Введіть марку авто!' },
				errorMessage: 'Марка авто має бути від 3 до 20 символів',
			},
			trim: true,
			escape: true,
		},
		carYear: {
			isLength: {
				options: { min: 4, max: 4 },
				notEmpty: { errorMessage: 'Введіть рік випуску авто!' },
				errorMessage: 'Рік випуску авто складає 4 цифри!',
			},
			trim: true,
			escape: true,
		},
		carNum: {
			isLength: {
				options: { min: 8, max: 10 },
				notEmpty: { errorMessage: 'Введіть державний номер авто!' },
				errorMessage: 'Державний номер має складати 8 символів!',
			},
			trim: true,
			escape: true,
		},
		carImg: {
			trim: true,
			escape: true,
		}
	}
}

export default CarValidator