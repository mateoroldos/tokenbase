export const findErrorByName = (
	errors: { [key: string]: any },
	name: string
) => {
	if (errors.hasOwnProperty(name)) {
		return errors[name]
	} else {
		return null
	}
}
