var data = { a: 1, b: 2, c: 3 }
var json = JSON.stringify(data)
var blob = new Blob([json], { type: 'application/json' })

var url = URL.createObjectURL(blob)
console.log(blob)
console.log(url)

const StyleDictionary = require('style-dictionary').extend({
	source: [url],
	platforms: {
		scss: {
			transformGroup: 'scss',
			buildPath: 'build/',
			files: [
				{
					destination: 'variables.scss',
					format: 'scss/variables'
				}
			]
		}
		// ...
	}
})

StyleDictionary.buildAllPlatforms()
