export const EXPORT_FILE_TYPES = [
	{ name: 'css', icon: 'bxl:css3' },
	{ name: 'scss', icon: 'bi:filetype-scss' },
	{ name: 'less', icon: 'bxl:less' },
	{ name: 'android', icon: 'material-symbols:android' },
	{ name: 'ios-swift', icon: 'simple-icons:ios' },
	{ name: 'flutter', icon: 'material-symbols:flutter' },
	{ name: 'json', icon: 'bx:file-blank' }
] as const

export type ExportFileTypes = (typeof EXPORT_FILE_TYPES)[number]['name']

export interface FileTypeConfig {
	transformGroup: string
	buildPath: string
	files: {
		destination: string
		format: string
	}[]
}

export const FILE_TYPE_CONFIGS: {
	[key in ExportFileTypes]: FileTypeConfig & { icon: string }
} = {
	css: {
		icon: 'bxl:css3',
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
		icon: 'scss-icon',
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
		icon: 'bxl:less',
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
		icon: 'material-symbols:android',
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
		icon: 'simple-icons:ios',
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
		icon: 'material-symbols:flutter',
		transformGroup: 'flutter',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.dart',
				format: 'flutter/class.dart'
			}
		]
	},
	json: {
		icon: 'material-symbols:flutter',
		transformGroup: 'json',
		buildPath: 'build/',
		files: [
			{
				destination: 'variables.json',
				format: 'json/flat'
			}
		]
	}
}
