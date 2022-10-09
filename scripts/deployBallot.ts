import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import { developmentChains } from "../helper-hardhat-config";
import { TokenizedBallot } from "../typechain-types";
dotenv.config();
import verify from "../verify";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  let tokenizedBallot: TokenizedBallot;

  function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }
  
  const [deployer] = await ethers.getSigners();
  const tokenizedBallotFactory = await ethers.getContractFactory("TokenizedBallot");
  tokenizedBallot = await tokenizedBallotFactory.deploy(convertStringArrayToBytes32(PROPOSALS), "0x5FbDB2315678afecb367f032d93F642f64180aa3", 1) as TokenizedBallot;
  await tokenizedBallot.deployed();
  console.log(`Tokenized Ballot contract was deployed ad : ${tokenizedBallot.address}`);
  const args: any[] = [convertStringArrayToBytes32(PROPOSALS), "0x5FbDB2315678afecb367f032d93F642f64180aa3", 1]
  // Verify the deployment
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying......")
    await verify(tokenizedBallot.address, args)
}
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

