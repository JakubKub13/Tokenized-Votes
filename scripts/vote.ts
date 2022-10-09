import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();


async function main() {
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });