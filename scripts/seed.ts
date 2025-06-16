import type { Table } from "drizzle-orm";
import * as events from '../src/lib/data/events.js';
import type { Database } from './db.js';
import { db, t } from './db.js';

async function main() {
    await reset_tables(db, Object.values(t));

    await seed_events(db);
    await seed_experiences(db);
    await seed_experience_requests(db);
    await seed_experience_rejected(db);
    await seed_experience_approved(db);

    db.$client.close();
}

async function reset_tables(db: Database, tables: Array<Table>) {
    for (const t of tables) {
        await db.delete(t);
    }
}

async function seed_events(db: Database) {
    await db.insert(t.event).values(events.data);
}

async function seed_experiences(db: Database) {
    await db.insert(t.experience).values(mock_experience_data);
}

async function seed_experience_requests(db: Database) {
    await db.insert(t.experience_request).values(mock_experience_requests_data);
}
async function seed_experience_rejected(db: Database) {
    await db.insert(t.experience_rejected).values(mock_experience_rejected_data);
}
async function seed_experience_approved(db: Database) {
    await db.insert(t.experience_approved).values(mock_experience_approved_data);
}

export const mock_experience_data = [
    {
        id: 'exp_1_ai_impact',
        event_id: 'desembarco-argentina-en-georgias',
        title: 'Impact of AI on Daily Life',
        date: '2024-01-16',
        content: 'Attended a fascinating panel discussion on the pervasive influence of AI on our daily routines, from smart assistants to personalized recommendations. The ethical implications were particularly thought-provoking.',
        author_email: 'alice.smith@example.com',
        author_fullname: 'Alice Smith',
        author_perspective: 'Attendee',
        author_website: 'https://alicesmithwrites.com',
        created_at: '2024-01-17T11:20:00Z',
        updated_at: new Date('2024-01-17T11:20:00Z')
    },
    {
        id: 'exp_2_react_hooks',
        event_id: 'tension-diplomatica-por-presencia-en-leith',
        title: 'Mastering React Hooks',
        date: '2024-03-21',
        content: 'Participated in a hands-on workshop about advanced React Hooks. Learned about custom hooks, context API integration, and performance optimizations. A game-changer for front-end development!',
        author_email: 'bob.johnson@example.com',
        author_fullname: 'Bob Johnson',
        author_perspective: 'Workshop Participant',
        author_website: null,
        created_at: '2024-03-22T09:45:00Z',
        updated_at: new Date('2024-03-22T09:45:00Z')
    },
    {
        id: 'exp_3_renewable_energy',
        event_id: 'retiro-del-ara-bahia-buen-suceso-y-movimientos-britanicos',
        title: 'Innovations in Renewable Energy',
        date: '2024-05-02',
        content: 'Attended a presentation on the latest breakthroughs in solar and wind energy technologies. Exciting progress is being made in efficiency and storage solutions, paving the way for a greener future.',
        author_email: 'carol.davis@example.com',
        author_fullname: 'Carol Davis',
        author_perspective: 'Environmental Enthusiast',
        author_website: null,
        created_at: '2024-05-03T16:00:00Z',
        updated_at: new Date('2024-05-03T16:00:00Z')
    },
    {
        id: 'exp_4_mars_colonization',
        event_id: 'prensa-britanica-califica-invasion',
        title: 'Challenges of Mars Colonization',
        date: '2024-06-11',
        content: 'Listened to a captivating lecture on the engineering and biological hurdles of establishing a sustainable human presence on Mars. The challenges are immense, but the vision is inspiring.',
        author_email: 'david.wilson@example.com',
        author_fullname: 'David Wilson',
        author_perspective: 'Astrophysics Student',
        author_website: 'https://davidwilsonspace.blog',
        created_at: '2024-06-12T10:15:00Z',
        updated_at: new Date('2024-06-12T10:15:00Z')
    },
    {
        id: 'exp_5_content_marketing',
        event_id: 'desembarco-argentina-en-georgias',
        title: 'Effective Content Marketing',
        date: '2024-07-06',
        content: 'Gained valuable insights into crafting compelling content and optimizing it for various digital platforms. The session on SEO best practices was particularly helpful.',
        author_email: 'eve.brown@example.com',
        author_fullname: 'Eve Brown',
        author_perspective: 'Marketing Professional',
        author_website: 'https://evethemarketer.com',
        created_at: '2024-07-07T09:00:00Z',
        updated_at: new Date('2024-07-07T09:00:00Z')
    },
    {
        id: 'exp_6_phishing_detection',
        event_id: 'tension-diplomatica-por-presencia-en-leith',
        title: 'Advanced Phishing Detection',
        date: '2024-08-13',
        content: 'Learned about the latest techniques used in phishing attacks and practical strategies for detection and prevention. The live demonstration of a sophisticated phishing attempt was eye-opening.',
        author_email: 'frank.green@example.com',
        author_fullname: 'Frank Green',
        author_perspective: 'IT Security Specialist',
        author_website: null,
        created_at: '2024-08-14T14:00:00Z',
        updated_at: new Date('2024-08-14T14:00:00Z')
    },
    {
        id: 'exp_7_quantum_computing',
        event_id: 'desembarco-argentina-en-georgias',
        title: 'Quantum Computing Breakthroughs',
        date: '2024-01-17',
        content: 'Attended a parallel session focusing on recent advancements in quantum computing. The potential for future technological disruption is immense.',
        author_email: 'grace.taylor@example.com',
        author_fullname: 'Grace Taylor',
        author_perspective: 'Researcher',
        author_website: null,
        created_at: '2024-01-18T10:00:00Z',
        updated_at: new Date('2024-01-18T10:00:00Z')
    },
    {
        id: 'exp_8_css_grid',
        event_id: 'tension-diplomatica-por-presencia-en-leith',
        title: 'CSS Grid Layouts Deep Dive',
        date: '2024-03-22',
        content: 'Explored the intricacies of CSS Grid for responsive and complex layouts. Many practical examples and best practices were shared.',
        author_email: 'henry.white@example.com',
        author_fullname: 'Henry White',
        author_perspective: 'Front-end Developer',
        author_website: 'https://henrycodes.dev',
        created_at: '2024-03-23T11:00:00Z',
        updated_at: new Date('2024-03-23T11:00:00Z')
    },
];

export const mock_experience_requests_data = [
    {
        id: 1,
        experience_id: 'exp_1_ai_impact',
        status: 'pending' as const,
        created_at: '2024-01-18T08:00:00Z',
        updated_at: new Date('2024-01-18T08:00:00Z')
    },
    {
        id: 2,
        experience_id: 'exp_2_react_hooks',
        status: 'approved' as const,
        created_at: '2024-03-23T10:30:00Z',
        updated_at: new Date('2024-03-23T11:00:00Z')
    },
    {
        id: 3,
        experience_id: 'exp_5_content_marketing',
        status: 'pending' as const,
        created_at: '2024-07-08T10:00:00Z',
        updated_at: new Date('2024-07-08T10:00:00Z')
    },
    {
        id: 4,
        experience_id: 'exp_6_phishing_detection',
        status: 'pending' as const,
        created_at: '2024-08-15T09:30:00Z',
        updated_at: new Date('2024-08-15T09:30:00Z')
    },
    {
        id: 5,
        experience_id: 'exp_7_quantum_computing',
        status: 'rejected' as const,
        created_at: '2024-01-19T14:00:00Z',
        updated_at: new Date('2024-01-19T14:30:00Z')
    },
    {
        id: 6,
        experience_id: 'exp_8_css_grid',
        status: 'approved' as const,
        created_at: '2024-03-24T08:00:00Z',
        updated_at: new Date('2024-03-24T08:15:00Z')
    },
];

export const mock_experience_approved_data = [
    {
        id: 1,
        experience_id: 'exp_2_react_hooks',
        notes: 'Content is well-written and provides valuable insights into React Hooks. Approved for publication.',
        created_at: '2024-03-23T11:00:00Z',
    },
    {
        id: 2,
        experience_id: 'exp_8_css_grid',
        notes: 'Excellent practical examples and clear explanations of CSS Grid. Ready for publishing.',
        created_at: '2024-03-24T08:15:00Z',
    },
];

export const mock_experience_rejected_data = [
    {
        id: 1,
        experience_id: 'exp_3_renewable_energy',
        reason: 'Content lacks sufficient detail and specific examples to be informative for our audience.',
        created_at: '2024-05-04T13:45:00Z',
    },
    {
        id: 2,
        experience_id: 'exp_7_quantum_computing',
        reason: 'The article relies too heavily on highly technical jargon without sufficient explanation for a general audience. Please revise for clarity.',
        created_at: '2024-01-19T14:30:00Z',
    },
];

main();
