// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    
    mapping(address => uint256) balance;

    function store(address _address, uint256 amount) public virtual {
        if (amount < 0) {
            return;
        }
        balance[_address]+=amount;
    }

    function showMeBalance(address _address) view public returns (uint256){
        return balance[_address];
    }
}