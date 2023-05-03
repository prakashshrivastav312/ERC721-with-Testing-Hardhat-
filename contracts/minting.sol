// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


//firebase Uri -> https://firebasestorage.googleapis.com/v0/b/nft101-e636b.appspot.com/o/metadata%2F

contract IBBA is ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private baseUri;
    address private housewallet;
//During the deployment of the contract, we will pass _baseuri (Common MetaData URI for each NFT)  and House wallet
    constructor(string memory _baseuri, address _houseWallet) ERC721("IBBA NFTs", "INFTs") {
        baseUri = _baseuri;
        housewallet = _houseWallet;
    }
    //Owner can transfer ownership of the smart contract to another  
    function changeOwnership(address newOwner) public onlyOwner returns (address)  {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
        return (newOwner);
     }

  
    function pause() public onlyOwner  {
        _pause();

    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function BatchMinting(uint256 numberOfNFTs) public onlyOwner {
      
        for(uint i=0;i<numberOfNFTs;i++){
         _tokenIdCounter.increment();
         uint256 tokenId = _tokenIdCounter.current();
       
         _safeMint(housewallet, tokenId);
         _setTokenURI(tokenId, tokenURI(tokenId));

        }


    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {  if (!_exists(tokenId)) revert("Token ID does not exist!");
        
        return string(abi.encodePacked(baseUri, Strings.toString(tokenId), ".json?alt=media"));
    }
}
