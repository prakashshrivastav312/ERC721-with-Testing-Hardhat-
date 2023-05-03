const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const  Web3 = require('web3');

const baseURL = "https://firebasestorage.googleapis.com/v0/b/nft101-e636b.appspot.com/o/metadata%2F";

describe("IBBA Smart Contract ", function () {

   async function deployContractFixture() {
    const [owner, houseAddress, user1Address, user2Address, user3Address] = await ethers.getSigners();

    const ibba = await ethers.getContractFactory("IBBA");

    const ibbaDeployed = await ibba.deploy(baseURL,houseAddress.address);
    return {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address};
  }


  it("Checking deployment of the Smart Contract", async function () {
   
    const [owner, houseAddress, user1Address, user2Address, user3Address] = await ethers.getSigners();

    const ibba = await ethers.getContractFactory("IBBA");

    const ibbaDeployed = await ibba.deploy(baseURL,houseAddress.address);
    const smartContractAddress = ibbaDeployed.address;
    expect(await ibbaDeployed.address).to.equal(smartContractAddress);

  });

  it("Checking the ownership", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);
    const signer = ibbaDeployed.signer.address;
    expect(await ibbaDeployed.owner()).to.equal(signer);

  });

  it("Checking the transfer ownership function", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);
    const newOwner = await ibbaDeployed.changeOwnership(user1Address.address);
    expect(await ibbaDeployed.owner()).to.equal(user1Address.address);

  });
 
  it("Checking NFT Smart Contract Symbol", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);
    expect(await ibbaDeployed.symbol()).to.equal("INFTs");

  });
  it("Checking initial balance of House Wallet", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);
    expect(await ibbaDeployed.balanceOf(houseAddress.address)).to.equal(0);

  });

  it("Checking Batch Minting function where we will mint 100 NFTs and send it to house wallet", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);

    const res= ibbaDeployed.BatchMinting(100);
    expect(await ibbaDeployed.balanceOf(houseAddress.address)).to.equal(100);

  });


  it("Checking the pause function to stop NFTs trading", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);

    await ibbaDeployed.pause();
    
    expect(await ibbaDeployed.paused()).to.equal(true);

  });

  it("Checking the pause function to stop NFTs trading", async function () {
   
    const {ibbaDeployed, owner, houseAddress, user1Address, user2Address, user3Address} = await loadFixture(deployContractFixture);

    await ibbaDeployed.pause();
    
    expect(await ibbaDeployed.paused()).to.equal(true);

  });




});