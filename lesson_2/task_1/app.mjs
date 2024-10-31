//========================================================================================================================================================
// Задача 1. -->> У консольний додаток передають через параметр пенсійний вік. 
// 						Наприклад: node app.mjs –-pension=65
// 				Потім питаємо у терміналі користувача скільки йому років (використати “readline”) 
// 						і кажемо чи він є пенсіонером.
//========================================================================================================================================================

import readline from 'node:readline'

const argsString = process.argv.slice(2).join('&')
const argsURLParams = new URLSearchParams(argsString)
const pensionAge = parseInt(argsURLParams.get('--pension'))

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.question(
	'Скільки Вам років?',
	(answer) => {
		if(answer >= pensionAge ) console.log(`Вітаємо Ви пенсіонер`);
		else console.log(`Вам ще далеко до пенсії`);
		rl.close()
	}
)
