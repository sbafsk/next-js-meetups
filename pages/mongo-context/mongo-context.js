import { MongoClient } from 'mongodb';

const user = 'seba-mongo';
const pass = 'TFP83tHAbltQDC08';
const dbName = 'meetups';
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.ntm1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export async function getAllMeetups() {
  const client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return meetups;
}

export async function getMeetupsById(meetupId) {
  const client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return selectedMeetup;
}

export async function getAllMeetupsIds() {
  const client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return meetups;
}
