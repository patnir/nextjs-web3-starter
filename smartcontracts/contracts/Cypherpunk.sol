// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cypherpunk is ERC721, Ownable {
    uint256 public constant MAX_PUNKS = 10000;
    uint256 public total = 0;
    string private baseURI;
    uint256 public price;

    constructor(string memory baseURI_, uint256 price_)
        ERC721("Cypherpunk", "CYPHERPUNK")
    {
        baseURI = baseURI_;
        price = price_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint() external virtual {
        require(total < MAX_PUNKS, "Sold Out");
        _safeMint(msg.sender, total, "");
        total += 1;
        refundIfOver();
    }

    function refundIfOver() private {
        require(msg.value >= price, "Not enough ETH");
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
}
