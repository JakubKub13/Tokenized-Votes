import { deployments, ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import {networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { providers } from "ethers";




async function main() {
    let buyer: SignerWithAddress;
    let attacker: SignerWithAddress;

    const chainId = network.config.chainId
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];
    console.log(tokenAddr)
    const MINT_AMOUNT = ethers.utils.parseUnits("1", "ether")
    console.log(MINT_AMOUNT.toString())
    const [deployer] = await ethers.getSigners();
    buyer = await ethers.getSigner("0x01825FD823d3Bc1806115B011980068bE6405C11")
    console.log(buyer.address)
    attacker = await ethers.getSigner("0x24b2CDD4eC5C4Cb86a253682E1829727939bd59b");
    console.log(attacker.address)


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  