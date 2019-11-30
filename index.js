
// let cv = document.getElementsByTagName('canvas')[0]
// let ct = cv.getContext('2d')
// 
// cv.height = 100
// cv.width  = 100
// 
// document.addEventListener('load', e => {
// 	ct.drawImage(image, 33, 71)
// })

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
	let weightMatricies = initWeightMatricies(layers)
	console.log('weightMatricies', weightMatricies)
	let biases = initBiases(layers)
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
		calculateError () {
			
		},
		backPropagation () {
			
		}
	}
}

// TODO: specify activation function for each layer
let ann = ANN([2, 3, 2], ['cat', 'dog'])

console.log(ann.forwardPropagation([[1, 2]]))

// console.log(initBiases([2, 3, 2]))

// TODO: randomly change weights during computations
// TODO: does it make the network more robust if we remove random or specific
// nodes during the computation?

// console.log(initWeightMatricies([2, 3]))
