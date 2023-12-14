<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script>
	import './_assets/css/post.css'
	import { preloadCode } from '$app/navigation'
	import { onMount } from 'svelte'
	import Header from './_components/Header.svelte'
	import Footer from './_components/Footer.svelte'
	import { navItems } from './config'
	import { currentPage } from './_assets/ts/currentPageStore'

	export let data

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	$: currentPage.set(data.path)

	/**
	 * This pre-fetches all top-level routes on the site in the background for faster loading.
	 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
	 *
	 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
	 * own preloadData() calls here, too.
	 **/

	onMount(() => {
		const navRoutes = navItems.map((item) => item.route)
		preloadCode(...navRoutes)
	})
</script>

<div class="bg-slate-100 min-h-screen grid gird-rows-[1fr_auto_1fr]">
	<Header />
	<slot />
	<Footer />
</div>
