import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('token');
	throw redirect(303, '/');
};
