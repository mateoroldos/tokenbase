<script lang="ts">
	import Section from '../_components/atoms/Section/Section.svelte'
	import Container from '../_components/atoms/Container/Container.svelte'
	import PageHeading from '../_components/atoms/PageHeading.svelte'
	import PostsGridPaginated from '../_components/article/PostsGridPaginated.svelte'

	export let data

	const { posts, totalPosts } = data
</script>

<Section>
	<Container class="flex flex-col gap-16">
		<PageHeading title="Design Systems Blog" />
		<PostsGridPaginated {posts} {totalPosts} />
	</Container>
</Section>
