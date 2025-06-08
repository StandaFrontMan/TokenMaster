// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenMaster is ERC721 {

  address public owner;
  uint256 public totalOccasions;
  uint256 public totalSupply;

  struct Occasion {
    uint256 id;
    uint256 cost;
    uint256 tickets;
    uint256 maxTickets;
    string name;
    string date;
    string time;
    string location;
  }

  mapping(uint256 => Occasion) occasions;

  /// @notice Maps occasion ID to seat number to the address that owns the seat.
  /// @dev seatTaken[occasionId][seatNumber] => address of ticket holder.
  mapping(uint256 => mapping(uint256 => address)) public seatTaken;

  /// @notice Maps occasion ID to alredy taken seats array
  /// @dev takenSeats[occasionId] => [alredy taken seats id's]
  mapping(uint256 => uint256[]) public takenSeats;

  /// @notice Maps occasion ID to whether a given address has bought a ticket.
  /// @dev hasBought[occasionId][address] => true if the address has purchased a ticket for the occasion.
  mapping(uint256 => mapping(address => bool)) public hasBought;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    owner = msg.sender;
  }

  function list(
    string memory _name,
    string memory _date,
    string memory _time,
    string memory _location,
    uint256 _cost,
    uint256 _maxTickets
  ) public onlyOwner {

    totalOccasions++;

    occasions[totalOccasions] = Occasion({
      id: totalOccasions,
      cost: _cost,
      tickets: _maxTickets,
      maxTickets: _maxTickets,
      name: _name,
      date: _date,
      time: _time,
      location: _location
    });
  }

  function mint(
    uint256 _id,
    uint256 _seat
  ) public payable {

    occasions[_id].tickets -=1; // Update ticket count

    hasBought[_id][msg.sender] = true; // Update buying status

    seatTaken[_id][_seat] = msg.sender; // Assign seat

    takenSeats[_id].push(_seat); // Update seats currently taken

    totalSupply++;

    _safeMint(msg.sender, totalSupply);
  }

  function getOccasion(uint256 _id) public view returns (Occasion memory) {
    return occasions[_id];
  }

  function getTakenSeats(uint256 _id) public view returns (uint256[] memory) {
    return takenSeats[_id];
  }
}
