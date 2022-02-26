<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { Sound } from './scenes';

	export let sound: Sound;
	export let enabled: boolean = true;
	export let masterVolume: number = 1;
	export let volume: number = 1;
	export let paused: boolean = true;

	let audioEle: HTMLAudioElement;
	let playing: boolean = false;

	function updateState() {
		// Only change anything if the state has changed
		const shouldPlay = enabled && volume > 0 && !paused;
		if (shouldPlay != playing) {
			if (shouldPlay) {
				// Protect against unloaded sounds
				if (!isFinite(audioEle.duration)) {
					audioEle.onloadeddata = updateState;
					return;
				}

				// Set the offset to a random point and play
				audioEle.currentTime = Math.random() * audioEle.duration;
				audioEle.play();
				playing = true;
			} else {
				// Pause active playback
				audioEle.pause();
				playing = false;
			}
		}
	}

	function toggleSound() {
		enabled = !enabled;
	}

	/** External method to push a volume change */
	export function updateVolume(newVolume: number) {
		volume = newVolume;
	}

	// Update sound state when controls change
	$: if (audioEle) enabled, volume, paused, updateState();

	// Update volume using a power curve to give more detail at lower levels
	$: if (audioEle) audioEle.volume = Math.pow(volume * masterVolume, 2);

	// Remove reference to the audio element when unloaded
	onDestroy(() => {
		audioEle = null;
	});
</script>

<div class="relative" class:active={enabled} draggable={false}>
	<button
		class="flex justify-center items-center w-24 h-24 p-2 fadebtn"
		title={sound.description}
		on:click={toggleSound}
	>
		<audio async loop preload="auto" src={sound.src} bind:this={audioEle} />
		<img src={sound.img} class="w-16 h-16" alt={sound.description} />
	</button>
	<div class="volumebox absolute top-[5px] pt-1 pb-1 w-[22px] flex justify-center">
		<input
			aria-label="volume for {sound.description}"
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={volume}
			orient="vertical"
		/>
	</div>
</div>

<style lang="postcss">
	.volumebox {
		transition: right 0.2s ease-in, opacity 0.1s ease-out;
		right: 0px;
		opacity: 0;

		@apply border-1 border-white/30 rounded-r-lg;

		--bg-from-opacity: 0.32;
		--bg-to-opacity: 0;

		background-image: linear-gradient(
			to bottom right,
			rgba(255, 112, 131, var(--bg-from-opacity)),
			rgba(255, 112, 131, var(--bg-to-opacity))
		);
	}
	.active .volumebox {
		right: -21px;
		opacity: 1;
		transition: right 0.2s ease-in, opacity 0.1s ease-out 0.1s;
	}

	button {
		--bg-from-opacity: 0.32;
		--bg-to-opacity: 0;
	}
	button:active,
	.active button {
		--bg-to-opacity: 0.2;
		--bg-from-opacity: 0.7;
	}
	button:hover {
		--bg-to-opacity: 0.1;
		--bg-from-opacity: 0.4;
	}
	button:active:hover,
	.active button:hover {
		--bg-to-opacity: 0.4;
		--bg-from-opacity: 0.8;
	}
</style>
