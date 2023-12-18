<script>
	import Avatar from './../../_components/atoms/Avatar.svelte'
	import '../../_assets/css/post.css'
	import Container from '../../_components/atoms/Container/Container.svelte'
	import Section from '../../_components/atoms/Section/Section.svelte'
	import PostsGrid from '../../_components/article/PostsGrid.svelte'
	import PageHeading from '../../_components/atoms/PageHeading.svelte'
	import { POST_AUTHORS } from '$lib/constants/POSTS_AUTHORS'

	export let data

	const {
		title,
		excerpt,
		date,
		updated,
		coverImage,
		coverWidth,
		coverHeight,
		categories,
		author
	} = data.meta
	const { PostContent } = data
	const relatedPosts = data.relatedPosts
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<Section>
	<Container>
		<article class="max-w-[75ch] mx-auto">
			<div class="items-center content-center">
				<PageHeading {title} description={excerpt} />
				<div class="flex gap-12 mt-10 items-center place-content-center pb-12">
					<span class="text-sm">{date}</span>
					<Avatar
						username={POST_AUTHORS[author]?.name || author}
						image={POST_AUTHORS[author]?.image || undefined}
					/>
				</div>

				<img
					class="rounded-lg w-full px-2 sm:px-0"
					src={coverImage}
					alt=""
					style="aspect-ratio: {coverWidth} / {coverHeight};"
				/>

				<div class=" text-sm py-6 px-2 sm:text-base">
					<b>Published:</b>
					{date}
					<br />
					<b>Updated:</b>
					{updated}
				</div>

				<div class="post">
					<svelte:component this={PostContent} />
				</div>
			</div>
		</article>
	</Container>
</Section>
<Section class="border-t border-slate-200">
	<Container>
		{#if categories && relatedPosts.length > 0}
			<div class="flex flex-col gap-4">
				<h3 class="text-xl font-medium">Related posts</h3>
				<PostsGrid posts={relatedPosts} />
			</div>
		{/if}
	</Container>
</Section>
