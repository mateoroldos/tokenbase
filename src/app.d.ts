/* eslint-disable no-var */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />

declare namespace App {
	// interface Error {}
	interface Locals {
		auth: import('lucia').AuthRequest
	}
	// interface PageData {}
	// interface Platform {}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth
	// we omit the id property because lucia automatically generate it for us when we create a user
	type DatabaseUserAttributes = {
		username: string
		names: string
		last_names: string
	}
	type DatabaseSessionAttributes = {}
}
