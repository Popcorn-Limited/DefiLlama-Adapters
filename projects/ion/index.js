const methodologies = require('../helper/methodologies');
const { sumTokensExport } = require('../helper/unwrapLPs.js');

const pools = [
    "0x0000000000eaEbd95dAfcA37A39fd09745739b78",
    "0x0000000000E33e35EE6052fae87bfcFac61b1da9",
    "0x00000000007C8105548f9d0eE081987378a6bE93",
];

const wstETH = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0";

async function borrowed(api) {
    for (let pool of pools) {
        const borrowed = await api.call({
            target: pool,
            abi: 'uint:debt',
        });
        api.add(wstETH, borrowed / 1e27);
    }
}

module.exports = {
    methodology: methodologies.lendingMarket,
    ethereum: {
        tvl: sumTokensExport({
            owners: pools,
            tokens: [wstETH],
        }),
        borrowed,
    },
};