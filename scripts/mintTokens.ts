import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'
import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";



async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL)
  const privateKey1 = process.env.PRIVATE_KEY;
  const privateKey2 = process.env.PRIVATE_KEY2;
  const privateKey3 = process.env.PRIVATE_KEY3;
  let myErc20Vote: MyERC20Vote;

  const chainId = network.config.chainId;
  const tokenAddr = networkConfig[chainId]["myERC20Vote"];

  const ERC20Votes_ABI = [
    "function mint(address to, uint256 amount) public",
    "function balanceOf(address account) public view returns (uint256)", 
  ];
  let deployer = new ethers.Wallet(privateKey1, provider);
  let account1 = new ethers.Wallet(privateKey2, provider);
  let account2 = new ethers.Wallet(privateKey3, provider);
  console.log(deployer.address);
  console.log(account1.address);
  console.log(account2.address);

  myErc20Vote = new ethers.Contract(tokenAddr, ERC20Votes_ABI, provider) as MyERC20Vote;
  console.log(myErc20Vote.address)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


