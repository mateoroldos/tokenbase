<script lang="ts">
	import type { Post } from '../../interface'
	import ArticleCard from '../article/ArticleCard.svelte'

	export let posts: Post[]

	posts = posts.slice(0, Math.min(posts.length, 8))
</script>

<div class="flex overflow-x-scroll pb-10 hide-scroll-bar">
	<div class="flex flex-wrap gap-6">
		{#each posts as post (post.slug)}
			<ArticleCard {post} />
		{/each}
	</div>
</div>

<style>
	.hide-scroll-bar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.hide-scroll-bar::-webkit-scrollbar {
		display: none;
	}
</style>
