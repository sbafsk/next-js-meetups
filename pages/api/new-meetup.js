import { MongoClient } from 'mongodb';

// api/new-meetup
const user = 'seba-mongo';
const pass = 'TFP83tHAbltQDC08';
const dbName = 'meetups';
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.ntm1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!', data: result });
  }
}

export default handler;
