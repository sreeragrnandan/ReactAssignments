import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first Meetup",
    image:
      "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Stanford_Oval_May_2011_panorama.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A second Meetup",
    image:
      "https://en.wikipedia.org/wiki/Stanford_University#/media/File:Lake_Lagunita_Stanford_January_2013_panorama_5.jpg",
    address: "Some address 10, 5698 Some City",
    description: "This is a Second meetup!",
  },
];
function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
