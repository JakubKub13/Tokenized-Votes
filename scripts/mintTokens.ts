import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'
import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20Vote } from "../typechain-types";
dotenv.config();
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const AMOUNT_TO_MINT = ethers.utils.parseUnits("1", "ether")

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
  

  myErc20Vote = new ethers.Contract(tokenAddr, ERC20Votes_ABI, provider) as MyERC20Vote;
  console.log(myErc20Vote.address)

  const amountOfTokBeforeMintDeployer = await myErc20Vote.balanceOf(deployer.address);
  const amountOfTokBeforeMintAccount1 = await myErc20Vote.balanceOf(account1.address);
  const amountOfTokBeforeMintAccount2 = await myErc20Vote.balanceOf(account2.address);
  
  console.log(amountOfTokBeforeMintDeployer.toString());
  console.log(amountOfTokBeforeMintAccount1.toString());
  console.log(amountOfTokBeforeMintAccount2.toString());


  const mintTx1 = await myErc20Vote.connect(deployer).mint(deployer.address, AMOUNT_TO_MINT);
  await mintTx1.wait();
  const mintTx2 = await myErc20Vote.connect(deployer).mint(account1.address, AMOUNT_TO_MINT);
  await mintTx2.wait();
  const mintTx3 = await myErc20Vote.connect(deployer).mint(account2.address, AMOUNT_TO_MINT);
  await mintTx1.wait();

  const amountOfTokAfterMintDeployer = await myErc20Vote.balanceOf(deployer.address);
  const amountOfTokAfterMintAccount1 = await myErc20Vote.balanceOf(account1.address);
  const amountOfTokAfterMintAccount2 = await myErc20Vote.balanceOf(account2.address);

  console.log(amountOfTokAfterMintDeployer.toString());
  console.log(amountOfTokAfterMintAccount1.toString());
  console.log(amountOfTokAfterMintAccount2.toString());
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


