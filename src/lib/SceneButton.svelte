<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Scene } from './scenes';

	export let scene: Scene;
	export let active: boolean = false;

	let dispatcher = createEventDispatcher();

	function activate() {
		dispatcher('toggle', scene);
	}
</script>

<button class:active class="fadebtn p-2 rounded-lg w-24 h-24" on:click={activate} title={scene.name}>
    <div class="relative w-full h-full">
        <slot />
    </div>
</button>

<style lang="postcss">
	button {
		--bg-base: 115, 250, 255;
		--bg-from-opacity: 0.4;
		--bg-to-opacity: 0.15;
	}
	button:active, button.active {
		--bg-from-opacity: 0.6;
		--bg-to-opacity: 0.3;
	}
	button:hover {
		--bg-from-opacity: 0.5;
		--bg-to-opacity: 0.2;
	}
	button:active:hover, button.active:hover {
		--bg-from-opacity: 0.7;
		--bg-to-opacity: 0.3;
	}
</style>
