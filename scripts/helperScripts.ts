import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const options = {
    //     alchemy: process.env.GOERLI_RPC_URL,
    // };
    // const provider = ethers.providers.getDefaultProvider("goerli", options);
    // const lastBlock = await provider.getBlock("latest");
    // console.log({ lastBlock });
    // console.log("Deploying Ballot contract");
    // console.log("Proposals: ");
    // PROPOSALS..forEach((element, index) => {
    //     console.log(`Proposal N. ${index + 1}: ${element}`);
    // });
    // const tokenizedBallotFactory = new TokenizedBallot__factory(signer);
    
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });