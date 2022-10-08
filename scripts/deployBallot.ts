import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import { networkConfig } from "../helper-hardhat-config";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }
  
  const [deployer] = await ethers.getSigners();
  const tokenizedBallotFactory = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = await tokenizedBallotFactory.deploy(convertStringArrayToBytes32(PROPOSALS), "0x5FbDB2315678afecb367f032d93F642f64180aa3", 0);
  await tokenizedBallot.deployed();
  console.log(`Tokenized Ballot contract was deployed ad : ${tokenizedBallot.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

