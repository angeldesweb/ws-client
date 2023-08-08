import { io } from 'socket.io-client';
import { browser } from '$app/environment';

const token = browser && localStorage.getItem('token');

export const socket =
	browser &&
	io('http://localhost:3003', {
		autoConnect: false,
		auth: {
			token
		}
	});

socket.on('connect', () => console.log('Socket client connected'));
