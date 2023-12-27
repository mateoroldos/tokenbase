<script>
	import CreateWorkspaceForm from './../../lib/features/workspaces/components/create-workspace-form/create-workspace-form.svelte'
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

{#if data.form}
	<section class="container">
		<CreateWorkspaceForm form={data.form} />
	</section>
{:else}
	<HeroSection />
	<FeaturesSection />
	<SingleSourceSection />
	<IntegrationsSection />
	<BlogPostsSection posts={data.posts} />
{/if}
