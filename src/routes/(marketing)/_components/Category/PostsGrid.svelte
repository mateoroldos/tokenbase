<script lang="ts">
	import type { Post } from '../../interface'
	import ArticleCard from '../article/ArticleCard.svelte'

	export let posts: Post[]
</script>

{#if posts.length > 0}
	<div class="grid grid-cols-[repeat(auto-fit,_minmax(25ch,_1fr))] gap-10">
		{#each posts as post (post.slug)}
			<ArticleCard {post} />
		{/each}
	</div>
{/if}
