export const EXPORT_FILE_TYPES = [
	'css',
	'scss',
	'less',
	'android',
	'ios-swift',
	'flutter'
] as const

export type ExportFileTypes = (typeof EXPORT_FILE_TYPES)[number]

export interface FileTypeConfig {
	transformGroup: string
	buildPath: string
	files: {
		destination: string
		format: string
	}[]
}

export const FILE_TYPE_CONFIGS: {
	[key in ExportFileTypes]: FileTypeConfig
} = {
	css: {
		transformGroup: 'css',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.css',
				format: 'css/variables'
			}
		]
	},
	scss: {
		transformGroup: 'scss',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.scss',
				format: 'scss/variables'
			}
		]
	},
	less: {
		transformGroup: 'less',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.less',
				format: 'less/variables'
			}
		]
	},
	android: {
		transformGroup: 'android',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.xml',
				format: 'android/resources'
			}
		]
	},
	'ios-swift': {
		transformGroup: 'ios-swift',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.swift',
				format: 'ios-swift/class.swift'
			}
		]
	},
	flutter: {
		transformGroup: 'flutter',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.dart',
				format: 'flutter/class.dart'
			}
		]
	}
}
