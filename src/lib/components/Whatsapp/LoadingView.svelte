<script>
	import { Chasing } from 'svelte-loading-spinners';
</script>

<div class="view">
	<Chasing />
	<span>Validando estado de autenticación</span>
</div>

<style>
	.view {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
