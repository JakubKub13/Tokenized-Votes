import { deployments, ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import {networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { providers } from "ethers";


async function main() {
    const AMOUNT_TO_MINT = ethers.utils.parseUnits("1", "ether")
    console.log(AMOUNT_TO_MINT.toString());
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  