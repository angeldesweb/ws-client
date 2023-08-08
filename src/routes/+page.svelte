<script>
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const handleSubmit = async ({ formElement }) => {
		return async ({ result }) => {
			if (result.type === 'success') {
				browser && localStorage.setItem('token', result.data.token);
				goto('/whatsapp');
			}
		};
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<form class="flex flex-col gap-2" action="?/login" method="post" use:enhance={handleSubmit}>
	<h2 class="text-xl font-bold">Login</h2>
	<div class="divider" />
	<input class="input input-bordered" type="text" name="username" placeholder="username" />
	<input class="input input-bordered" type="password" name="password" placeholder="password" />
	<button class="btn btn-primary flex-none">Signin</button>
</form>

<style>
	form {
		width: 20rem;
		margin: 4em auto;
	}
</style>
