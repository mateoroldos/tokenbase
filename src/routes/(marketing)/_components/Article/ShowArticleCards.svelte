<script lang="ts">
	import { ArrowRight } from 'lucide-svelte'
	import { fade } from 'svelte/transition'
	import Pagination from '../pagination/Pagination.svelte'
	import type { Post } from '../../interface'
	import { postsPerPage } from '../../config'
	import ArticleCard from './ArticleCard.svelte'

	export let viewAllArticles: boolean
	export let posts: Post[]
	export let numberOfPostsToShow = postsPerPage
	export let page: number
	export let totalPosts: number
	export let path = '/articles'

	let isHovered = false
	let showPagination = Math.ceil(totalPosts / numberOfPostsToShow) > 1
	posts = posts.slice(0, Math.min(posts.length, numberOfPostsToShow))

	function handleMouseEnter() {
		isHovered = true
	}
	function handleMouseLeave() {
		isHovered = false
	}
</script>

<div class="flex flex-col items-center gap-6">
	<div>
		{#if posts.length < 3}
			<div
				class="w-full flex flex-col items-center justify-center place-content-center gap-x-8 gap-y-4 mx-auto sm:flex-row"
				in:fade={{ delay: 300 }}
			>
				{#each posts as post (post.slug)}
					<ArticleCard {post} />
				{/each}
			</div>
		{:else}
			<div
				class="grid grid-cols-1 gap-x-8 gap-y-8 place-content-center lg:grid-cols-3"
			>
				{#each posts as post (post.slug)}
					<ArticleCard {post} />
				{/each}
			</div>
		{/if}
	</div>

	{#if viewAllArticles}
		<a
			href="/articles"
			class="flex items-center justify-center w-fit"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			<p class="text-sm text-center {isHovered ? 'text-dark-blue' : ''}">
				View all posts
			</p>
			<div
				class="pl-1 transition-transform"
				style="transform: translateX({isHovered ? '2px' : '0'})"
			>
				<ArrowRight size={14} color="black" />
			</div>
		</a>
	{:else if showPagination}
		<div class="pt-12 pb-8">
			<Pagination currentPage={page} {totalPosts} {path} />
		</div>
	{:else}
		<div class="pb-20" />
	{/if}
</div>
