const { network, ethers } = require("hardhat");
(async () => {
  try {
    const Library = await ethers.getContractFactory("DoubleSVGV2");
    const library = await Library.deploy();
    await library.deployed();

    const MarketV2 = await ethers.getContractFactory("DoNFT4907Model", {
      libraries: {
        DoubleSVGV2: library.address,
      },
    });

    console.log("Deploying contract...");
    // eslint-disable-next-line camelcase
    const contract_owner = await ethers.getSigner(network.config.from);
    const contract = await MarketV2.connect(contract_owner).deploy();
    console.log("Contract address:", contract.address);
    console.log("Contract owner:", contract_owner);
    console.log(
      "Contract creation transaction:",
      contract.deployTransaction.hash
    );
  } catch (err) {
    console.log("Error deploying contract: ", err);
  }
})();
