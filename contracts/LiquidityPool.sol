// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ReentrancyGuard.sol";
//deployed at 0xB12A4725Bb46657A5B92b0e533b194e2D65439a5

interface IMTToken {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
    function totalSupply() external view returns (uint256);
}

contract AMMLiquidityPool is ReentrancyGuard {
    IMTToken public mtToken;
    uint256 public totalETHDeposited;

    // Set this to your deployed MT token contract address
    constructor(address _mtTokenAddress) {
        mtToken = IMTToken(_mtTokenAddress);
    }

    // Deposit ETH and mint MT tokens based on the AMM ratio
    function provideLiquidity() external payable nonReentrant {
        require(msg.value > 0, "Need to deposit a positive amount of ETH");

        uint256 mtTokenAmount;
        if(totalETHDeposited == 0) {
            // Initial liquidity provision scenario
            mtTokenAmount = msg.value; // 1:1 ratio for simplicity in initial provision
        } else {
            // Calculate MT tokens to mint based on the constant product formula
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 mtReserve = mtToken.totalSupply();
            mtTokenAmount = msg.value * mtReserve / ethReserve;
        }

        mtToken.mint(msg.sender, mtTokenAmount);
        totalETHDeposited += msg.value;
    }

    // Example withdraw function, simplified and requires further implementation details
    function removeLiquidity(uint256 mtTokenAmount) external nonReentrant {
        require(mtTokenAmount > 0, "Need to withdraw a positive amount of MT tokens");

        uint256 ethReserve = address(this).balance;
        uint256 mtReserve = mtToken.totalSupply();
        uint256 ethAmount = mtTokenAmount * ethReserve / mtReserve;

        mtToken.burn(msg.sender, mtTokenAmount);
        payable(msg.sender).transfer(ethAmount);
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
