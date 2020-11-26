// SPDX-License-Identifier: MIT

pragma solidity 0.6.11;

import "../Dependencies/SafeMath.sol";
import "../Interfaces/IGrowthToken.sol";

contract CustomDurationLockupContract {
    using SafeMath for uint;

    // --- Data ---
    address public deployer;
    address public beneficiary;

    IGrowthToken public growthToken;

    uint public initialEntitlement;

    uint public lockupStartTimeInSeconds;
    uint public lockupDurationInSeconds;

    // TODO: use an enum for {inactive, active, ended} ? Make a lockup contract non-reusable after
    // full withdrawal.
    bool public active;

    // --- Events ---

    event CDLCLocked(uint lockupStartTime);
    event CDLCUnlockedAndEmptied(uint unlockTime);

    // --- Functions ---

    constructor 
    (
    address _growthTokenAddress, 
    address _beneficiary, 
    uint _initialEntitlement,
    uint _lockupDurationInSeconds
    )
    public 
    {
        deployer = msg.sender;

        growthToken = IGrowthToken(_growthTokenAddress);

        beneficiary =  _beneficiary;
        initialEntitlement = _initialEntitlement;
        lockupDurationInSeconds = _lockupDurationInSeconds;
    }

    function lockContract() public returns (bool) {
        _requireCallerIsLockupDeployer();
        _requireContractIsNotActive();
        _requireLQTYBalanceAtLeastEqualsEntitlement();

        lockupStartTimeInSeconds = block.timestamp;
        active = true; 
        emit CDLCLocked(lockupStartTimeInSeconds);
        return true;
    }

    function withdrawLQTY() public {
        _requireCallerIsBeneficiary();
        _requireContractIsActive();
        _requireLockupDurationHasPassed();
        
        uint LQTYBalance = growthToken.balanceOf(address(this));
        growthToken.transfer(msg.sender, LQTYBalance);
        
        active = false;
        emit CDLCUnlockedAndEmptied(block.timestamp);
    }

    // --- 'require' functions ---

    function _requireCallerIsLockupDeployer() internal view {
        require(msg.sender == deployer, "OYLC: caller is not OYLC deployer");
    }

    function _requireCallerIsBeneficiary() internal view {
        require(msg.sender == beneficiary, "OYLC: caller is not the beneficiary");
    }

    function _requireContractIsActive() internal view {
        require(active == true, "CDLC: Contract must be inactive");
    }

    function _requireContractIsNotActive() internal view {
        require(active == false, "CDLC: Contract must not be active");
    }

    function _requireLockupDurationHasPassed() internal view {
        require(block.timestamp.sub(lockupStartTimeInSeconds) >= lockupDurationInSeconds, "CDLC: The lockup duration must have passed");
    }

    function _requireLQTYBalanceAtLeastEqualsEntitlement() internal view {
        uint LQTYBalance = growthToken.balanceOf(address(this));
        require(LQTYBalance >= initialEntitlement, "CDLC: LQTY balance of this CDLC must cover the initial entitlement");
    }
}