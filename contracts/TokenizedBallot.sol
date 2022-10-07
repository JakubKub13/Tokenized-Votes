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
}