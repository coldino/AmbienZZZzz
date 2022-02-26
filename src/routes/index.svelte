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

<svelte:head>
	<title>AmbienZZZzz : Ambient Sound Mixer</title>
</svelte:head>

<div class="flex justify-center">
	<section class="flex flex-row justify-between mx-8 flex-1 max-w-[560px]">
		<img src="/img/relax.png" alt="Relax" class="w-300px h-150px" />
		<div class="flex-1" />
		<section class="flex flex-row items-center my-4">
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
			<button on:click={playToggle} class="w-12 stroke-current text-white m-1" title="Play/Pause">
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
			<input
				aria-label="master volume"
				class="ml-6 mr-4"
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value={masterVolume}
				orient="vertical"
			/>
		</section>
	</section>
</div>

<div class="flex justify-center">
	<section
		class="grid grid-cols-[6em,6em,6em] gap-x-8 gap-y-4 justify-between items-center mx-16 select-none max-w-[500px] flex-1"
	>
		{#each Object.entries(sounds) as [name, sound]}
			<SoundButton
				{sound}
				{masterVolume}
				{paused}
				bind:enabled={states[name].active}
				bind:this={buttons[name]}
			/>
		{/each}
	</section>
</div>

<hr class="my-8 border-white/15" />

<div class="flex justify-center">
	<section
		class="grid grid-cols-[6rem,6rem,6rem] auto-rows-fr gap-x-8 gap-y-4 mx-8 justify-between items-center mx-16 pb-8 max-w-[500px] flex-1"
	>
		<!-- Each scene button is hand-crafted for individual icon placement -->
		<SceneButton
			scene={scenes['catfire']}
			active={sceneName === 'catfire'}
			on:toggle={() => toggleScene('catfire')}
		>
			<img src="/img/fireplace.svg" alt="Fireplace" class="absolute top-0 left-0 w-12" />
			<img src="/img/purring.svg" alt="Cat" class="absolute bottom-0 right-0 w-11" />
		</SceneButton>
		<SceneButton
			scene={scenes['campdraw']}
			active={sceneName === 'campdraw'}
			on:toggle={() => toggleScene('campdraw')}
		>
			<img src="/img/pencil.svg" alt="A pencil" class="absolute bottom-0 left-0 w-13" />
			<img src="/img/fire.svg" alt="Flames" class="absolute top-0 right-0 w-11" />
		</SceneButton>
		<SceneButton
			scene={scenes['tentrainthunder']}
			active={sceneName === 'tentrainthunder'}
			on:toggle={() => toggleScene('tentrainthunder')}
		>
			<img src="/img/thunder.svg" alt="Cloud with lightening" class="absolute top-0 right-0 w-11" />
			<img src="/img/raintent.svg" alt="Tent in the rain" class="absolute bottom-0 left-1 w-15" />
		</SceneButton>
		<SceneButton
			scene={scenes['summerstorm']}
			active={sceneName === 'summerstorm'}
			on:toggle={() => toggleScene('summerstorm')}
		>
			<img src="/img/thunder.svg" alt="Cloud with lightening" class="absolute top-6 right-0 w-12" />
			<img src="/img/rain.svg" alt="Raincloud" class="absolute top-1 left-0 w-14" />
		</SceneButton>
		<SceneButton
			scene={scenes['campnight']}
			active={sceneName === 'campnight'}
			on:toggle={() => toggleScene('campnight')}
		>
			<img src="/img/crickets.svg" alt="A cricket" class="absolute top-0 left-0 w-11" />
			<img src="/img/fire.svg" alt="Flames" class="absolute bottom-0 right-0 w-13" />
		</SceneButton>
		<SceneButton
			scene={scenes['coworking']}
			active={sceneName === 'coworking'}
			on:toggle={() => toggleScene('coworking')}
		>
			<img src="/img/keyboard.svg" alt="Typing on a keyboard" class="absolute top-0 right-0 w-14" />
			<img src="/img/pencil.svg" alt="A pencil" class="absolute bottom-0 left-0 w-10" />
		</SceneButton>
	</section>
</div>
