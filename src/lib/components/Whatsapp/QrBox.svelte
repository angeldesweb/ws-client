<script>
	import Qr from 'qrcode';
	import { onMount } from 'svelte';

	export let qr;

	$: code = qr;

	let canvas;

	$: console.log(code);
	onMount(() => {
		Qr.toCanvas(canvas, qr);
	});
</script>

<div class="view">
	<span>Escanee el código desde whatsapp para continuar</span>
	<canvas bind:this={canvas} />
</div>

<style>
	.view {
		display: flex;
		gap: 20px;
		flex-direction: column;
		align-items: center;
	}

	canvas {
		width: 15rem;
		height: 15rem;
	}
</style>
