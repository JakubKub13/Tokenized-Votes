import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();


async function main() {
    let myErc20Vote: MyERC20Vote;
    const MINTING_AMOUNT = 1;

    const [deployer, account1] = await ethers.getSigners();
    myErc20Vote = await ethers.getContractAt("MyERC20Vote", "0x5FbDB2315678afecb367f032d93F642f64180aa3", deployer);
    let deployerInitBalance = await myErc20Vote.balanceOf(deployer.address);
    let deployerInitBalanceFormatted = deployerInitBalance.toNumber();
    console.log(`Initial balance of deployer address is : ${deployerInitBalanceFormatted}`);
    
    const mintTx1 = await myErc20Vote.mint(deployer.address, MINTING_AMOUNT);
    await mintTx1.wait()
    let deployerAfterMintBalance = await myErc20Vote.balanceOf(deployer.address);
    let deployerAfterMintBalFormatted = deployerAfterMintBalance.toNumber();
    console.log(`Balance of deployer after first mint is : ${deployerAfterMintBalFormatted}`);

    let acc1InitBalance = await myErc20Vote.balanceOf(account1.address);
    let acc1InitBalFormatted = acc1InitBalance.toNumber();
    console.log(`Initial balance of account 1 is : ${acc1InitBalFormatted}`);

    const mintTx2 = await myErc20Vote.mint(account1.address, MINTING_AMOUNT);
    await mintTx2.wait();
    let acc1BalAfterMint = await myErc20Vote.balanceOf(account1.address);
    let acc1BalAfterMintFormatted = acc1BalAfterMint.toNumber();
    console.log(`Balance of account 1 after first minting is: ${acc1BalAfterMintFormatted}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
