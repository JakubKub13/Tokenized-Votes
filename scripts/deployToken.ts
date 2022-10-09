import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
import { developmentChains } from "../helper-hardhat-config";
import { MyERC20Vote } from "../typechain-types";
import verify from "../verify";



async function main() {
    let myErc20Vote: MyERC20Vote;

    const [deployer] = await ethers.getSigners();
    const myErc20VoteFactory = await ethers.getContractFactory("MyERC20Vote");
    myErc20Vote = await myErc20VoteFactory.deploy() as MyERC20Vote;
    await myErc20Vote.deployed();
    console.log(`My token contract was deployed at the address of ${myErc20Vote.address}`);
    const args: any[] = [];

     // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying......")
        await verify(myErc20Vote.address, args)
    }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


