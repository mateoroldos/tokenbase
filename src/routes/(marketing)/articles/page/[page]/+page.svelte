<script>
	import { fade } from 'svelte/transition'
	import ShowArticleCards from '../../../_components/Article/ShowArticleCards.svelte'

	export let data
	const { page, totalPosts, posts } = data
</script>

<h1
	class="font-bold text-3xl text-primary text-center my-14 sm:text-5xl"
	in:fade={{ delay: 300 }}
>
	Design System Blog
</h1>

<ShowArticleCards {posts} {totalPosts} viewAllArticles={false} {page}
></ShowArticleCards>
