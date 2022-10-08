import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const [deployer] = await ethers.getSigners();
    const myErc20VoteFactory = await ethers.getContractFactory("MyERC20Vote");
    const myErc20Vote = await myErc20VoteFactory.deploy();
    await myErc20Vote.deployed();
    console.log(`My token contract was deployed at the address of ${myErc20Vote.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


