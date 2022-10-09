import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote, TokenizedBallot } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();

const AMOUNT_TO_VOTE = ethers.utils.parseUnits("1", "ether");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
    const privateKey1 = process.env.PRIVATE_KEY;
    const privateKey2 = process.env.PRIVATE_KEY2;
    const privateKey3 = process.env.PRIVATE_KEY3;

    let tokenizedBallot: TokenizedBallot;

    const chainId = network.config.chainId;
    const ballotAddr = networkConfig[chainId]["tokenizedBallot"];

    const tokenizeBallot_ABI = [
        "function vote(uint256 proposal, uint256 amount) public",
        "function votePower(address account) public view returns (uint256 votePower_)",
        "function winningProposal() public view returns (uint256 winningProposal_)",
        "function winnerName() external view returns (bytes32 winnerName_)",
        
    ];

    let deployer = new ethers.Wallet(privateKey1, provider);
    let account1 = new ethers.Wallet(privateKey2, provider);
    let account2 = new ethers.Wallet(privateKey3, provider);

    tokenizedBallot = new ethers.Contract(ballotAddr, tokenizeBallot_ABI, provider) as TokenizedBallot;

    const votePowerDeployerBefore = await tokenizedBallot.votePower(deployer.address);
    const votePowerAccount1Before = await tokenizedBallot.votePower(account1.address);
    const votePowerAccount2Before = await tokenizedBallot.votePower(account2.address);
    
    console.log(`Deployer's vote power before vote is ${votePowerDeployerBefore.toString()}`);
    console.log(`Account 1's vote power before vote is ${votePowerAccount1Before.toString()}`);
    console.log(`Account 2's vote power before vote is ${votePowerAccount2Before.toString()}`);

    const voteTx1 = await tokenizedBallot.connect(deployer).vote(1, AMOUNT_TO_VOTE);
    await voteTx1.wait();
    const voteTx2 = await tokenizedBallot.connect(account1).vote(1, AMOUNT_TO_VOTE);
    await voteTx2.wait();
    const voteTx3 = await tokenizedBallot.connect(account2).vote(1, AMOUNT_TO_VOTE);
    await voteTx3.wait();

    const votePowerDeployerAfter = await tokenizedBallot.votePower(deployer.address);
    const votePowerAccount1After = await tokenizedBallot.votePower(account1.address);
    const votePowerAccount2After = await tokenizedBallot.votePower(account2.address);

    console.log(`Deployer's vote power after vote is ${votePowerDeployerAfter.toString()}`);
    console.log(`Account 1's vote power after vote is ${votePowerAccount1After.toString()}`);
    console.log(`Account 2's vote power after vote is ${votePowerAccount2After.toString()}`);
    
    const winner = await tokenizedBallot.winnerName();
    const indexWinner = await tokenizedBallot.winningProposal();
    console.log(winner);
    console.log(indexWinner.toString());
    
    
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });