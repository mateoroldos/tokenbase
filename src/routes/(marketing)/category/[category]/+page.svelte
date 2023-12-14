<!-- Renders any page at /category/* -->
<script>
	import { ArrowLeft } from 'lucide-svelte'
	import { fade } from 'svelte/transition'
	import ShowArticleCards from '../../_components/article/ShowArticleCards.svelte'

	export let data

	const { posts, category, total } = data
	let path = '/category/' + category
	let isHovered = false

	function handleMouseEnter() {
		isHovered = true
	}
	function handleMouseLeave() {
		isHovered = false
	}
</script>

<svelte:head>
	<title>Category: {category}</title>
</svelte:head>

<div class="my-14 flex items-center justify-between mx-auto sm:w-4/5">
	<div class="relative pl-4">
		<a
			href="/category"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			<div class="flex items-center hover:translate-x-2 transition-transform">
				<ArrowLeft
					size={32}
					style={`transform: ${isHovered ? 'translateX(-8px)' : 'none'}`}
				></ArrowLeft>
				<p
					class="text-sm text-[#0d9488] {isHovered
						? 'opacity-100 transition-opacity'
						: 'opacity-0'}"
				>
					Categories
				</p>
			</div>
		</a>
	</div>
	<p
		class="font-bold text-3xl text-center sm:text-5xl"
		in:fade={{ delay: 300 }}
	>
		Blogs category: {category}
	</p>
	<div></div>
</div>

<ShowArticleCards
	{posts}
	page={1}
	totalPosts={total}
	viewAllArticles={false}
	{path}
></ShowArticleCards>
