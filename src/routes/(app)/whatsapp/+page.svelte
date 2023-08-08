<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { socket } from '$lib/socket';
	import { onMount } from 'svelte';
	import { LoadingView, QrBox, View } from '$lib/components/Whatsapp';

	let status = '';
	let QrCode = '';

	const handleLogout = () => {
		browser && localStorage.clear();
		browser && socket.disconnect();
		goto('/logout');
	};

	const init = () => {
		if (browser) {
			socket.emit('client:init');
			status = 'STARTING';

			socket.on('qr', ({ qr }) => {
				status = 'QUEST_QR';
				QrCode = qr;
			});

			socket.on('auth:done', () => (status = 'AUTH'));
			socket.on('client:ready', () => (status = 'READY'));
		}
	};

	const stop = () => {
		socket.emit('client:stop');
		status = '';
	};

	onMount(() => {
		browser && socket.connect();
	});
</script>

<svelte:head>
	<title>Whatsapp</title>
</svelte:head>

<div class="flex gap-2">
	{#if !status || status === 'READY'}
		<button class="btn btn-sm btn-primary" on:click={handleLogout}>logout</button>
	{/if}
	{#if status === 'READY'}
		<button class="btn btn-sm btn-primary" on:click={stop}>Disconnect Whatsapp Client</button>
	{/if}
	{#if !status}
		<button class="btn btn-sm btn-primary" on:click={init}>Start Whatsapp Client</button>
	{/if}
</div>

{#if status === 'STARTING'}
	<LoadingView />
{:else if status === 'QUEST_QR'}
	<QrBox qr={QrCode} />
{:else if status === 'AUTH'}
	<LoadingView />
{:else if status === 'READY'}
	<View />
{:else}
	<span>Inicializa el cliente para conectar</span>
{/if}
<span class="text-xl font-bold">Status: {status}</span>
