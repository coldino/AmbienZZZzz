<script lang="ts">
	import { scenes } from './scenes';

	export let scheme = schemes[0];
</script>

{#each schemes as currentScheme, i}
	<div
		class="hover:bg-gray-600"
		class:active={scheme === currentScheme}
		on:click={() => (scheme = schemes[i])}
	>
		<div>{currentScheme.name}</div>
	</div>
{/each}

<style lang="postcss">
    div.active {
        @apply bg-green-800;
    }
    div.active:hover {
        @apply bg-green-600;
    }
</style>
