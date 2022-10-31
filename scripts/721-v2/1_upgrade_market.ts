import { ethers } from "hardhat";
import { ABI_MARKET_V2 } from "../config/abi";
import { AddressConfig } from "../config/address";
import { proxy, proxy_admin } from "../contractFactory";
import { Manifest, getAdminAddress, getCode } from '@openzeppelin/upgrades-core';
import { wallets } from "../config/wallet";
const hre = require("hardhat");

async function main() {
  const MarketV2 = await ethers.getContractFactory('MarketV2');
  const logic = await MarketV2.deploy();
  await logic.deployed();
  console.log("MarketV2 deployed to:", logic.address);

  const { provider } = hre.network;
  const adminAddress = await getAdminAddress(provider, AddressConfig.market_proxy_v2);
  console.log(AddressConfig.market_proxy_v2, "'s adminAddress is ", adminAddress);

  // const _proxy = proxy(AddressConfig.market_proxy_v2);
  // await _proxy.upgradeTo(logic.address);

  let proxy_admin_contract = proxy_admin(wallets.admin_private_key);
  await proxy_admin_contract.upgrade(AddressConfig.market_proxy_v2, logic.address);
  console.log("upgrade success");
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});