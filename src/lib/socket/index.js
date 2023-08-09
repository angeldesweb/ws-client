import { io } from 'socket.io-client';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

const api = env.PUBLIC_API_URL;

const token = browser && localStorage.getItem('token');

export const socket =
	browser &&
	io(`${api}`, {
		autoConnect: false,
		auth: {
			token
		}
	});

socket.on('connect', () => console.log('Socket client connected'));
