<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import type { Post } from '../../interface'
	import Avatar from '../atoms/Avatar.svelte'

	export let post: Post
</script>

<a href="/articles/{post.slug}" class="flex-1 flex">
	<Card.Root
		class="flex-1 overflow-hidden hover:border-slate-400 transition-colors"
	>
		<Card.Header>
			<img src={post.coverImage} alt="" class="w-full h-48 object-cover" />
		</Card.Header>
		<Card.Content class="flex flex-col gap-5 p-6">
			<h4 class="font-medium text-xl text-left">{post.title}</h4>
			<div class="flex items-center gap-4">
				<Avatar />
				<p class="text-xs text-left">{post.date}</p>
			</div>
			<div class="px-0">
				<p class="text-sm text-left line-clamp-3">{post.excerpt}</p>
			</div>
		</Card.Content>
	</Card.Root>
</a>
