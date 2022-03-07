import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function addMeetupHandler(enterredMeetupData) {
    console.log(enterredMeetupData);
  }
  return <NewMeetupForm onAddmeetup={addMeetupHandler} />;
}
export default NewMeetupPage;
