const TruffleContract = require("@truffle/contract");
const IERC20_1 = artifacts.require("IERC20");
const ERC20_ABI = require("./IERC20.abi.json");
const IERC20_2 = TruffleContract({ abi: ERC20_ABI });

module.exports = async function (cb) {
    try {
        // This will trigger the bug, by using high default gasPrice
        // `GAS_PRICE=1e12 npx truffle --network matic exec scripts/test.js`
        // but without GAS_PRICE setting, it works
        // `npx truffle --network matic exec scripts/test.js`
        const usdcx = await IERC20_1.at("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

        // But this will not trigger the bug, perhaps because it does not use the truffle-config settings.
        // const usdcx = await IERC20_2.at("0xCAa7349CEA390F89641fe306D93591f87595dc1F");
        // IERC20_2.setProvider(web3.currentProvider);

        console.log("usdcx name: ", await usdcx.name.call());
        cb();
    } catch (e) {
        cb(e);
    }
}
