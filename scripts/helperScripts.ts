import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
  
    function convertStringArrayToBytes32(array: string[]) {
        const bytes32Array = [];
        for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
        }
        return bytes32Array;
    }
    console.log(convertStringArrayToBytes32(PROPOSALS))

    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });