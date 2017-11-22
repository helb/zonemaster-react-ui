import Dexie from 'dexie';

const db = new Dexie('zonemaster');

db.version(1).stores({
  results: '&id,domain,date'
});

export default {
  add: async result => db.table('results').add(result),

  count: async () => db.table('results').count(),

  list: async (key = 'date', order = 'desc') => {
    const results = await db
      .table('results')
      .toCollection()
      .sortBy(key);
    return order === 'desc' ? results.reverse() : results;
  }
};
