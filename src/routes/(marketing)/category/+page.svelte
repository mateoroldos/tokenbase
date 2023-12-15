<script lang="ts">
	import Container from './../_components/atoms/Container/Container.svelte'
	import Section from './../_components/atoms/Section/Section.svelte'
	import ArticlesCardsGrid from '../_components/article/ArticlesCardsGrid.svelte'
	import type { Post } from '../interface'

	export let data

	const uniqueCategories = data.uniqueCategories
	let categorizedPosts: { [key: string]: Post[] } = {}
	categorizedPosts = data.posts
</script>

<svelte:head>
	<title>Blog | Categories</title>
</svelte:head>

<Section>
	<Container>
		<h1 class="font-bold text-3xl text-center gap-x-8 py-16 sm:text-5xl">
			All blog categories
		</h1>
		{#each uniqueCategories as category}
			<div class="flex flex-col gap-6">
				<a href="/category/{category.title}" class="text-4xl capitalize">
					{category.title}
				</a>
				<ArticlesCardsGrid posts={categorizedPosts[category.title] ?? []} />
			</div>
		{/each}
	</Container>
</Section>
