<script lang="ts">
	import PaginationCard from '../pagination/PaginationCard.svelte'
	import type { Post } from '../../articles/post.interface'
	import { postsPerPage as defaultPostsPerPage } from '../../../../lib/config'
	import PostsGrid from './PostsGrid.svelte'

	export let posts: Post[]
	export let totalPosts: number
	export let postsPerPage = defaultPostsPerPage
	export let currentPage: number = 1
	export let path = '/articles'

	let showPagination = Math.ceil(totalPosts / postsPerPage) > 1
	let slicedPosts = posts.slice(0, Math.min(totalPosts, postsPerPage))
</script>

{#if posts.length > 0}
	<PostsGrid posts={slicedPosts} />
{:else}
	<p class="text-center">No posts found.</p>
{/if}
{#if showPagination}
	<PaginationCard {currentPage} {totalPosts} {path} />
{/if}
