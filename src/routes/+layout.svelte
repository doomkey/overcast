<script lang="ts">
	import './layout.css';
	// import favicon from '$lib/assets/favicon.svg';
	import banner from '$lib/assets/banner_overcast.png';
	// +layout.svelte
	import { initSavedDataSync, loadSavedData } from '$lib/stores/saved_data.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		loadSavedData();
	});
	initSavedDataSync();
	let { children } = $props();
</script>

<svelte:head>
	<meta property="og:image" content={banner} />
</svelte:head>
<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head> -->
{@render children()}
