import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";



async function main() {
    let myErc20Vote: MyERC20Vote;
    let account1: SignerWithAddress
    const MINT_AMOUNT = ethers.utils.parseUnits("1", "ether");
    

    const [deployer] = await ethers.getSigners();
    account1 = await ethers.getSigner("0x01825FD823d3Bc1806115B011980068bE6405C11");
    const chainId = network.config.chainId;
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];


    myErc20Vote = await ethers.getContractAt("MyERC20Vote", tokenAddr, deployer);
    let deployerInitBalance = await myErc20Vote.balanceOf(deployer.address);
    let deployerInitBalanceFormatted = deployerInitBalance.toString();
    console.log(`Initial balance of deployer address is : ${deployerInitBalanceFormatted}`);
    
    const mintTx1 = await myErc20Vote.mint(deployer.address, MINT_AMOUNT);
    await mintTx1.wait()
    let deployerAfterMintBalance = await myErc20Vote.balanceOf(deployer.address);
    let deployerAfterMintBalFormatted = deployerAfterMintBalance.toString();
    console.log(`Balance of deployer after mint is : ${deployerAfterMintBalFormatted}`);

    let acc1InitBalance = await myErc20Vote.balanceOf(account1.address);
    let acc1InitBalFormatted = acc1InitBalance.toString();
    console.log(`Initial balance of account 1 is : ${acc1InitBalFormatted}`);

    const mintTx2 = await myErc20Vote.mint(account1.address, MINT_AMOUNT);
    await mintTx2.wait();
    let acc1BalAfterMint = await myErc20Vote.balanceOf(account1.address);
    let acc1BalAfterMintFormatted = acc1BalAfterMint.toString();
    console.log(`Balance of account 1 after minting is: ${acc1BalAfterMintFormatted}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
