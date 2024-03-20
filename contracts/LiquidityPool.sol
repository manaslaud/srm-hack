// SPDX-License-Identifier: MIT
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
    // Initial rate of MT tokens per ETH deposited
    uint256 private initialRate = 1000;
    // Interest rate per period (simple for demonstration)
    uint256 public interestRatePerPeriod = 5; // 5% interest rate
    uint256 public lastInterestUpdateTime = block.timestamp;
    // Interest accrual period in seconds (e.g., 86400 for 24 hours)
    uint256 public interestAccrualPeriod = 86400;

    event Deposited(address indexed user, uint256 ethAmount, uint256 mtAmount);
    event Withdrawn(address indexed user, uint256 ethAmount, uint256 mtAmount);

    constructor() {
        address a=0x45f0118A78A03CEE83d82E0C8C5Fa1579543EB67;
        mtToken = IMTToken(a);
    }

    // Allow users to deposit ETH and receive MT tokens
    function depositETH() external payable nonReentrant {
        require(msg.value > 0, "Cannot deposit 0 ETH");
        updateInterest();
        uint256 mtTokenAmount = msg.value * initialRate;
        mtToken.mint(msg.sender, mtTokenAmount);
        totalETHDeposited += msg.value;
        emit Deposited(msg.sender, msg.value, mtTokenAmount);
    }

    // Allow users to burn MT tokens and withdraw ETH
    function withdrawETH(uint256 mtTokenAmount) external nonReentrant {
        require(mtTokenAmount > 0, "Cannot withdraw 0 MT tokens");
        updateInterest();
        uint256 ethAmount = mtTokenAmount / initialRate;
        require(address(this).balance >= ethAmount, "Insufficient ETH in pool");
        mtToken.burn(msg.sender, mtTokenAmount);
        payable(msg.sender).transfer(ethAmount);
        emit Withdrawn(msg.sender, ethAmount, mtTokenAmount);
    }

    // Update interest for all token holders by increasing the initial rate
    function updateInterest() public {
        if (block.timestamp >= lastInterestUpdateTime + interestAccrualPeriod) {
            uint256 periodsElapsed = (block.timestamp - lastInterestUpdateTime) / interestAccrualPeriod;
            for (uint256 i = 0; i < periodsElapsed; i++) {
                initialRate = initialRate * (100 + interestRatePerPeriod) / 100;
            }
            lastInterestUpdateTime += periodsElapsed * interestAccrualPeriod;
        }
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
