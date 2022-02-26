<script>
	import 'virtual:windi.css';
	import '../global.postcss';
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');
</script>

<noscript>
	Sorry, this app requires JavaScript!
</noscript>

<main>
	<slot />
</main>
