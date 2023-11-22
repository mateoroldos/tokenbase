<script lang="ts">
	import PreviewTemplateModal from '$lib/features/preview-template-modal/components/PreviewTemplateModal.svelte'
	import '../app.postcss'
	import '../app.postcss'

	const groups = [
		{
			id: '25cfd197-65ad-4de2-9be6-4408661a3c02',
			name: 'jajfwffweajaja',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: [
				{
					id: 'da6b3bcf-9c0e-42fc-b341-6c1d82a3a142',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [360, 0, 0],
						'0e78216d-b148-49a3-b644-26352b4394be': [228, 72, 61]
					},
					name: 'Untitled'
				},
				{
					id: 'b922dde3-dcf4-472b-87a4-5da614669080',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': {
							groupId: '25cfd197-65ad-4de2-9be6-4408661a3c02',
							tokenId: 'da6b3bcf-9c0e-42fc-b341-6c1d82a3a142'
						},
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'Untitled'
				},
				{
					id: 'abcc640d-d4d5-41f3-b1ee-cab5f9231463',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [195, 0, 55],
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'Untitled'
				},
				{
					id: '92b7f7a8-def7-44b7-9f61-8262e253f439',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [116, 37, 92],
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'Untitled'
				},
				{
					id: 'f0572108-fb9b-498b-863c-111932840939',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': {
							groupId: '25cfd197-65ad-4de2-9be6-4408661a3c02',
							tokenId: '92b7f7a8-def7-44b7-9f61-8262e253f439'
						},
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'Untitled'
				},
				{
					id: '334b9320-b299-4fb8-81b5-d4e648aa9bbc',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [0, 0, 0],
						'0e78216d-b148-49a3-b644-26352b4394be': {
							groupId: '25cfd197-65ad-4de2-9be6-4408661a3c02',
							tokenId: 'da6b3bcf-9c0e-42fc-b341-6c1d82a3a142'
						}
					},
					name: 'fefrref'
				},
				{
					id: '0cb17a1b-fa7d-4f5f-a1ab-c4392514ae07',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [0, 0, 0],
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'fefewf'
				}
			]
		},
		{
			id: '2830e98f-e15b-487d-9b7b-3c242e83138d',
			name: 'la wea',
			parentGroup: '25cfd197-65ad-4de2-9be6-4408661a3c02',
			tokens: []
		},
		{
			id: '22f36fed-cb7d-457d-956e-81819d439a25',
			name: 'fwqfewf',
			parentGroup: '2830e98f-e15b-487d-9b7b-3c242e83138d',
			tokens: []
		},
		{
			id: '70030723-dac3-4fcc-8b2c-b643762cbf88',
			name: 'jajajja',
			parentGroup: '22f36fed-cb7d-457d-956e-81819d439a25',
			tokens: []
		},
		{
			id: 'bc4dcb9e-d94b-481d-969c-29a95d0c1073',
			name: 'rgregreg',
			parentGroup: '25cfd197-65ad-4de2-9be6-4408661a3c02',
			tokens: []
		},
		{
			id: 'f03354f8-6e6c-4d5d-96c2-fb0fd55fc701',
			name: 'fwefwef',
			parentGroup: '25cfd197-65ad-4de2-9be6-4408661a3c02',
			tokens: [
				{
					id: 'dd1bbc64-ed4d-4d37-b800-fdb651e726a3',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [153, 0, 0],
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'Untitled'
				},
				{
					id: '18165eb9-bdc9-4923-b07f-bde80eb13db5',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': [252, 45, 63],
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'vewfew'
				},
				{
					id: 'e25d2d45-48a0-45da-b4d2-53d888fd72dd',
					type: 'color',
					value: {
						'331164c4-7512-4b3e-8731-b3a9a2072c2e': {
							groupId: 'f03354f8-6e6c-4d5d-96c2-fb0fd55fc701',
							tokenId: 'dd1bbc64-ed4d-4d37-b800-fdb651e726a3'
						},
						'0e78216d-b148-49a3-b644-26352b4394be': [0, 0, 0]
					},
					name: 'aaaa'
				}
			]
		},
		{
			id: 'efc99f7b-d022-4ffa-be04-3529dc1f4a34',
			name: 'fwfewf',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: []
		},
		{
			id: 'e8f962f5-11a1-449b-baa8-035d22045a00',
			name: 'Untitledfwef',
			parentGroup: 'efc99f7b-d022-4ffa-be04-3529dc1f4a34',
			tokens: []
		},
		{
			id: '5737160b-bb6d-40d0-9fab-3e61af3debf9',
			name: 'fwefewfwe',
			parentGroup: 'e8f962f5-11a1-449b-baa8-035d22045a00',
			tokens: []
		},
		{
			id: 'c3edbe80-137f-4c84-8c5e-3600491b76cd',
			name: 'fweewfw',
			parentGroup: '5737160b-bb6d-40d0-9fab-3e61af3debf9',
			tokens: []
		},
		{
			id: '2c9d4add-cb7a-43f0-9c90-c70495003d09',
			name: 'fwefewf',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: []
		},
		{
			id: '5fc16f42-c11a-43a4-b24d-9ea9b3fe2086',
			name: 'fewfewf',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: []
		},
		{
			id: '0041a324-9a5d-469e-bccf-ba946ab3d8e9',
			name: 'fwefewf',
			parentGroup: '5fc16f42-c11a-43a4-b24d-9ea9b3fe2086',
			tokens: []
		},
		{
			id: '9756b51c-5dc1-4ada-ae4e-4931bb85a019',
			name: 'fwefewf',
			parentGroup: '0041a324-9a5d-469e-bccf-ba946ab3d8e9',
			tokens: []
		},
		{
			id: '1abcdb9e-5f2e-48cf-9693-64729996c3a7',
			name: 'fwfewfw',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: []
		},
		{
			id: 'fa7d536c-bb4a-4275-96aa-fd02bef04e8a',
			name: 'fwefew',
			parentGroup: '3fca5fab-1bc9-4845-9b21-c498785bd394',
			tokens: []
		}
	]

	const templateId = '3fca5fab-1bc9-4845-9b21-c498785bd394'
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<PreviewTemplateModal {groups} {templateId} />
	<slot />
</div>
