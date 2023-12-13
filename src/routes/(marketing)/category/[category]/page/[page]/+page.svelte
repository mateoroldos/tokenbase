<!-- Renders posts listed by category -->
<script>
	import { ArrowLeft } from 'lucide-svelte'
	import { fade } from 'svelte/transition'
	import ShowArticleCards from '../../../../_components/Article/ShowArticleCards.svelte'
	import { siteDescription } from '../../../../config'

	export let data
	const { page, category, totalPosts, posts } = data
	let path = '/category/' + category
	let numberOfPostsToShow = 9
	let isHovered = false

	function handleMouseEnter() {
		isHovered = true
	}

	function handleMouseLeave() {
		isHovered = false
	}
</script>

<svelte:head>
	<title>Blog category {category} - page {page}</title>
	<meta data-key="description" name={siteDescription} />
</svelte:head>

<div class="my-14 flex items-center justify-between mx-auto sm:w-4/5">
	<div class="relative ml-4">
		<a
			href="/category"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			<div class="flex items-center hover:translate-x-2 transition-transform">
				<ArrowLeft
					size={36}
					style={`transform: ${isHovered ? 'translateX(-4px)' : 'none'}`}
				></ArrowLeft>
				<p
					class="text-sm text-[#0d9488] transform {isHovered
						? 'opacity-100 translate-x-0 transition-all'
						: 'opacity-0 translate-x-4'}"
				>
					Categories
				</p>
			</div>
		</a>
	</div>
	<p class="font-bold text-3xl sm:text-5xl" in:fade={{ delay: 300 }}>
		Blogs category: {category}
	</p>
	<div></div>
</div>
<ShowArticleCards
	{posts}
	{totalPosts}
	viewAllArticles={false}
	{numberOfPostsToShow}
	{page}
	{path}
></ShowArticleCards>
