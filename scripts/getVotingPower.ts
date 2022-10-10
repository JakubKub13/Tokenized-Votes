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
        "function votePower(address account) public view returns (uint256 votePower_)",
    ];

    let deployer = new ethers.Wallet(privateKey1, provider);
    let account1 = new ethers.Wallet(privateKey2, provider);
    let account2 = new ethers.Wallet(privateKey3, provider);

    tokenizedBallot = new ethers.Contract(ballotAddr, tokenizeBallot_ABI, provider) as TokenizedBallot;

    const votePowerDeployer = await tokenizedBallot.votePower(deployer.address);
    const votePowerAccount1 = await tokenizedBallot.votePower(account1.address);
    const votePowerAccount2 = await tokenizedBallot.votePower(account2.address);

    console.log(`Voting power of deployer is: ${votePowerDeployer.toString()}`);
    console.log(`Voting power of account 1 is ${votePowerAccount1.toString()}`);
    console.log(`Voting power of account 2 is ${votePowerAccount2.toString()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });