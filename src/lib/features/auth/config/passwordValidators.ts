export const MAX_PASSWORD_SIZE = 30 as const

export const MIN_PASSWORD_SIZE = 8 as const

export const PASSWORD_UPPERCASE = (v: string) => /^(?=.*[A-Z]).+$/g.test(v)
export const PASSWORD_UPPERCASE_MESSAGE = {
	message: 'At least one uppercase needed'
}

export const PASSWORD_LOWERCASE = (v: string) => /^(?=.*[a-z]).+$/g.test(v)
export const PASSWORD_LOWERCASE_MESSAGE = {
	message: 'At least one lowercase needed'
}

export const PASSWORD_NUMBER = (v: string) => /^(?=.*[0-9]).+$/g.test(v)
export const PASSWORD_NUMBER_MESSAGE = { message: 'At least one number needed' }

export const PASSWORD_CONFIRM_VALIDATION = (data: {
	password: string
	confirmPassword: string
}) => data.password === data.confirmPassword
export const PASSWORD_CONFIRM_VALIDATION_MESSAGE = {
	message: "Passwords don't match",
	path: ['confirmPassword']
}
