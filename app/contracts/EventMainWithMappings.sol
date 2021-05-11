// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";






/*
NOT IN USE!
NOT IN USE!
NOT IN USE!
NOT IN USE!
NOT IN USE!

Basically the same thing as EventMain.sol, the only difference is that it's using mappings instead of arrays.
The only purpuse is to compare gas fees

NOT IN USE!
NOT IN USE!
NOT IN USE!
NOT IN USE!
NOT IN USE!
*/





contract EventMainWithMappings is ERC721{
    constructor() ERC721("Event", "EVT"){
    }
    uint ticketCount;
    uint eventCount;
    mapping(uint => Ticket) tickets;
    mapping(uint => Event) events;

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
        address payable creator;
        uint amount;
        uint remainingAmount;
        uint256 price;
    }


    function createEvent(string memory _title, string memory _description, uint _amount, uint256 _price) public {
        Event memory evt = Event(_title, _description, payable(msg.sender), _amount, _amount, _price);
        events[eventCount] = evt;
        eventCount+=1;
    }

    //returns all Events, NOT Tickets
    function getEvents() public view returns (Event[] memory evt){
        Event[] memory allEvents = new Event[](eventCount);
        for (uint i=0; i<eventCount; i++) {
            allEvents[i] = events[i];
        }
        return allEvents;
    }

    //returns all minted Tickets
    function getTickets() public view returns (Ticket[] memory ticket){
        Ticket[] memory allTickets = new Ticket[](ticketCount);
        for (uint i=0; i<ticketCount; i++) {
            allTickets[i] = tickets[i];
        }
        return allTickets;
    }

    //returns all minted Tickets
    function getTicketsForSale() public view returns (Ticket[] memory ticket){
        //memory doesn't allow dynamic arrays, so this is the best we can do :(
        Ticket[] memory ticketsForSale = new Ticket[](ticketCount);
        uint count = 0;
        for (uint i=0; i<ticketCount; i++) {
            if(tickets[i].forSale){
                ticketsForSale[count] = tickets[i];    
                ++count;
            }
        }
        return ticketsForSale;
    }

    //returns all Tickets the sender owns
    function getMyTickets() public view returns (Ticket[] memory ticket){
        Ticket[] memory ticketsFrom = new Ticket[](ticketCount);
        uint count = 0;
        for (uint i=0; i<ticketCount; i++) {
            if(tickets[i].owner == msg.sender){
                ticketsFrom[count] = tickets[i];    
                ++count;
            }
        }
        return ticketsFrom;
    }

    //purchase a Ticket that matches with Event-ID
    function buyTicket(uint evtId) public payable{
        require(evtId < eventCount && evtId >= 0);
        
        Event memory evt = events[evtId];
        require(msg.value >= evt.price);
        require(evt.remainingAmount > 0);

        uint ticketNumber = evt.amount - evt.remainingAmount + 1;
        evt.remainingAmount -=1;
        events[eventCount] = evt;
        Ticket memory newTicket = Ticket(evtId, ticketNumber, payable(msg.sender), 0, false);
        tickets[ticketCount] = newTicket;
        //mint Ticket to buyers address
        _safeMint(msg.sender, ticketCount);
        ticketCount +=1;
        //send the creator the transmitted money
        evt.creator.transfer(msg.value);
    }
    
    function buyTicketFromMarket(uint ticketId) public payable{
        require(ticketId < ticketCount && ticketId >= 0);

        Ticket memory ticket = tickets[ticketId];

        // require(ticket.forSale==true);
        require(msg.value >= ticket.price);

        // Event memory evt = events[ticketIdToEventId[ticketId]];
        // uint creatorFee = msg.value * 0.1;
        // evt.creator.transfer(creatorFee);
        ticket.owner.transfer(msg.value);
        _transfer(ticket.owner, msg.sender, ticketId);
        ticket.owner=payable(msg.sender);
        tickets[ticketId] = ticket;
    }

    function startSellingTicket(uint _ticketId, uint _price) public{
        require(_ticketId < ticketCount && _ticketId >= 0);
        Ticket memory ticket = tickets[_ticketId];
        ticket.forSale = true;
        ticket.price = _price;
        tickets[_ticketId] = ticket;
    }

    function stopSellingTicket(uint _ticketId) public{
        require(_ticketId < ticketCount && _ticketId >= 0);
        Ticket memory ticket = tickets[_ticketId];
        ticket.forSale = true;
        ticket.price = 0;
        tickets[_ticketId] = ticket;
    }
}