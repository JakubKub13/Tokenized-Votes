import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const myErc20VoteFactory = await ethers.getContractFactory("MyERC20Vote");
    const myErc20Vote = await myErc20VoteFactory.deploy();
    await myErc20Vote.deployed();
    console.log(`My token contract was deployed at the address of ${myErc20Vote.address}`);
    const totalSupply = await myErc20Vote.totalSupply();
    console.log(`The initial total supply of this contract after deployment is ${totalSupply}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});