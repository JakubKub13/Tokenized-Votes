import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();
import { developmentChains, networkConfig } from "../helper-hardhat-config";

async function main() {
    let myErc20Vote: MyERC20Vote;
    let account1: SignerWithAddress

    const [deployer] = await ethers.getSigners();
    account1 = await ethers.getSigner("0x01825FD823d3Bc1806115B011980068bE6405C11")
    const chainId = network.config.chainId;
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];

    myErc20Vote = await ethers.getContractAt("MyERC20Vote", tokenAddr, deployer);
    let deployerInitVotes = await myErc20Vote.getVotes(deployer.address);
    let deployerInitVotesFormatted = deployerInitVotes.toString();
    console.log(`Deployer initial votes before delegation are: ${deployerInitVotesFormatted}`);

    const delegateTx1 = await myErc20Vote.delegate(deployer.address);
    await delegateTx1.wait();
    let deployerVotesAfterDel = await myErc20Vote.getVotes(deployer.address);
    let deployerVotesAfterDelFormatted = deployerVotesAfterDel.toString();
    console.log(`Deployer votes after self-delegation are: ${deployerVotesAfterDelFormatted}`);

    let Account1InitVotes = await myErc20Vote.getVotes(account1.address);
    let Account1InitVotesFormatted = Account1InitVotes.toString();
    console.log(`Account 1 initial votes before delegation are: ${Account1InitVotesFormatted}`);

    const delegateTx2 = await myErc20Vote.connect(account1).delegate(account1.address);
    await delegateTx2.wait();
    let acc1VotesAfterDel = await myErc20Vote.getVotes(account1.address);
    let acc1VotesAfterDelFormatted = acc1VotesAfterDel.toString();
    console.log(`Account 1 votes after self-delegation are: ${acc1VotesAfterDelFormatted}`);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  