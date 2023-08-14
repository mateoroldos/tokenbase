import type { IToken } from '../token-groups-store/types/token-interface'
import type { Group } from '../token-groups-store/types/group-interface'
import { v4 as uuidv4 } from 'uuid'
import { get } from 'svelte/store'
import designTokensGroupStore from '../token-groups-store/groups'
import type { StyleDictionaryGroup } from './types/style-dictionary-group.interface'
import styleDictionaryTokenToIToken from './styleDictionaryTokenToIToken'
import type { StyleDictionaryToken } from './types/style-dictionary-token.interface'

const buildStyleDictionaryNode = (
	styleDictionaryGroup: StyleDictionaryGroup,
	parentId: string,
	isRoot: boolean,
	name?: string
): Group[] => {
	// Esta funcion recorre cada uno de los grupos y tokens de un objeto de Style Dictionary (StyleDictionaryGroup)
	// y los transforma en un array de grupos y tokens que es lo que utilizamos
	// internamente en nuestra aplicación

	// PASO 1: Chequeamos que el styleDictionaryGroup sea un objeto valido
	if (typeof styleDictionaryGroup !== 'object') {
		throw new Error('Invalid style dictionary group')
	}

	// Variables que vamos a utilizar
	const tokens: IToken[] = [] // aca guardamos los tokens de este grupo
	const groupId = uuidv4() // nueva id para el grupo en el q estamos trabajndo
	const groups: Group[] = [] // array donde vamos a ir guardando todos los grupos

	// PASO 2: Recorremos cada uno de los elementos del styleDictionaryGroup
	// Tenemos 2 casos:
	// 1. Es un token
	// 2. Es un grupo
	Object.entries(styleDictionaryGroup).forEach(([key, data]) => {
		// Caso 1. Es un token
		if (data.type && data.value) {
			const token: StyleDictionaryToken = data as StyleDictionaryToken

			tokens.push(styleDictionaryTokenToIToken(token, key))
			// Caso 2. Es un grupo
		} else {
			// Build all child groups
			let subGroups = buildStyleDictionaryNode(
				data as StyleDictionaryGroup,
				isRoot ? parentId : groupId, // Si es root, el parentId del nodo es el que viene por parametro, sino es el groupId que estamos recorriendo
				false,
				key
			)

			groups.push(...subGroups)
		}
	})

	// PASO 3: Creamos el grupo padre que guarda toodo
	// Tenemos 2 casos:
	// 1. Estamos armando un grupo que ya existe en nuestra store
	// 2. Estamos armando un grupo que no existe en nuestra store
	const existingGroup = get(designTokensGroupStore).find(
		(g) => g.id === parentId
	)

	// Caso 1. Estamos armando un grupo que ya existe en nuestra store
	// Si el grupo ya existe en nuestra store, lo que hacemos es agregarle los tokens que acabamos de recorrer a los tokens ya existentes
	// Esto solo puede suceder si estamos armando el grupo root
	if (existingGroup && isRoot) {
		let updatedGroup = {
			...existingGroup,
			tokens: [...existingGroup.tokens, ...tokens]
		}

		groups.push(updatedGroup)

		// Caso 2. Estamos armando un grupo que no existe en nuestra store
		// Si el grupo no existe en nuestra store, lo que hacemos es crear un nuevo grupo con los tokens que acabamos de recorrer
	} else {
		const newGroup: Group = {
			id: groupId,
			name: name || 'Unnamed group',
			parentGroup: parentId,
			tokens
		}

		groups.push(newGroup)
	}

	// PASO 4: Una vez tenemos todos los grupos armados
	// y si estamos trabajando en el root, vamos a analizar los
	// tokens de todos los grupos para transformar los alias
	// y agregarle la referencia respectiva
	if (isRoot) {
		groups.forEach((group) => {
			group.tokens.forEach((token) => {
				if (
					token.value.toString().startsWith('{') &&
					token.value.toString().endsWith('}')
				) {
					const alias = token.value.toString().replace('{', '').replace('}', '')

					const aliasRouteArray = alias.split('.')

					// {group1.gtoup2.fwefewf.paragraphSpacing.0}
					// {group2.gtoup3.gew.paragraphSpacing.0}

					const referencedGroupName =
						aliasRouteArray[aliasRouteArray.length - 2] // paragraphSpacing
					const referencedTokenName =
						aliasRouteArray[aliasRouteArray.length - 1] // 0

					const referencedGroup = groups.find(
						(g) => g.name === referencedGroupName
					)

					let referencedToken: IToken | undefined

					if (referencedGroup) {
						referencedToken = referencedGroup.tokens.find(
							(t) => t.name === referencedTokenName
						)
					}

					if (referencedGroup && referencedToken) {
						token.alias = {
							groupId: referencedGroup.id,
							tokenId: referencedToken.id
						}
					}
				}
			})
		})
	}

	return groups
}

const styleDictionaryToGroups = (json: string, parentId: string): Group[] => {
	const styleDictionaryGroup: StyleDictionaryGroup = JSON.parse(json)

	return buildStyleDictionaryNode(styleDictionaryGroup, parentId, true)
}

export default styleDictionaryToGroups
