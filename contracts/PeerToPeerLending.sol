// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//DEPLOYED AT 0x9dd5bB3A55A7b3b67599495A969E345b53680D4F
contract PeerToPeerLending {
    struct Loan {
        address borrower;
        address lender;
        uint amount;
        uint interestRate; // as a percentage
        uint dueDate;
        bool funded;
    }

    uint public loanCounter;
    mapping(uint => Loan) public loans;

    event LoanRequested(uint loanId, address borrower, uint amount, uint interestRate, uint dueDate);
    event LoanFunded(uint loanId, address lender);
    event RepaymentMade(uint loanId, uint amount);

    // Borrower requests a loan
    function requestLoan(uint _amount, uint _interestRate, uint _loanDuration) public {
        loanCounter++;
        loans[loanCounter] = Loan(msg.sender, address(0), _amount, _interestRate, block.timestamp + _loanDuration, false);
        emit LoanRequested(loanCounter, msg.sender, _amount, _interestRate, block.timestamp + _loanDuration);
    }

    // Lender funds the loan
    function fundLoan(uint _loanId) public payable {
        require(loans[_loanId].amount == msg.value, "Incorrect amount transferred");
        require(loans[_loanId].funded == false, "Loan already funded");
        loans[_loanId].lender = msg.sender;
        loans[_loanId].funded = true;
        payable(loans[_loanId].borrower).transfer(msg.value);
        emit LoanFunded(_loanId, msg.sender);
    }

    // Borrower repays the loan
    function repayLoan(uint _loanId) public payable {
        require(msg.sender == loans[_loanId].borrower, "Only the borrower can repay");
        require(block.timestamp <= loans[_loanId].dueDate, "Loan due date has passed");
        uint repaymentAmount = loans[_loanId].amount + (loans[_loanId].amount * loans[_loanId].interestRate / 100);
        require(msg.value >= repaymentAmount, "Insufficient amount to repay the loan");
        payable(loans[_loanId].lender).transfer(repaymentAmount);
        emit RepaymentMade(_loanId, repaymentAmount);
        // Ideally, handle overpayment refund and mark loan as repaid in a real scenario
    }

    // View loan details
    function getLoanDetails(uint _loanId) public view returns (Loan memory) {
        return loans[_loanId];
    }
}
