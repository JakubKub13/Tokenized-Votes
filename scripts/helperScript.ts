import { deployments, ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import {networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { providers } from "ethers";


async function main() {
    const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

    function convertStringArrayToBytes32(array: string[]) {
        const bytes32Array = [];
        for (let index = 0; index < array.length; index++) {
          bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
        }
        return bytes32Array;
      }

    const bytes32Props = convertStringArrayToBytes32(PROPOSALS)
    const chainId = network.config.chainId;
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];
    console.log(bytes32Props, tokenAddr, 7740650)
    
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  