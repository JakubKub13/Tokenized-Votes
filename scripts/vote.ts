import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { TokenizedBallot, MyERC20Vote } from "../typechain-types";
dotenv.config();

async function main() {
    let tokenizedBallot: TokenizedBallot;
    const MAX_VOTES = 1;

    const [deployer, account1] = await ethers.getSigners();
    tokenizedBallot = await ethers.getContractAt("TokenizedBallot", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", deployer);
    let proposal1VoteCountBeforeVoting =  await tokenizedBallot.proposals(0);
    console.log(`Proposal 1 voteCount before any voting is: ${proposal1VoteCountBeforeVoting.voteCount.toNumber()}`);

    /// Deployer with 1 vote votes for Proposal 1
    await tokenizedBallot.vote(0, MAX_VOTES);
    let proposal1VoteCountAfterDeployerVote = await tokenizedBallot.proposals(0);
    console.log(`Proposal 1 voteCount after deployer voted is: ${proposal1VoteCountAfterDeployerVote.voteCount.toNumber()}`);

    /// Account 1 with 1 vote votes for Proposal 1
    await tokenizedBallot.connect(account1).vote(0, MAX_VOTES);
    let proposal1VoteCountAfterAccount1Vote = await tokenizedBallot.proposals(0);
    console.log(`Proposal 1 voteCount after account 1 voted: ${proposal1VoteCountAfterAccount1Vote.voteCount.toNumber()}`);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });