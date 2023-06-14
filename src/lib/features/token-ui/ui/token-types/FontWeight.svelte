<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import fontWeightSuite from '$lib/features/token-management/font-weight/fontWeightSuite'

	export let token: IToken<'fontWeight'>

	let messages: string[] = []
	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement

		res = fontWeightSuite(target.value, 'fontWeight')
		messages = res.getErrors('fontWeight')
	}

	let res = fontWeightSuite.get()
</script>

<InputWrapper
	name="fontWeight"
	errors={messages}
	isValid={!messages || messages.length === 0}
>
	<input
		class="w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="text"
		name="fontWeight"
		bind:value={token.value}
		on:input={handleChange}
	/>
</InputWrapper>
