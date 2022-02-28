<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let paused: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('click')}
	class="w-12 stroke-current text-white m-1"
	title="Play/Pause"
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
		<circle cx="30" cy="30" r="28" fill="none" stroke-width="3" />
		{#if paused}
			<path
				transition:fly={{ y: 50, duration: 200 }}
				fill="none"
				stroke-linejoin="round"
				stroke-width="3"
				d="M45 30 23 15v30z"
			/>
		{:else}
			<path
				transition:fly={{ y: 50, duration: 200 }}
				stroke-linecap="round"
				stroke-width="3"
				d="M22 15v30m16-30v30"
			/>
		{/if}
	</svg>
</button>
