<script lang="ts">
	import type { Post } from '../../../articles/post.interface'
	import PostsGrid from '../../article/PostsGrid.svelte'
	import Container from '../../atoms/Container/Container.svelte'
	import Section from '../../atoms/Section/Section.svelte'

	export let posts: Post[]
</script>

<Section>
	<Container class="flex flex-col gap-8">
		<h1 class="text-center text-2xl font-medium">Latest Posts</h1>
		<PostsGrid {posts} />
	</Container>
</Section>
