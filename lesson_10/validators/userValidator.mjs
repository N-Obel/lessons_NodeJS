import { validationResult } from 'express-validator'
import fs from 'fs'

class UserValidator {
	static userSchema = {
		email: {
			isEmail: {
				errorMessage: 'Invalid email address',
			},
			normalizeEmail: true, 
		},
		password: {
			isLength: {
				options: { min: 3 },
				errorMessage: 'Password must be at least 3 characters long',
			},
			trim: true, 
			escape: true, 
		},
		// username: {
		// 	notEmpty: {
		// 		errorMessage: 'Name is required',
		// 	},
		// 	isLength: {
		// 		options: { min: 3 },
		// 		errorMessage: 'Username must be at least 3 characters long',
		// 	},
		// 	trim: true, 
		// 	escape: true, 
		// },
	}
	static checkFile(req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			if (req.file) {
				// Видаляємо завантажений файл, якщо поля не валідні
				fs.unlinkSync(req.file.path)
			}
		}
		next()
	}
}

export default UserValidator
