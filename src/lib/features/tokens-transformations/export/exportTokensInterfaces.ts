export interface ExportColorToken {
	type: 'color'
	value: string
}

export interface ExportDimensionToken {
	type: 'dimension'
	value: string
}

export interface ExportFontFamilyToken {
	type: 'fontFamily'
	value: string[]
}

export interface ExportFontWeightToken {
	type: 'fontWeight'
	value: string | number
}

export interface ExportDurationToken {
	type: 'duration'
	value: string
}

export interface ExportCubicBezierToken {
	type: 'cubicBezier'
	value: [number, number, number, number]
}

export interface ExportNumberToken {
	type: 'number'
	value: number
}
