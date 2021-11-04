const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Tank", "DPS", "Healer"],       // Names
        ["https://lh3.googleusercontent.com/proxy/To_i9fZYv5LIRM5jPp-Edq49nZ4zDMa4T4FFsojdeT1z01Omdf92WlQ-pmmrCVpkdYTr_cbRamO15psbjJq-SiYCN2uSbg5nz8QYbmcWFSPd80uNSQriVhAvUljfH12pnDIzPo_IWuvKNituN6G5tZl-", // Images
            "https://w7.pngwing.com/pngs/1009/568/png-transparent-lineage-2-revolution-lineage-ii-blade-dancer-youtube-archer-game-video-game-weapon.png",
            "https://i.pinimg.com/originals/ec/7c/e8/ec7ce861937cc6d7241e410cb537682d.jpg"],
        [500, 300, 350],                    // HP values
        [150, 300, 100],                       // Attack damage values
        [75, 25, 50],                          // Defense values
        [10, 20, 15],                          // Critical chance values
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();