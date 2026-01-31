import Dexie from 'dexie';

export const db = new Dexie('IzzyDatabase');


db.version(1).stores({
    storyboards: '++id, name, createdAt',
    scenes: '++id, storyboardId, number'
});

export default db;