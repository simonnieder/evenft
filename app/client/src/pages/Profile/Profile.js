import EventsProfile from "../../components/EventsProfile"
const Profile = () => {
    return (
        <div className="padding-y side-padding">
            <div className="flex justify-center sm:block">
                <h1 className="header">Your Tickets</h1>
            </div>
            <EventsProfile></EventsProfile>
        </div>
    )
}

export default Profile
