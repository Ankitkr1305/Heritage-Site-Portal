const { MongoClient } = require('mongodb');

async function updateImages() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('heritage_crowd_db');

  const updates = [
    { slug: 'taj-mahal', image: '/images/monuments/taj-mahal.jpg' },
    { slug: 'varanasi-ghats', image: '/images/monuments/varanasi-ghats.jpg' },
    { slug: 'red-fort', image: '/images/monuments/red-fort.jpg' },
    { slug: 'qutub-minar', image: '/images/monuments/qutub-minar.jpg' },
    { slug: 'konark-sun-temple', image: '/images/monuments/konark-sun-temple.jpg' },
  ];

  for (const u of updates) {
    const res = await db.collection('monuments').updateOne(
      { slug: u.slug },
      { $set: { image: u.image } }
    );
    console.log('Updated', u.slug, 'modified:', res.modifiedCount);
  }

  await client.close();
  console.log('Finished updating MongoDB monument images.');
}

updateImages().catch(console.error);
