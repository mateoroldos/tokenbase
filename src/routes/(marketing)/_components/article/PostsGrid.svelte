<script lang="ts">
	import type { Post } from '../../articles/post.interface'
	import PostCard from './PostCard.svelte'

	export let posts: Post[]
</script>

{#if posts.length > 0}
	<div
		class="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10 items-center sm:items-stretch"
	>
		{#each posts as post (post.slug)}
			<PostCard {post} />
		{/each}
	</div>
{/if}
