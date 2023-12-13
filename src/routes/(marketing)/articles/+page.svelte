<script lang="ts">
	import Section from '../_components/atoms/Section/Section.svelte'
	import Container from '../_components/atoms/Container/Container.svelte'
	import ShowArticleCards from '../_components/Article/ShowArticleCards.svelte'

	export let data

	let posts = data.posts
	let totalPosts = data.total
	let page = 1
</script>

<Section>
	<Container class="flex flex-col gap-12">
		<h1 class="font-semibold text-2xl text-center">Design Systems Blog</h1>
		<ShowArticleCards {posts} {page} viewAllArticles={false} {totalPosts} />
	</Container>
</Section>
