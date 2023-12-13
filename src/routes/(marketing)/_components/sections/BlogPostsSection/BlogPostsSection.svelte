<script lang="ts">
	import type { Post } from '../../../interface'
	import ShowArticleCards from '../../Article/ShowArticleCards.svelte'
	import Container from '../../atoms/Container/Container.svelte'
	import Section from '../../atoms/Section/Section.svelte'

	export let posts: Post[]
	export let totalPosts: number
</script>

<Section>
	<Container class="flex flex-col gap-8">
		<h1 class="text-center text-2xl font-medium">Latest Posts</h1>
		<ShowArticleCards
			{posts}
			{totalPosts}
			numberOfPostsToShow={3}
			viewAllArticles={true}
			page={1}
		/>
	</Container>
</Section>
