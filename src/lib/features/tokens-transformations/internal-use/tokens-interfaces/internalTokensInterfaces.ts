export interface ColorToken {
	type: 'color'
	value: [number, number, number]
}

export interface DimensionToken {
	type: 'dimension'
	value: {
		value: number
		unit: 'px' | 'rem'
	}
}

export interface FontFamilyToken {
	type: 'fontFamily'
	value: string[]
}

export interface FontWeightToken {
	type: 'fontWeight'
	value: string | number
}

export interface DurationToken {
	type: 'duration'
	value: number
}

export interface CubicBezierToken {
	type: 'cubicBezier'
	value: [number, number, number, number]
}

export interface NumberToken {
	type: 'number'
	value: number
}
