import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first Meetup",
    image: "https://converj.com/wp-content/uploads/2021/11/main-banner-5.png",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A second Meetup",
    image: "https://converj.com/wp-content/uploads/2021/11/main-banner-3.png",
    address: "Some address 10, 5698 Some City",
    description: "This is a Second meetup!",
  },
];
function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
