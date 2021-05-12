import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// // run on server after deployment
// export async function getServerSideProps(context) {
//   // use when need data from the request or data is uptading every second.
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API or FS
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

const user = 'seba-mongo';
const pass = 'TFP83tHAbltQDC08';
const dbName = 'meetups';
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.ntm1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// nextjs function, gets called first
// backend code, executes during building process

export async function getStaticProps() {
  // use to cache data and dont need to reload everytime pages refresh
  // always return an object
  // fetch data from api
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        address: m.address,
        image: m.image,
        description: m.description,
        id: m._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
