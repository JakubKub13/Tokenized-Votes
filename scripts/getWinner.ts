import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
    const privateKey1 = process.env.PRIVATE_KEY;
    const privateKey2 = process.env.PRIVATE_KEY2;
    const privateKey3 = process.env.PRIVATE_KEY3;

    let tokenizedBallot: TokenizedBallot;

    const chainId = network.config.chainId;
    const ballotAddr = networkConfig[chainId]["tokenizedBallot"];

    const tokenizeBallot_ABI = [
        "function winningProposal() public view returns (uint256 winningProposal_)",
        "function winnerName() external view returns (bytes32 winnerName_)",
        "function voteCountProp(uint256 _indexOfProposal) public view returns (uint256)",
    ];

    tokenizedBallot = new ethers.Contract(ballotAddr, tokenizeBallot_ABI, provider) as TokenizedBallot;

    const winner = await tokenizedBallot.winnerName();
    const winnerIndex = await tokenizedBallot.winningProposal();
    const voteCountsProposal1 = await tokenizedBallot.voteCountProp(0)
    const voteCountsProposal2 = await tokenizedBallot.voteCountProp(1);
    const voteCountsProposal3 = await tokenizedBallot.voteCountProp(2);

    console.log(`Currently winning proposal is proposal: ${winner}`);
    console.log("-----------------------------------------------------");
    console.log(`Index of ${winner} is ${winnerIndex}`);
    console.log("-----------------------------------------------------");
    console.log(`Proposal 1 current votes count is ${voteCountsProposal1}`);
    console.log(`Proposal 2 current votes count is ${voteCountsProposal2}`);
    console.log(`Proposal 3 current votes count is ${voteCountsProposal3}`);

    


}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });