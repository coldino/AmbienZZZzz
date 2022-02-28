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
			or fall asleep. It is proven that certain sounds help you gain focus by raising the hearing
			threshold when constantly playing.
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
		<p>
			This app was made by <a href="https://github.com/coldino" target="_blank">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 12.7 12.7"
					class="w-6 inline ml-1 pb-6px"
				>
					<path
						fill="#fff"
						fill-rule="evenodd"
						d="M6.35.3a6.15 6.15 0 0 0-1.94 12c.3.05.42-.14.42-.3l-.01-1.04c-1.71.37-2.07-.83-2.07-.83-.28-.7-.68-.9-.68-.9-.56-.38.04-.37.04-.37.62.04.94.63.94.63.55.94 1.44.67 1.79.51.06-.4.21-.66.39-.82-1.37-.15-2.8-.68-2.8-3.04 0-.67.24-1.22.63-1.65-.06-.15-.27-.78.06-1.62 0 0 .52-.17 1.7.63a5.87 5.87 0 0 1 3.07 0c1.18-.8 1.7-.63 1.7-.63.33.84.12 1.47.05 1.62.4.43.63.98.63 1.65 0 2.36-1.43 2.88-2.8 3.04.22.19.41.56.41 1.14V12c0 .17.1.36.42.3A6.15 6.15 0 0 0 6.35.3"
					/>
				</svg>
				Coldino</a
			> for <a href="https://thecodingchannel.hashnode.dev/">The Coding Channel</a>.
		</p>
		<p>
			It is developed on the <a href="https://kit.svelte.dev/">SvelteKit</a> framework and is hosted on
			<a href="https://www.netlify.com/">Netlify</a>.
		</p>

		<hr class="my-12 border-white/15"/>

		<p>The following sounds are used, all of which are licensed through Creative Commons:</p>
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
