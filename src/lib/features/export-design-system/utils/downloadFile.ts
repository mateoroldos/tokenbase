import { fs } from 'memfs'

export const downloadFile = (path: string) => {
	const blob = new Blob([fs.readFileSync(path)])
	const url = URL.createObjectURL(blob)

	const a = document.createElement('a')

	a.href = url
	a.download = path

	a.click()

	URL.revokeObjectURL(url)
}
