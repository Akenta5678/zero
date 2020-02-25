// TODO: Refactor duplication with deploymentHelpers.js 

const PoolManager = artifacts.require("./PoolManager.sol")
const CDPManager = artifacts.require("./CDPManager.sol")
const PriceFeed = artifacts.require("./PriceFeed.sol")
const CLVToken = artifacts.require("./CLVToken.sol")
const NameRegistry = artifacts.require("./NameRegistry.sol")
const ActivePool = artifacts.require("./ActivePool.sol")
const DefaultPool = artifacts.require("./DefaultPool.sol")
const StabilityPool = artifacts.require("./StabilityPool.sol")
const SortedCDPs = artifacts.require("./SortedCDPs.sol")

const getDeployedContracts = async () => {
  // get deployed contract representations
  const priceFeed = await PriceFeed.deployed()
  const clvToken = await CLVToken.deployed()
  const poolManager = await PoolManager.deployed()
  const cdpManager = await CDPManager.deployed()
  const nameRegistry = await NameRegistry.deployed()
  const activePool = await ActivePool.deployed()
  const defaultPool = await DefaultPool.deployed()
  const stabilityPool = await StabilityPool.deployed()
  const sortedCDPs = await SortedCDPs.deployed()
  const functionCaller = await FunctionCaller.deployed()
 
// TODO:  Remove this duplication below with deploymentHelpers.js.  The above, can be a single function 
// getAllDeployedContracts()

  // get contract addresses
  const poolManagerAddress = poolManager.address
  const clvTokenAddress = clvToken.address
  const priceFeedAddress = priceFeed.address
  const cdpManagerAddress = cdpManager.address
  const nameRegistryAddress = nameRegistry.address
  const activePoolAddress = activePool.address
  const defaultPoolAddress = defaultPool.address
  const stabilityPoolAddress = stabilityPool.address
  const sortedCDPsAddress = sortedCDPs.address
  const functionCallerAddress = functionCaller.address

  return {
    cdpManager,
    priceFeed,
    clvToken,
    poolManager,
    cdpManager,
    nameRegistry,
    activePool,
    stabilityPool,
    defaultPool,
    sortedCDPs,
    functionCaller,
    poolManagerAddress,
    clvTokenAddress,
    priceFeedAddress,
    cdpManagerAddress,
    nameRegistryAddress,
    activePoolAddress,
    defaultPoolAddress,
    stabilityPoolAddress,
    sortedCDPsAddress, 
    functionCallerAddress

  }
}

module.exports = {
  getDeployedContracts: getDeployedContracts
}