import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();
import { developmentChains, networkConfig } from "../helper-hardhat-config";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL)
    const privateKey1 = process.env.PRIVATE_KEY;
    const privateKey2 = process.env.PRIVATE_KEY2;
    const privateKey3 = process.env.PRIVATE_KEY3;
    let myErc20Vote: MyERC20Vote;
    
    const chainId = network.config.chainId;
    const tokenAddr = networkConfig[chainId]["myERC20Vote"];
    const ERC20Votes_ABI = [
        "function getVotes(address account) public view returns (uint256)",
        "function delegate(address delegatee) public", 
    ];
    let deployer = new ethers.Wallet(privateKey1, provider);
    let account1 = new ethers.Wallet(privateKey2, provider);
    let account2 = new ethers.Wallet(privateKey3, provider);
    myErc20Vote = new ethers.Contract(tokenAddr, ERC20Votes_ABI, provider) as MyERC20Vote;

    const votePowerDeployerBefore = await myErc20Vote.getVotes(deployer.address);
    const votePowerAccount1Before = await myErc20Vote.getVotes(account1.address);
    const votePowerAccount2Before = await myErc20Vote.getVotes(account2.address);

    console.log(`Deployer voting power before is: ${votePowerDeployerBefore.toString()}`);
    console.log(`Account1 voting power before is: ${votePowerAccount1Before.toString()}`);
    console.log(`Account2 voting power before is: ${votePowerAccount2Before.toString()}`);

    const delegateTx1 = await myErc20Vote.connect(deployer).delegate(deployer.address);
    await delegateTx1.wait();
    const delegateTx2 = await myErc20Vote.connect(account1).delegate(account1.address);
    await delegateTx2.wait();
    const delegateTx3 = await myErc20Vote.connect(account2).delegate(account2.address);
    await delegateTx3.wait();

    const votePowerDeployerAfter = await myErc20Vote.getVotes(deployer.address);
    const votePowerAccount1After = await myErc20Vote.getVotes(account1.address);
    const votePowerAccount2After = await myErc20Vote.getVotes(account2.address);

    console.log(`Deployer voting power after is: ${votePowerDeployerAfter.toString()}`);
    console.log(`Account1 voting power after is: ${votePowerAccount1After.toString()}`);
    console.log(`Account2 voting power after is: ${votePowerAccount2After.toString()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  