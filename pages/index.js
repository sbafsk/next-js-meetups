import Head from 'next/head';

import { getAllMeetups } from './mongo-context/mongo-context';

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

// nextjs function, gets called first
// backend code, executes during building process

export async function getStaticProps() {
  // use to cache data and dont need to reload everytime pages refresh
  // always return an object
  // fetch data from api

  const meetups = await getAllMeetups();

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
