import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />;
    </Fragment>
  );
}

const user = 'seba-mongo';
const pass = 'TFP83tHAbltQDC08';
const dbName = 'meetups';
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.ntm1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export async function getStaticPaths() {
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((m) => ({
      params: { meetupId: m._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(mongoUrl);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
  };
}
