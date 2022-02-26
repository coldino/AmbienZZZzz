<script lang="ts">
	import { sounds } from '$lib/scenes';
</script>

<svelte:head>
	<title>About AmbienZZZzz</title>
</svelte:head>

<section class="max-w-3xl mx-auto mt-16">
	<div>
		<h1 class="text-4xl mb-8 font-bold">AmbienZZZzz</h1>
		<p>
			AmbienZZZzz is an easy to use ambient sound mixer. No matter if you want to focus on your work
			or fall asleep. It is proven that certain sounds help you gain focus by raising the
			hearing threshold when constantly playing.
		</p>
		<br />
		<p>
			You can either choose to listen to one sound or mix it up as you want. If you want to try out
			the pre-made scenes, just click on the blue buttons below. You can always adjust all volumes
			to your liking.
		</p>
		<br />
		<small>
			PS: AmbienZZZzz can also be used to enhance storytelling. Impress your next DnD party with
			high quality ambient sounds.
		</small>
	</div>

	<div>
		<p>This app uses sounds licensed under the Creative Commons:</p>
		<ul class="ml-4 my-8">
			{#each Object.values(sounds) as sound}
				<li><a href={sound.source}>{sound.originalName}</a> {@html sound.attribution}.</li>
			{/each}
		</ul>
		<p class="italic">
			All files have their audio levels adjusted and were remixed to work as a loop. Some files have
			little parts cut out that would have destroyed the immersion of being an ongoing ambient track
			(e.g. coughing, yelling, phone handling).
		</p>
	</div>
</section>

<style lang="postcss">
	div {
		@apply mx-8 my-16 px-5 py-8;
		@apply ring-white/15 ring-1;
		@apply rounded-lg border border-white border-opacity-20;
		@apply shadow-black shadow-lg;

		--bg-from-opacity: 0.2;
		--bg-to-opacity: 0.05;
		background-image: linear-gradient(
			to bottom right,
			rgba(255, 112, 131, var(--bg-from-opacity)),
			rgba(255, 112, 131, var(--bg-to-opacity))
		);
	}

	ul {
		list-style-type: '✶ ';
		@apply list-inside;
	}

	li {
		@apply my-1;
	}

	:global(span.author) {
		@apply text-red-400;
	}
</style>
