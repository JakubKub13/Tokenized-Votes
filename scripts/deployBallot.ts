import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import { developmentChains, networkConfig, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { TokenizedBallot } from "../typechain-types";
dotenv.config();
import verify from "../verify";


async function main() {
  const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
  
  function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }
  
  const [deployer] = await ethers.getSigners();
  const chainId = network.config.chainId;
  const tokenAddr = networkConfig[chainId]["myERC20Vote"];
  //const currentBlock = await ethers.provider.getBlock("latest");
  const bytes32Proposals = convertStringArrayToBytes32(PROPOSALS);

  const tokenizedBallotFactory = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallot = await tokenizedBallotFactory.deploy(bytes32Proposals, tokenAddr, 7745008) as TokenizedBallot;
  await tokenizedBallot.deployed()
  console.log(`Tokenized Ballot contract was deployed ad : ${tokenizedBallot.address}`);


  const args: any[] = [convertStringArrayToBytes32(PROPOSALS), tokenAddr, 7740650];
  
  //Verify the deployment
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
   console.log("Verifying......")
   await verify(tokenizedBallot.address, args)
  }
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Goerli address: 0x52588112002b6d289018A0d761Cdf566fc246305
