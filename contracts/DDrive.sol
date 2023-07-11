// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DDrive{
     
    // data structure for data access 
    struct Access{
        address user;
        bool access;
    }

    // particular user images
    mapping (address => string[]) private myItems;

    // stores all users-to-user ownerships mapping
    mapping (address => mapping (address=>bool)) private  Ownerships;

    // access given accounts
    mapping (address => Access[]) private accessList;

    // to store previous state
    mapping (address => mapping (address=>bool)) private cachedUser;

    // to add item in drive
    function add(address _user,string memory item) public {
        myItems[_user].push(item);
    }

    // to give access to other users
    function giveAccess(address _user) public {
        if(cachedUser[msg.sender][_user]){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==_user){
                    accessList[msg.sender][i].access = true;
                    break;
                }
            }
        }else{
            cachedUser[msg.sender][_user] = true;
            accessList[msg.sender].push(Access(_user,true));
        }
        Ownerships[msg.sender][_user] = true;
    }    

    // to remove access of any users
    function removeAccess(address _user) public {
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==_user){
                accessList[msg.sender][i].access = false;
                break;
            }
        }
        Ownerships[msg.sender][_user] = false;
    }    

    // dispplay user items
    function displayItems(address _user) public view returns (string[] memory){
        require(_user==msg.sender || Ownerships[_user][msg.sender], "Access not given to you from owner!");
        return myItems[_user];
    }

    // give accessList 
    function getAccessList() public view returns (Access[] memory){
        return accessList[msg.sender];
    }
}