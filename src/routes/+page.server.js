import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const api = env.API_URL;

export const load = () => {
	return {
		api
	};
};

export const actions = {
	login: async ({ request, cookies }) => {
		const body = JSON.stringify(Object.fromEntries(await request.formData()));
		const { username, password } = JSON.parse(body);

		if (!username) return fail(400, { path: 'username', missing: true });
		if (!password) return fail(400, { path: 'password', missing: true });

		const response = await fetch(`${api}/api/signin`, {
			mode: 'cors',
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body
		});

		const result = await response.json();

		if (result.success) {
			cookies.set('token', result.token, { path: '/' });
			cookies.set('id', result.user._id, { path: '/' });
			return {
				...result
			};
		}
	}
};
