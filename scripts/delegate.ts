import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();

async function main() {
    let myErc20Vote: MyERC20Vote;

    const [deployer, account1] = await ethers.getSigners();
    myErc20Vote = await ethers.getContractAt("MyERC20Vote", "0x5FbDB2315678afecb367f032d93F642f64180aa3", deployer);
    let deployerInitVotes = await myErc20Vote.getVotes(deployer.address);
    let deployerInitVotesFormatted = deployerInitVotes.toNumber();
    console.log(`Deployer initial votes before delegation are: ${deployerInitVotesFormatted}`);

    const delegateTx1 = await myErc20Vote.delegate(deployer.address);
    await delegateTx1.wait();
    let deployerVotesAfterDel = await myErc20Vote.getVotes(deployer.address);
    let deployerVotesAfterDelFormatted = deployerVotesAfterDel.toNumber();
    console.log(`Deployer votes after self-delegation are: ${deployerVotesAfterDelFormatted}`);

    let Account1InitVotes = await myErc20Vote.getVotes(account1.address);
    let Account1InitVotesFormatted = Account1InitVotes.toNumber();
    console.log(`Account 1 initial votes before delegation are: ${Account1InitVotesFormatted}`);

    const delegateTx2 = await myErc20Vote.connect(account1).delegate(account1.address);
    await delegateTx2.wait();
    let acc1VotesAfterDel = await myErc20Vote.getVotes(account1.address);
    let acc1VotesAfterDelFormatted = acc1VotesAfterDel.toNumber();
    console.log(`Account 1 votes after self-delegation are: ${acc1VotesAfterDelFormatted}`);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  