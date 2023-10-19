<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { BookCopy } from 'lucide-svelte'
	import { Textarea } from '$lib/components/ui/textarea'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import jsonSuite from '../token-management/jsonSuite'
	import InputFiles from '$lib/components/ui/input/InputFiles.svelte'
	import { createEventDispatcher, onMount } from 'svelte'

	let json: string
	let desingSystemId: string
	let jsonFile: File

	function handleSubmit(event: Event) {
		const textarea = event.target as HTMLTextAreaElement
		json = textarea.value
		desingSystemId = $page.params.designSystemId as string
		res = jsonSuite(json, event.target.name)
	}
	const dispatch = createEventDispatcher()
	let res = jsonSuite.get()

	const createDesignSystemFromJson = async () => {
		try {
			if (jsonFile) {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader()
					fileReader.readAsText(jsonFile[0])
					fileReader.onload = () => {
						const desingSystemId = $page.params.designSystemId as string
						importStyleDictionary(fileReader.result as string, desingSystemId)
						dispatch('load-template', jsonFile)
						closeModal()
					}
				})
			} else {
				importStyleDictionary(json, desingSystemId)
				dispatch('load-template', jsonFile)
				closeModal()
			}
		} catch (error) {
			alert('JSON is not valid')
		}
	}

	let open: boolean
	const closeModal = () => {
		open = false
	}

	// 	async function fetchWithRetry(url:string, refreshToken:string) {
	//   try {
	//     // Intenta realizar la solicitud original
	//     const response = await fetch(url);

	//     // Si la respuesta es exitosa, devuélvela
	//     if (response.ok) {
	//       return response;
	//     }

	//     // Si la respuesta es unauthorizado, intenta renovar el token
	//     if (response.status === 401 && refreshToken) {
	//       await renewAccessToken(refreshToken);

	//       // Vuelve a realizar la solicitud original con el nuevo token
	//       const newResponse = await fetch(url);

	//       // Devuelve la respuesta después de renovar el token
	//       return newResponse;
	//     }

	//     // Si hay otros errores, lanza una excepción
	//     throw new Error(`Error: ${response.status}`);
	//   } catch (error) {
	//     console.error(error);
	//     throw error;
	//   }
	// }

	// async function renewAccessToken(refreshToken) {
	//   try {
	//     // Realiza una solicitud para renovar el token utilizando el refreshToken
	//     const response = await fetch('URL_PARA_ACTUALIZAR_TOKEN', {
	//       method: 'POST',
	//       headers: {
	//         'Content-Type': 'application/json',
	//       },
	//       body: JSON.stringify({
	//         refreshToken: refreshToken,
	//       }),
	//     });

	//     if (response.ok) {
	//       // Si la renovación es exitosa, actualiza el token de acceso en tu aplicación
	//       const newAccessToken = await response.json();
	//       // Aquí deberías actualizar el token de acceso en tu aplicación
	//       // Por ejemplo, puedes almacenarlo en el estado global, en una cookie, etc.
	//       console.log('Token de acceso renovado:', newAccessToken);
	//     } else {
	//       // Si la renovación falla, lanza una excepción
	//       throw new Error(`Error al renovar el token: ${response.status}`);
	//     }
	//   } catch (error) {
	//     console.error(error);
	//     throw error;
	//   }
	// }

	// // Ejemplo de uso
	// const apiUrl = 'URL_DE_TU_API';
	// const requestOptions = {
	//   method: 'GET',
	//   headers: {
	//     'Authorization': 'Bearer TU_TOKEN_DE_ACCESO',
	//   },
	// };

	// const refreshToken = 'TU_REFRESH_TOKEN';

	// fetchWithRetry(apiUrl, requestOptions, refreshToken)
	//   .then(response => response.json())
	//   .then(data => console.log(data))
	//   .catch(error => console.error(error));

	// onMount(() => {
	// 	const figmaFileUrl =
	// 		'https://www.figma.com/oauth?client_id=45BmNIy8rKyzR9SHqL5sCV&redirect_uri=https://app.token-base.com&scope=file_read&state=defensor&response_type=code'

	// 	fetch(figmaFileUrl)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data) // This will log the data from the Figma API response
	// 		})
	// 		.catch((error) => console.error('Error:', error))
	// })

	const openFigmaModal = () => {
		const figmaURL =
			'https://www.figma.com/oauth?client_id=lpTbzlUPiswgMwt8xOLLXK&redirect_uri=https://94fe-2800-a4-1c2a-4200-ad53-1826-fdfc-186a.ngrok-free.app&scope=file_read&state=defensor&response_type=code'
		window.location.href = figmaURL
	}
</script>

<Dialog.Root bind:open portal="yes">
	<Button on:click={() => openFigmaModal()} />
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		Connect
	</Dialog.Trigger>
	<Dialog.Content />
</Dialog.Root>
