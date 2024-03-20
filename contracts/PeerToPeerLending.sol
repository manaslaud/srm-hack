// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PeerToPeerLending {
    struct Loan {
        address borrower;
        uint amount;
        uint interestRate; // Interest rate in percentage
        uint dueDate; // Unix timestamp of when the loan needs to be repaid
        bool repaid;
    }

    address public owner;
    uint public constant INTEREST_RATE = 5; // Example interest rate of 5%
    uint public constant LOAN_DURATION = 30 days;
    uint public totalLentAmount;
    
    mapping(address => uint) public balances; // Tracks Ether deposited by lenders
    mapping(address => Loan) public loans; // Tracks active loans
    
    event Lent(address indexed lender, uint amount);
    event Borrowed(address indexed borrower, uint amount, uint interestRate, uint dueDate);
    event Repaid(address indexed borrower, uint amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }
    
    // Allow users to lend Ether to the contract
    function lend() external payable {
        require(msg.value > 0, "You need to send some Ether.");
        balances[msg.sender] += msg.value;
        totalLentAmount += msg.value;
        emit Lent(msg.sender, msg.value);
    }
    
    // Allow users to borrow Ether given they provide sufficient collateral
    function borrow() external payable {
        uint loanAmount = msg.value * 20; // Simplified collateral requirement: 5%
        require(balances[address(this)] >= loanAmount, "Insufficient funds in the contract.");
        require(loans[msg.sender].amount == 0, "Existing loan must be repaid first.");
        
        loans[msg.sender] = Loan({
            borrower: msg.sender,
            amount: loanAmount,
            interestRate: INTEREST_RATE,
            dueDate: block.timestamp + LOAN_DURATION,
            repaid: false
        });
        
        payable(msg.sender).transfer(loanAmount);
        emit Borrowed(msg.sender, loanAmount, INTEREST_RATE, block.timestamp + LOAN_DURATION);
    }
    
    // Function for borrowers to repay their loans along with interest
    function repayLoan() external payable {
        Loan storage loan = loans[msg.sender];
        require(block.timestamp <= loan.dueDate, "Loan repayment period has expired.");
        uint repaymentAmount = loan.amount + (loan.amount * loan.interestRate / 100);
        require(msg.value >= repaymentAmount, "Insufficient amount to repay the loan.");
        
        loan.repaid = true;
        payable(owner).transfer(repaymentAmount); // Transfer repayment to the contract owner for simplicity
        emit Repaid(msg.sender, repaymentAmount);
    }
    
    // Allow the owner to withdraw Ether from the contract
    function withdraw(uint _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance.");
        payable(owner).transfer(_amount);
    }
}