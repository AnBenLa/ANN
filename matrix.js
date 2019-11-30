
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
