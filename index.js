
// let cv = document.getElementsByTagName('canvas')[0]
// let ct = cv.getContext('2d')
// 
// cv.height = 100
// cv.width  = 100
// 
// document.addEventListener('load', e => {
// 	ct.drawImage(image, 33, 71)
// })

let createMatrix = (width, height) => {
	let matrix = []
	for (let y = 0; y < height; y ++) {
		if (!matrix[y]) matrix[y] = []
		for (let x = 0; x < width; x ++) {
			matrix[y][x] = Math.random()
		}
	}
	return matrix
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
	
let initWeightMatricies = layers => {
	let weights = []
	for (let l = 0; l < layers.length - 1; l ++)
		weights[l] = createMatrix(layers[l + 1], layers[l])
	return weights
}

let applyActivationFunction = (input, activationFunction) => {
	output = [[]]
	for (let i = 0; i < input[0].length; i ++) {
		output[0][i] = 
			activationFunctions[activationFunction]
			.f(input[0][i])
	}
	return output
}

let ANN = (layers, labels, activationFunction) => {
	let weightMatricies = initWeightMatricies(layers)
	return {
		forwardPropagation (input) {
			if (layers[0] != input[0].length)
				return console.error('input dimensions do not agree')
			cur_input = input
			for (let i = 0; i < weightMatricies.length; i++) {
				cur_input = multiply(cur_input, weightMatricies[i])
				cur_input = applyActivationFunction(
					cur_input, 'sigmoid')
			}
		},
		backPropagation () {
			
		}
	}
}

// TODO: specify activation function for each layer
let ann = ANN([2, 3], ['cat', 'dog'])

// TODO: randomly change weights during computations
// TODO: does it make the network more robust if we remove random or specific
// nodes during the computation?

// console.log(initWeightMatricies([2, 3]))
