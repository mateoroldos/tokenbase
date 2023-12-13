<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import type { Post } from '../../interface'
	import Avatar from '../atoms/Avatar.svelte'

	export let post: Post
</script>

<a href="/articles/{post.slug}" class="relative group">
	<Card.Root class="h-full group transform-gpu hover:scale-105">
		<Card.Header class="h-56 relative">
			<img
				src={post.coverImage}
				alt=""
				class="w-full h-44 rounded-lg object-cover"
			/>
			<p class="font-bold text-base text-left pl-2 pt-1">{post.title}</p>
		</Card.Header>
		<div
			class="absolute bottom-0 left-0 w-full h-auto bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out delay-100"
		>
			<Card.Content class="flex flex-col justify-between">
				<div class="flex pb-2 justify-between items-center">
					<p class="font-bold text-sm text-left">{post.date}</p>
					<Avatar></Avatar>
				</div>
				<div class="p-0">
					<p class="text-sm text-left line-clamp-4">{post.excerpt}</p>
				</div>
			</Card.Content>
		</div>
	</Card.Root>
</a>
