<script lang="ts">
	import { fly } from 'svelte/transition';

	import { localstore } from '$lib/localstorage';
	import { scenes, sounds, type Scene } from '$lib/scenes';

	import SceneButton from '$lib/SceneButton.svelte';
	import SoundButton from '$lib/SoundButton.svelte';

	type SoundState = {
		active: boolean;
		volume: number;
	};

	const stateDefaults: { [key: string]: SoundState } = {};
	for (const name of Object.keys(sounds)) {
		stateDefaults[name] = {
			active: false,
			volume: 1
		};
	}

	// LocalStorage-backed master volume so all changes are saved
	let masterVolumeStore = localstore('mastervolume', { default: 0.5 });
	let masterVolume = $masterVolumeStore;
	$: $masterVolumeStore = masterVolume;

	// LocalStorage-backed store for all sound states
	let statesStore = localstore<{ [key: string]: SoundState }>('sounds', { default: stateDefaults });
	let states: { [key: string]: SoundState } = $statesStore;
	$: $statesStore = states;

	// References to all the button components
	let buttons: { [key: string]: SoundButton } = {};

	// Current app state
	let scene: Scene = null;
	let sceneName: string = null;
	let paused = true;

	// Make sure sure we have stored state for each sound
	for (const name of Object.keys(sounds)) {
		if (states[name] === undefined) {
			states[name] = {
				active: false,
				volume: sounds[name].defaultVolume || 1
			};
		}
	}

	function playToggle() {
		paused = !paused;
	}

	function toggleScene(name: string) {
		if (sceneName === name) {
			sceneName = null;

			// Turn off the sounds in this scene
			for (const channel of scene.channels) {
				states[channel.sound].active = false;
			}

			scene = null;
		} else {
			sceneName = name;
			scene = scenes[name];
			paused = false; // auto-play on scene selection

			// Turn all sounds off
			for (const name of Object.keys(sounds)) {
				states[name].active = false;
			}

			// Turn the scene sounds on
			for (const channel of scene.channels) {
				const sound = sounds[channel.sound];
				states[channel.sound].active = true;
				if (channel.volume) {
					states[channel.sound].volume = channel.volume;
					buttons[channel.sound].updateVolume(channel.volume);
				}
			}
		}

		// Notify Svelte we changed something inside the states object
		states = states;
	}
</script>

			<button
				class="w-7 stroke-current m-1 grid place-items-center mr-4"
				title="Help + About this app"
				on:click={() => (window.location.pathname = '/about')}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" stroke="#aaaaaa" fill="white">
					<circle cx="30" cy="30" r="28" fill="none" stroke-width="3" />
					<path
						stroke="none"
						d="M41 17.8c-.2 3.7-2.9 6.7-5.5 9-2.8 2.6-5.7 5.6-6.4 9.5-.6.8.4 3-1 2.8h-2c0-3.5.6-7 2.6-10 2-3.5 5.2-6.5 6-10.5.5-2.1-.7-4.5-2.8-5-3.1-1-6.6.4-8.4 3A13.6 13.6 0 0 0 21 24h-1.8v-8.3a27 27 0 0 1 15.7-4c2.6.2 5.4 1.7 6 4.5l.1 1.5zM30.6 45c.1 2.3-2.5 4-4.6 3-2.2-.8-2.7-4.1-.8-5.6 1.7-1.6 5-.4 5.3 2v.6z"
					/>
				</svg>
			</button>

