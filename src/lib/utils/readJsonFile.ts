export const readJsonFile = (file: File): Promise<'string'> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (event: any) => {
			try {
				const json = event.target.result
				resolve(json)
			} catch (error) {
				reject(error)
			}
		}
		reader.readAsText(file)
	})
}

export default readJsonFile
