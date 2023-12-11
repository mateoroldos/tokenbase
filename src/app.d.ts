/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="lucia" />

import type { AuthRequest } from 'lucia'

declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type DatabaseUserAttributes = {
			email: string
			email_verified: boolean
		}
		type DatabaseSessionAttributes = {}
	}

	namespace App {
		interface Locals {
			auth: AuthRequest
		}

		interface PageData {}

		interface Platform {}

		namespace Superforms {
			type Message = {
				type: 'error' | 'success'
				text: string
			}
		}
	}

	interface Window {}
}

// THIS IS IMPORTANT!!!
export {}
