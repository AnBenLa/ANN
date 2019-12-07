
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

let inputTemp = [1, 2]
let calculatedOuput = [2.5869, 3.1544]
let wishedOuput = [2.6, 3.2]
let error = 0.0005627425000000077


let weightMatriciesTemp = [[
	[0.99, 0.38, 0.27], 
	[0.29, 0.96, 0.17]
], [
	[0.46, 0.01], 
	[0.45, 0.81], 
	[0.07, 0.22]
]]

let biasesTemp = [
	[0.56, 0.85, 0.67],
	[0.1, 0.3]
]

let errorFunctions = {
	meanSquared : (computed, expected) => {
		if (computed.length != expected.length)
			return console.error('expected dimensions do not agree')
		let sum = 0
		for (let i = 0; i < computed.length; i ++)
			sum += (computed[i] - expected[i]) ** 2
		return sum / (2 * computed.length)
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
	let out = []
	for (let y = 0; y < a.length; y ++) {
		if (!out[y]) out[y] = []
		for (let x = 0; x < b[0].length; x ++) {
			if (!out[y][x]) out[y][x] = 0
			for (let i = 0; i < a[0].length; i ++)
				out[y][x] += a[y][i] * b[i][x]
		}
	}
	return out
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
	
let initWeights = layers => {
	let weights = []
	for (let l = 0; l < layers.length - 1; l ++)
		weights[l] = createMatrix(layers[l + 1], layers[l])
	return weights
}

let initBiases = layers => {
	let out = []
	for (let i = 0; i < layers.length - 1; i ++) {
		if (!out[i]) out[i] = []
		for (let n = 0; n < layers[i + 1]; n ++)
			out[i][n] = Math.round(Math.random() * 100) / 100
	}
	return out
}

let applyActivationFunction = (input, activationFunction) => {
	output = []
	for (let i = 0; i < input.length; i ++)
		output[i] = 
			activationFunctions[activationFunction]
			.f(input[i])
	return output
}

let applyBias = (temp, bias) => {
	if (temp.length != bias.length)
		return console.error('bias dimensions do not agree')
	for (let i = 0; i < temp.length; i ++)
		temp[i] += bias[i]
	return temp
}

let ANN = (layers, labels, activationFunction) => {
	let weightMatricies = weightMatriciesTemp //initWeights(layers)
	let biases = biasesTemp //initBiases(layers)
	console.log('weightMatricies', weightMatricies)
	console.log('biases', biases)
	return {
		forwardPropagation (input) {
			if (layers[0] != input.length)
				return console.error('input dimensions do not agree')
			layerTempResult = input
			for (let i = 0; i < weightMatricies.length; i ++) {
				layerTempResult = multiply([layerTempResult], weightMatricies[i])[0]
				layerTempResult = applyBias(layerTempResult, biases[i])
				layerTempResult = applyActivationFunction(layerTempResult, 'linear')
			}
			return layerTempResult
		},
		calculateError (input, output, errorFunction) {
			let computedOutput = this.forwardPropagation(input)
			return errorFunctions[errorFunction](computedOutput, output)
		},
		backPropagation () {
			
		}
	}
}

// TODO: randomly change weights during computations
// TODO: does it make the network more robust if we remove random or specific
// nodes during the computation?

// TODO: specify activation function for each layer
let ann = ANN([2, 3, 2], ['cat', 'dog'])
console.log('forward propagation', ann.forwardPropagation(inputTemp))
console.log('calculate error', ann.calculateError(inputTemp, [2.6, 3.2], 'meanSquared'))