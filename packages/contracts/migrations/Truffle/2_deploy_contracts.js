// Truffle migration script

const SortedCDPs = artifacts.require("./SortedCDPs.sol")
const PoolManager = artifacts.require("./PoolManager.sol")
const ActivePool = artifacts.require("./ActivePool.sol")
const DefaultPool = artifacts.require("./DefaultPool.sol")
const StabilityPool = artifacts.require("./StabilityPool.sol")
const CDPManager = artifacts.require("./CDPManager.sol")
const PriceFeed = artifacts.require("./PriceFeed.sol")
const CLVToken = artifacts.require("./CLVToken.sol")
const NameRegistry = artifacts.require("./NameRegistry.sol")
const DeciMath = artifacts.require("./DeciMath.sol")
const FunctionCaller = artifacts.require("./FunctionCaller.sol")

const deploymentHelpers = require("../../utils/deploymentHelpers.js")

const getAddresses = deploymentHelpers.getAddresses
const setNameRegistry = deploymentHelpers.setNameRegistry
const connectContracts = deploymentHelpers.connectContracts
const getAddressesFromNameRegistry = deploymentHelpers.getAddressesFromNameRegistry

module.exports = function(deployer) {
    // Deploy contract bytecode to blockchain
    deployer.deploy(SortedCDPs)
    deployer.deploy(DeciMath)
    deployer.link(DeciMath, CDPManager)
    deployer.link(DeciMath, PoolManager)
    deployer.deploy(NameRegistry)
    deployer.deploy(PriceFeed)
    deployer.deploy(CLVToken)
    deployer.deploy(PoolManager)
    deployer.deploy(ActivePool)
    deployer.deploy(DefaultPool)
    deployer.deploy(StabilityPool)
    deployer.deploy(CDPManager)
    deployer.deploy(DeciMath)
    deployer.deploy(FunctionCaller)

  deployer.then(async () => {
   // Grab contract representations
    const priceFeed = await PriceFeed.deployed()
    const clvToken = await CLVToken.deployed()
    const poolManager = await PoolManager.deployed()
    const sortedCDPs = await SortedCDPs.deployed()
    const cdpManager = await CDPManager.deployed()
    const nameRegistry = await NameRegistry.deployed()
    const activePool = await ActivePool.deployed()
    const stabilityPool = await StabilityPool.deployed()
    const defaultPool = await DefaultPool.deployed()
    const functionCaller = await FunctionCaller.deployed()

    const contracts = { priceFeed, 
                        clvToken, 
                        poolManager,
                        sortedCDPs, 
                        cdpManager, 
                        nameRegistry, 
                        activePool, 
                        stabilityPool, 
                        defaultPool,
                        functionCaller }
                        
    // Grab contract addresses
    const addresses = getAddresses(contracts)

    // Register contracts in the nameRegistry
    await setNameRegistry(addresses, nameRegistry);

    // Get addresses from NameRegistry 
    const registeredAddresses = await getAddressesFromNameRegistry(nameRegistry)
    console.log('deploy_contracts.js - Contract addresses stored in NameRegistry: \n')
    console.log(registeredAddresses)
    console.log('\n')
    
    // Connect contracts to each other via the NameRegistry records
    await connectContracts(contracts, registeredAddresses)
  })
}