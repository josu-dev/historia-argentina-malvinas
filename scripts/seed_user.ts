import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';
import { db, t } from './db.js';

async function main() {
    const rl = readline.createInterface({ input, output });

    try {
        const google_id = await rl.question('Enter Google ID: ');
        const name = await rl.question('Enter User Name: ');
        const email = await rl.question('Enter User Email: ');

        if (!google_id || !name || !email) {
            console.error('Error: All fields (Google ID, Name, Email) are required.');
            return;
        }

        await db.insert(t.user).values({ google_id, name, email });
        console.debug(`User "${name}" with email "${email}" added successfully!`);
        const users = await db.select().from(t.user);
        console.debug(`Users:`, users);
    } catch (ex) {
        console.debug(ex);
    } finally {
        rl.close();
        db.$client.close();
    }
}

main();
