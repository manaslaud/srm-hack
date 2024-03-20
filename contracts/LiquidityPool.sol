// SPDX-License-Identifier: MIT
//0xD2575a51B5E8d905E17b00eDeC2e40c977216C44
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./ReentrancyGuard.sol";

interface IMTToken {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
    function totalSupply() external view returns (uint256);
}

contract LiquidityPoolWithInterest is ReentrancyGuard {
    IMTToken public mtToken;
    uint256 public totalETHDeposited;
    uint256 private initialRate = 1000;
    uint256 public interestRatePerPeriod = 5;
    uint256 public lastInterestUpdateTime = block.timestamp;
    uint256 public interestAccrualPeriod = 86400;
    mapping(address => uint256) public userDeposits; // Track each user's deposited ETH

    event Deposited(address indexed user, uint256 ethAmount, uint256 mtAmount);
    event Withdrawn(address indexed user, uint256 ethAmount, uint256 mtAmount);

    constructor() {
        mtToken = IMTToken(0x9F25782aA2f077b0A0485ABbf42Be36733140FAB);
    }

    function depositETH() external payable nonReentrant {
        require(msg.value > 0, "Cannot deposit 0 ETH");
        uint256 mtTokenAmount = msg.value * initialRate;
        mtToken.mint(msg.sender, mtTokenAmount);
        totalETHDeposited += msg.value;
        userDeposits[msg.sender] += msg.value; // Update on deposit
        emit Deposited(msg.sender, msg.value, mtTokenAmount);
    }

    function withdrawETH(uint256 mtTokenAmount) external nonReentrant {
        require(mtTokenAmount > 0, "Cannot withdraw 0 MT tokens");
        updateInterest();
        uint256 ethAmount = mtTokenAmount / initialRate;
        require(userDeposits[msg.sender] >= ethAmount, "Withdrawal exceeds deposit");
        mtToken.burn(msg.sender, mtTokenAmount);
        payable(msg.sender).transfer(ethAmount);
        userDeposits[msg.sender] -= ethAmount; // Update on withdrawal
        emit Withdrawn(msg.sender, ethAmount, mtTokenAmount);
    }

    function updateInterest() public {
        if (block.timestamp >= lastInterestUpdateTime + interestAccrualPeriod) {
            uint256 periodsElapsed = (block.timestamp - lastInterestUpdateTime) / interestAccrualPeriod;
            for (uint256 i = 0; i < periodsElapsed; i++) {
                initialRate = initialRate * (100 + interestRatePerPeriod) / 100;
            }
            lastInterestUpdateTime += periodsElapsed * interestAccrualPeriod;
        }
    }

    receive() external payable {}
}
