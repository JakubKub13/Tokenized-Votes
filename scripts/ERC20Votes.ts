import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const TOKENS_MINTED = ethers.utils.parseEther("1");

async function main() {
    const [deployer, account1, account2] = await ethers.getSigners();
    const myErc20VoteFactory = await ethers.getContractFactory("MyERC20Vote");
    const myErc20Vote = await myErc20VoteFactory.deploy();
    await myErc20Vote.deployed();
    console.log(`My token contract was deployed at the address of ${myErc20Vote.address}`);
    const totalSupply = await myErc20Vote.totalSupply();
    console.log(`The initial total supply of this contract after deployment is ${totalSupply}`);
    console.log("Minting new tokens for Account 1");
    const mintTx = await myErc20Vote.mint(account1.address, TOKENS_MINTED);
    await mintTx.wait();
    const totalSupplyAfterMint = await myErc20Vote.totalSupply();
    console.log(`The total supply of this contract after minting is ${totalSupplyAfterMint}`);



} 

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});