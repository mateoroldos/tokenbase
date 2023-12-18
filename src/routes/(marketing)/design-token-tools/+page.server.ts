import { redirect } from '@sveltejs/kit';

export let prerender = false;

export function load() {
	// ...
	throw redirect(301, '/articles/design-token-tools');
}
