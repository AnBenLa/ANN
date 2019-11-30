
// let cv = document.getElementsByTagName('canvas')[0]
// let ct = cv.getContext('2d')
// 
// cv.height = 100
// cv.width  = 100
// 
// document.addEventListener('load', e => {
// 	ct.drawImage(image, 33, 71)
// })

// this values can be used to test the forward propagation

let inputTemp = [[1, 2]]
let calculatedOuput = [[2.5869, 3.1544]]
let wishedOuput = [[2.6, 3.2]]


let weightMatriciesTemp = [[
	[0.99, 0.38, 0.27], 
	[0.29, 0.96, 0.17]
], [
	[0.46, 0.01], 
	[0.45, 0.81], 
	[0.07, 0.22]
]]

let biasesTemp = [[
	[0.56, 0.85, 0.67]
], [
	[0.1, 0.3]
]]

let errorFunctions = {
	meanSquared : (computed, expected) => {
		if (computed[0].length != expected[0].length)
			return console.error('expected dimensions do not agree')
		let sum = 0
		for (let i = 0; i < computed[0].length; i ++)
			sum += (computed[0][i] - expected[0][i]) ** 2
		return sum / (2 * computed[0].length)
	}
}

let activationFunctions = {
	sigmoid : {
		f : x => 1 / (1 + Math.E ** -x), 
		i : x => Math.log(x / (1 - x))
	},
	linear : {
		f : x => x,
		i : x => x
	}
}

let multiply = (a, b) => {
	if (a[0].length != b.length) 
		return console.error('matrix dimensions do not agree')
	let c = []
	for (let y = 0; y < a.length; y ++) {
		if (!c[y]) c[y] = []
		for (let x = 0; x < b[0].length; x ++) {
			if (!c[y][x]) c[y][x] = 0
			for (let k = 0; k < a[0].length; k ++) {
				c[y][x] += a[y][k] * b[k][x]
			}
		}
	}
	return c
}

let createMatrix = (width, height) => {
	let matrix = []
	for (let y = 0; y < height; y ++) {
		if (!matrix[y]) matrix[y] = []
		for (let x = 0; x < width; x ++)
			matrix[y][x] = Math.round(Math.random() * 100) / 100
	}
	return matrix
}
	
let initWeightMatricies = layers => {
	let weights = []
	for (let l = 0; l < layers.length - 1; l ++)
		weights[l] = createMatrix(layers[l + 1], layers[l])
	return weights
}

let initBiases = layers => {
	let out = []
	for (let i = 0; i < layers.length - 1; i ++) {
		if (!out[i]) out[i] = [[]]
		for (let n = 0; n < layers[i + 1]; n ++)
			out[i][0][n] = Math.round(Math.random() * 100) / 100
	}
	return out
}

let applyActivationFunction = (input, activationFunction) => {
	output = [[]]
	for (let i = 0; i < input[0].length; i ++)
		output[0][i] = 
			activationFunctions[activationFunction]
			.f(input[0][i])
	return output
}

let applyBias = (temp, bias) => {
	if (temp[0].length != bias[0].length)
		return console.error('bias dimensions do not agree')
	for (let i = 0; i < temp[0].length; i ++)
		temp[0][i] += bias[0][i]
	return temp
}

let ANN = (layers, labels, activationFunction) => {
	let weightMatricies = weightMatriciesTemp //initWeightMatricies(layers)
	console.log('weightMatricies', weightMatricies)
	let biases = biasesTemp //initBiases(layers)
	console.log('biases', biases)
	return {
		forwardPropagation (input) {
			if (layers[0] != input[0].length)
				return console.error('input dimensions do not agree')
			temp = input
			for (let i = 0; i < weightMatricies.length; i++) {
				temp = multiply(temp, weightMatricies[i])
				temp = applyBias(temp, biases[i])
				temp = applyActivationFunction(temp, 'linear')
			}
			return temp
		},
		calculateError (input, output, errorFunction) {
			let computedOutput = this.forwardPropagation(input)
			return errorFunctions[errorFunction](computedOutput, output)
		},
		backPropagation () {
			
		}
	}
}

// TODO: specify activation function for each layer
let ann = ANN([2, 3, 2], ['cat', 'dog'])
console.log(ann.forwardPropagation(inputTemp))
console.log(ann.calculateError(inputTemp, [[2.6, 3.2]], 'meanSquared'))

// console.log(initBiases([2, 3, 2]))

// TODO: randomly change weights during computations
// TODO: does it make the network more robust if we remove random or specific
// nodes during the computation?

// console.log(initWeightMatricies([2, 3]))
