<script lang="ts">
	import { localstore } from '$lib/localstorage';
	import { scenes, sounds, type Scene } from '$lib/scenes';

	import PlayPauseButton from '$lib/PlayPauseButton.svelte';
	import SceneButton from '$lib/SceneButton.svelte';
	import SoundButton from '$lib/SoundButton.svelte';
	import HelpButton from '$lib/HelpButton.svelte';

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

<div class="flex justify-between  max-w-[570px] mx-auto">
	<img src="/img/relax.png" alt="Relax" class="relax" />
	<div class="flex-1" />
	<section class="flex flex-row items-center pl-4 pr-8">
		<HelpButton />
		<PlayPauseButton on:click={playToggle} bind:paused />
		<input
			aria-label="master volume"
			class="ml-6 mr-4 hidden xs:block"
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={masterVolume}
			orient="vertical"
		/>
	</section>
</div>

<div class="flex justify-center mx-16">
	<section
		class="grid grid-cols-[6em,6em,6em] gap-x-6 xs:gap-x-8 gap-y-4 justify-between items-center select-none max-w-[500px] flex-1"
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

<style lang="postcss">
	.relax {
		width: calc(clamp(210px, 60vw, 400px));
		height: calc(clamp(210px, 60vw, 400px) / 2);
	}
</style>
