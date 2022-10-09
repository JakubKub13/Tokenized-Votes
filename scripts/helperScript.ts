import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import {networkConfig } from "../helper-hardhat-config";




async function main() {
    const chainId = network.config.chainId
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];
    console.log(tokenAddr)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  