// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  [signer1, signer2] = await ethers.getSigners()

  const Staking = await ethers.getContractFactory('Staking', signer1)

  staking = await Staking.deploy({
    value:ethers.utils.parseEther('20')
  });

  console.log("Staking Contract deployed to: ", staking.address, "by", signer1.address)

  const provider = waffle.provider;
  let data;
  let transaction;
  let receipt;
  let block;
  let newUnlockDate;

  data = { value: ethers.utils.parseEther('0.5')}
  transaction = await staking.connect(signer2).stakeEther(30, data)
  data = { value: ethers.utils.parseEther('1.5')}
  transaction = await staking.connect(signer2).stakeEther(90, data)
  data = { value: ethers.utils.parseEther('2.5')}
  transaction = await staking.connect(signer2).stakeEther(180, data)
  
  
  data = { value: ethers.utils.parseEther('3.5')}
  transaction = await staking.connect(signer2).stakeEther(180, data)
  receipt = await transaction.wait()
  block = await provider.getBlock(receipt.blockNumber)
  newUnlockDate = block.timestamp - (60 * 60 * 24 * 100)
  await staking.connect(signer1).changeUnlockDate(3, newUnlockDate)


  data = { value: ethers.utils.parseEther('4.5')}
  transaction = await staking.connect(signer2).stakeEther(180, data)
  receipt = await transaction.wait()
  block = await provider.getBlock(receipt.blockNumber)
  newUnlockDate = block.timestamp - (60 * 60 * 24 * 100)
  await staking.connect(signer1).changeUnlockDate(4, newUnlockDate)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
