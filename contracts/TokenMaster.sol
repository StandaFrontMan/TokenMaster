// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenMaster is ERC721 {

  address public owner;
  uint256 public totalOccasions;

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
  ) public {
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
}
