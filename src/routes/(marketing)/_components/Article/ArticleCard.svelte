<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import type { Post } from '../../interface'
	import Avatar from '../atoms/Avatar.svelte'

	export let post: Post
</script>

<a href="/articles/{post.slug}" class="flex flex-1">
	<Card.Root
		class="hover:border-slate-400 transition-colors max-w-[40ch] overflow-hidden flex-1"
	>
		<img src={post.coverImage} alt="" class="w-full h-48 object-cover" />
		<Card.Header>
			<Card.Title>
				{post.title}
			</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			<div class="flex items-center gap-4">
				<Avatar />
				<p class="text-sm">{post.date}</p>
			</div>
			<Card.Description class="line-clamp-4">{post.excerpt}</Card.Description>
		</Card.Content>
	</Card.Root>
</a>
