<script>
	import { page } from '$app/stores'
</script>

<div class="items-center sm:h-fit">
	<div class="flex itmes-center justify-center mt-16">
		<h2 class="text-lg text-center mb-10 font-bold mr-4 sm:text-2xl">
			{$page.status}
		</h2>
		<p class="text-lg text-center mb-10 sm:text-2xl">{$page.error?.message}</p>
	</div>
	<p class="text-center text-lg text-primary mb-4 sm:text-2xl">
		<strong>Sorry!</strong> Maybe try one of these links?
	</p>
	<ul>
		<li
			class="text-primary text-center text-base mb-20 hover:font-bold sm:text-lg"
		>
			<a href="/">Home</a>
		</li>
	</ul>
</div>
