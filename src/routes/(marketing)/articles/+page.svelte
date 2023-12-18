<script lang="ts">
	import Section from '../_components/atoms/Section/Section.svelte'
	import Container from '../_components/atoms/Container/Container.svelte'
	import PageHeading from '../_components/atoms/PageHeading.svelte'
	import PaginatedPostsGrid from '../_components/article/PaginatedPostsGrid.svelte'

	export let data

	const { posts, totalPosts } = data
</script>

<Section>
	<Container class="flex flex-col gap-16">
		<PageHeading title="Design Systems Blog" />
		<PaginatedPostsGrid {posts} {totalPosts} />
	</Container>
</Section>
