const Contract = require('web3-eth-contract');

const contract = require("../contracts/RentableNFTs.json");

(async () => {
  try {
    const contractAddress = "0xc79786F0f42e5AbCd1bF7Bb2E03270d2A2e73602";
    const nftContract = new Contract(contract.abi, contractAddress);
    // console.log("🚀 ~ file: index.js ~ line 9 ~ nftContract", nftContract.methods)

    const value = await nftContract.methods.setApprovalForAll("0x4b39db2830d8f47981Fbe622BDC72fa78231C050", true).call({ from: "0x18640156273AE8b099527c80CB0397f62BdBb573"})
    console.log("🚀 ~ file: index.js ~ line 12 ~ value", value)
    

  } catch (err) {
    console.log("Server index: ", err);
  }
})();
