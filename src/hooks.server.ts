import { auth } from '$lib/server/lucia';
import { runMigrations } from '$lib/server/migrate';
import type { Handle } from '@sveltejs/kit';

const startupCode = () => {
	console.log('Running startup code');
	// place code that you want to run on startup here
	// e.g., migrations, db connections
	runMigrations().catch((e) => {
		console.error('Migration failed');
		console.error(e);
		process.exit(1);
	});
};

startupCode();

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
