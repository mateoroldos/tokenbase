import { fs } from 'memfs'
import JSZip from 'jszip'

export const downloadDirectory = async (directoryPath: string) => {
	const zip = new JSZip()

	// Recursively add files from the directory to the ZIP archive
	const addFilesToZip = (folderPath: string, zip: JSZip) => {
		const files = fs.readdirSync(folderPath) as string[]
		files.forEach((file) => {
			const filePath = `${folderPath}/${file}`
			if (fs.statSync(filePath).isDirectory()) {
				// If the file is a directory, recursively add its contents to the ZIP archive
				const subfolder = zip.folder(file) as JSZip
				addFilesToZip(filePath, subfolder)
			} else {
				// If the file is a regular file, add it to the ZIP archive
				const fileContent = fs.readFileSync(filePath)
				zip.file(file, fileContent)
			}
		})
	}

	addFilesToZip(directoryPath, zip)

	// Generate the ZIP file asynchronously
	const blob = await zip.generateAsync({ type: 'blob' })

	// Create a download link and trigger the download
	const a = document.createElement('a')
	const url = URL.createObjectURL(blob)
	const directoryName = directoryPath.replace(/^\//, '') // Remove leading slash
	a.href = url
	a.download = `${directoryName}.zip`

	// Trigger the download
	a.click()

	// Clean up
	URL.revokeObjectURL(url)
}
