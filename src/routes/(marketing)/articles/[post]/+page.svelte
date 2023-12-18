<script>
	import Avatar from './../../_components/atoms/Avatar.svelte'
	import '../../_assets/css/post.css'
	import Container from '../../_components/atoms/Container/Container.svelte'
	import Section from '../../_components/atoms/Section/Section.svelte'
	import PostsGrid from '../../_components/article/PostsGrid.svelte'
	import PageHeading from '../../_components/atoms/PageHeading.svelte'
	import { POST_AUTHORS } from '$lib/constants/POSTS_AUTHORS'

	export let data
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{data.meta.title}</title>
	<meta data-key="description" name="description" content={data.meta.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta name="twitter:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.excerpt} />
	<meta name="twitter:description" content={data.meta.excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={data.meta.coverWidth} />
	<meta property="og:image:height" content={data.meta.coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<Section>
	<Container>
		<article class="max-w-[75ch] mx-auto">
			<div class="items-center content-center">
				<PageHeading title={data.meta.title} description={data.meta.excerpt} />
				<div class="flex gap-12 mt-10 items-center place-content-center pb-12">
					<span class="text-sm">{data.meta.date}</span>
					<Avatar
						username={POST_AUTHORS[data.meta.author]?.name || data.meta.author}
						image={POST_AUTHORS[data.meta.author]?.image || undefined}
					/>
				</div>

				<img
					class="rounded-lg w-full px-2 sm:px-0"
					src={data.meta.coverImage}
					alt=""
					style="aspect-ratio: {data.meta.coverWidth} / {data.meta
						.coverHeight};"
				/>

				<div class=" text-sm py-6 px-2 sm:text-base">
					<b>Published:</b>
					{data.meta.date}
					<br />
					<b>Updated:</b>
					{data.meta.updated}
				</div>

				<div class="post">
					<svelte:component this={data.PostContent} />
				</div>
			</div>
		</article>
	</Container>
</Section>
<Section class="border-t border-slate-200">
	<Container>
		{#if data.meta.categories && data.relatedPosts.length > 0}
			<div class="flex flex-col gap-4">
				<h3 class="text-xl font-medium">Related posts</h3>
				<PostsGrid posts={data.relatedPosts} />
			</div>
		{/if}
	</Container>
</Section>
