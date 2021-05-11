import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../components/Button";
import Image from "./img.png";
const EventDetail = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState({
    name: "Cool Event",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae blandit ante. Maecenas sit amet tristique nisl. Ut varius tristique nisl, dictum tempor dolor egestas nec. Etiam tempor porttitor sem, quis fringilla ex. Nam mollis eu ex sagittis tincidunt. Proin placerat mollis justo, a rutrum massa imperdiet non. Integer in lacinia odio. Donec cursus ac tellus eu vestibulum. Pellentesque luctus est massa, eget euismod ante suscipit sit amet. Ut rhoncus a mauris eget elementum. Morbi et mauris ut quam lobortis luctus. Ut euismod lectus enim, in malesuada metus viverra at.",
    price: 0.994,
  });

  useEffect(() => {
    //TODO: get ticket
  }, []);
  return (
    <div className="side-padding py-5 md:py-10 lg:py-20 flex gap-x-10 flex-col items-center sm:flex-start sm:flex-row ">
      <img src={Image} alt="i dont care" className="rounded-2xl w-11/12 sm:w-5/12 object-cover" />
      <div>
        <h1 className="header mb-3">{ticket.name}</h1>
        <div className="flex gap-x-3 mb-3 ">
          <span className="border-2 border-primary-green text-primary-green rounded-md py-1 px-2 text-xs font-semibold font-body">
            1.25 ETH
          </span>
          <span className="border-2 border-neutrals-500 text-neutrals-500 rounded-md py-1 px-2 text-xs font-semibold font-body">
            2 050,26 €
          </span>
        </div>

        {/* <Accordion title="description">                  */}
        <p className="text-neutrals-500 font-body mb-3 max-w-md">
          {ticket.description}
        </p>
        {/* </Accordion> */}

        <Button>Purchase</Button>
      </div>
    </div>
  );
};

export default EventDetail;
