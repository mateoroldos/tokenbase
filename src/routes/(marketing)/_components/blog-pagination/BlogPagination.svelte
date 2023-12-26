<script lang="ts">
	import { postsPerPage } from '../../../../lib/config'
	import PaginationNumber from './PaginationNumber.svelte'
	import {
		ChevronLeft,
		ChevronsLeft,
		ChevronsRight,
		ChevronRight
	} from 'lucide-svelte'

	export let currentPage: number
	export let totalPosts: number
	export let path: string

	let pagesAvailable: number
	pagesAvailable = Math.ceil(totalPosts / postsPerPage)
</script>

<ul class="flex justify-center place-content-center px-2 pb-12">
	{#if currentPage > 1}
		<li class="px-0.5 group transition-transform transform-gpu hover:scale-105">
			<a href={path}>
				<ChevronsLeft
					class="bg-white border-slate-400 text-slate-400 border h-8 w-8 rounded-md text-center"
				/>
			</a>
		</li>
		<li class="px-0.5 group transition-transform transform-gpu hover:scale-105">
			<a href="{path}/page/{currentPage - 1}">
				<ChevronLeft
					class="bg-white border-slate-400 text-sm text-slate-400 border h-8 w-8 rounded-md text-center"
				/>
			</a>
		</li>
	{:else}
		<li class="px-0.5">
			<ChevronsLeft
				class="bg-white border-slate-200 text-slate-200 border h-8 w-8 rounded-md text-center"
			/>
		</li>
		<li class="px-0.5">
			<ChevronLeft
				class="bg-white border-slate-200 text-sm text-slate-200 border h-8 w-8 rounded-md text-center"
			/>
		</li>
	{/if}
	{#each [2, 1] as i}
		{#if currentPage - i > 0}
			<li
				class="px-0.5 group transition-transform transform-gpu hover:scale-105"
			>
				<a href="{path}/page/{currentPage - i}">
					<PaginationNumber selected={false} page={currentPage - i} />
				</a>
			</li>
		{/if}
	{/each}
	<li class="px-0.5 group transition-transform transform-gpu hover:scale-105">
		<PaginationNumber selected={true} page={currentPage} />
	</li>
	{#each Array(2) as _, i}
		{#if currentPage + (i + 1) <= pagesAvailable}
			<li
				class="px-0.5 group transition-transform transform-gpu hover:scale-105"
			>
				<a href="{path}/page/{currentPage + (i + 1)}">
					<PaginationNumber selected={false} page={currentPage + i + 1} />
				</a>
			</li>
		{/if}
	{/each}
	{#if currentPage < pagesAvailable}
		<li class="px-0.5 group transition-transform transform-gpu hover:scale-105">
			<a href="{path}/page/{currentPage + 1}">
				<ChevronRight
					class="bg-white border-slate-400 text-slate-400 border h-8 w-8 rounded-md text-center"
				/>
			</a>
		</li>
		<li class="px-0.5 group transition-transform transform-gpu hover:scale-105">
			<a href="{path}/page/{pagesAvailable}">
				<ChevronsRight
					class="bg-white border-slate-400 text-slate-400 border h-8 w-8 rounded-md text-center"
				/>
			</a>
		</li>
	{:else}
		<li class="px-0.5">
			<ChevronRight
				class="bg-white border-slate-200 text-slate-200 border h-8 w-8 rounded-md text-center"
			/>
		</li>
		<li class="px-0.5">
			<ChevronsRight
				class="bg-white border-slate-200 text-slate-200 border h-8 w-8 rounded-md text-center"
			/>
		</li>
	{/if}
</ul>
