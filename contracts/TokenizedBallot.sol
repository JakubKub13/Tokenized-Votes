// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ITokenizedVotes {

}

contract TokenizedBallot {
    uint256 public referenceBlock;
    ITokenizedVotes public tokenContract;


    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames, address _voteTokenContract, uint256 _referenceBlock) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({ name: proposalNames[i], voteCount: 0 }));
        }
        tokenContract = ITokenizedVotes(_voteTokenContract);
        referenceBlock = _referenceBlock;
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}