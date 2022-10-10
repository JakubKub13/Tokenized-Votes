import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();

async function main() {
    const options = {
        alchemy: process.env.GOERLI_RPC_URL,
    };
    const provider = ethers.providers.getDefaultProvider("goerli", options);
    const lastBlock = await provider.getBlock("latest");
    console.log({ lastBlock });
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });