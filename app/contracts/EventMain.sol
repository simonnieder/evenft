// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EventMain is ERC721{
    constructor() ERC721("Event", "EVT"){
    }

    Ticket[] public tickets;
    Event[] public events;
    
    struct Ticket{
        uint evtId;
        uint number;
        address payable owner;
        uint256 price;
        bool forSale;
    }

    struct Event{
        string title;
        string description;
        string date;
        address payable creator;
        uint amount;
        uint remainingAmount;
        uint256 price;
    }


    function createEvent(string memory _title, string memory _description,string memory _date, uint _amount, uint256 _price) public {
        Event memory evt = Event(_title, _description, _date, payable(msg.sender), _amount, _amount, _price);
        events.push(evt);   
    }

    //returns all Events, NOT Tickets
    function getEvents() public view returns (Event[] memory _event){
        Event[] memory allEvents = events;
        return allEvents;
    }

    //returns all Events, NOT Tickets
    function getEvent(uint _evtId) public view returns (Event memory){
        Event memory evt = events[_evtId];
        return evt;
    }

    //returns all minted Tickets
    function getTickets() public view returns (Ticket[] memory ticket){
        Ticket[] memory allTickets = tickets;
        return allTickets;
    }

    //returns all minted Tickets for sale
    function getTicketsForSale() public view returns (Ticket[] memory ticket){
        //memory doesn't allow dynamic arrays, so this is the best we can do :(
        Ticket[] memory ticketsForSale = new Ticket[](tickets.length);
        uint count = 0;
        for (uint i=0; i<tickets.length; i++) {
            if(tickets[i].forSale == true){
                ticketsForSale[i] = tickets[i];    
                ++count;
            }
        }

        //solidity does not allow dynamic arrays in memory. Because of this we need to remove the empty indexes
        Ticket[] memory trimmedTickets = new Ticket[](count);
        for (uint i=0; i<count; i++) {
            trimmedTickets[i] = ticketsForSale[i];
        }

        return trimmedTickets;
    }
    
    event CoolEvent(address payable addr1, address payable addr2);

    //returns all Tickets the sender owns
    function getMyTickets(address addr) public view returns (Ticket[] memory ticket){
        Ticket[] memory ticketsFrom = new Ticket[](tickets.length);
        address payable sender = payable(addr);
        uint count = 0;
        for (uint i=0; i<tickets.length; i++) {
            if(tickets[i].owner == sender){
                ticketsFrom[count] = tickets[i];    
                ++count;
            }
        }
        
        //solidity does not allow dynamic arrays in memory. Because of this we need to remove the empty indexes
        Ticket[] memory trimmedTickets = new Ticket[](count);
        for (uint i=0; i<count; i++) {
            trimmedTickets[i] = ticketsFrom[i];
        }

        return trimmedTickets;
    }

    //purchase a Ticket that matches with Event-ID
    function buyTicket(uint _evtId) public payable{
        require(_evtId < events.length && _evtId >= 0);
        
        Event storage evt = events[_evtId];
        require(msg.value >= evt.price);
        require(evt.remainingAmount > 0);

        uint ticketNumber = evt.amount - evt.remainingAmount + 1;

        tickets.push(Ticket(_evtId, ticketNumber, payable(msg.sender), evt.price, false));
        evt.remainingAmount -= 1;

        uint ticketId = tickets.length-1;
        //mint Ticket to buyers address
        _safeMint(msg.sender, ticketId);
        //send the creator the transmitted money
        evt.creator.transfer(msg.value);
    }
    
    function buyTicketFromMarket(uint ticketId) public payable{
        require(ticketId < tickets.length && ticketId >= 0);

        Ticket storage ticket = tickets[ticketId];

        require(ticket.forSale==true);
        require(msg.value >= ticket.price);

        Event memory evt = events[ticket.evtId];
        uint creatorFee = uint(msg.value / 10);
        evt.creator.transfer(creatorFee);
        ticket.owner.transfer(msg.value-creatorFee);
        _transfer(ticket.owner, msg.sender, ticketId);
        ticket.owner=payable(msg.sender);
        ticket.forSale = false;
    }


    //put ticket up for sale
    function startSellingTicket(uint _ticketId, uint _price) public{
        require(_ticketId < tickets.length && _ticketId >= 0);
        require(tickets[_ticketId].owner == msg.sender);
        Ticket storage ticket = tickets[_ticketId];
        ticket.forSale = true;
        ticket.price = _price;
    }

    //put ticket down from sale
    function stopSellingTicket(uint _ticketId) public{
        require(_ticketId < tickets.length && _ticketId >= 0);
        require(tickets[_ticketId].owner == msg.sender);
        Ticket storage ticket = tickets[_ticketId];
        ticket.forSale = false;
    }

}
