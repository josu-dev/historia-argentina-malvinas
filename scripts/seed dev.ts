import type { Database } from './db.js';
import { db, t } from './db.js';

async function main() {
    await seed_experience_requests(db);
    await seed_experience_rejected(db);
    await seed_experience_approved(db);

    db.$client.close();
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

const mock_experience_requests_data = [
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

const mock_experience_approved_data = [
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

const mock_experience_rejected_data = [
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
