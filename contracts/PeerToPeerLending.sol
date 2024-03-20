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

    uint public loanCounter=0;
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
/*         // Ideally, handle overpayment refund and mark loan as repaid in a real scenario
 */    }

    // View loan details
    // Corrected version to return details of all borrowed loans for a given borrower
function getAllBorrowedLoans(address borrower) public view returns (Loan[] memory) {
    uint count = 0;

    // First, count the relevant loans to size the array correctly
    for (uint i = 1; i <= loanCounter; i++) {
        if (loans[i].borrower == borrower) {
            count++;
        }
    }

    Loan[] memory borrowedLoans = new Loan[](count);
    uint k = 0; // Corrected indexing to start at 0

    // Populate the array
    for (uint i = 1; i <= loanCounter; i++) {
        if (loans[i].borrower == borrower) {
            borrowedLoans[k] = loans[i];
            k++;
        }
    }

    return borrowedLoans; // Return the populated array of loans
}
function getAllLendingLoans(address lender) public view returns (Loan[] memory) {
    uint count = 0;

    // First, count the relevant loans to size the array correctly
    for (uint i = 1; i <= loanCounter; i++) {
        if (loans[i].lender == lender) {
            count++;
        }
    }

    Loan[] memory lenderLoans = new Loan[](count);
    uint k = 0; // Corrected indexing to start at 0

    // Populate the array
    for (uint i = 1; i <= loanCounter; i++) {
        if (loans[i].lender == lender) {
            lenderLoans[k] = loans[i];
            k++;
        }
    }

    return lenderLoans; // Return the populated array of loans
}

}
