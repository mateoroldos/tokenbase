const roundNumber = (number: number, decimals: number): number => {
	return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export default roundNumber
