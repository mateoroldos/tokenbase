<script>
	import HeroSection from './_components/sections/HeroSection/HeroSection.svelte'
	import BlogPostsSection from './_components/sections/BlogPostsSection/BlogPostsSection.svelte'
	import { siteTitle } from './config'

	export let data
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<HeroSection />
<BlogPostsSection posts={data.posts} totalPosts={data.posts.length} />
