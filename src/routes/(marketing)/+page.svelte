<script>
	import SingleSourceSection from './_components/sections/single-source-section/SingleSourceSection.svelte'
	import FeaturesSection from './_components/sections/features-section/FeaturesSection.svelte'
	import BlogPostsSection from './_components/sections/blog-posts-section/BlogPostsSection.svelte'
	import { siteTitle } from '../../lib/config'
	import HeroSection from './_components/sections/hero-section/HeroSection.svelte'
	import IntegrationsSection from './_components/sections/integrations-section/IntegrationsSection.svelte'

	export let data
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<HeroSection />
<FeaturesSection />
<SingleSourceSection />
<IntegrationsSection />
<BlogPostsSection posts={data.posts} />
