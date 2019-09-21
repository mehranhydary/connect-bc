pragma solidity ^0.4.24;

import "./Storage.sol";

contract BytesStorageLogic is Storage {
    event BytesUpdated(address indexed factProvider, bytes32 indexed key);
    event BytesDeleted(address indexed factProvider, bytes32 indexed key);

    /// @param _key The key for the record
    /// @param _value The value for the record
    function setBytes(bytes32 _key, bytes _value) external {
        _setBytes(_key, _value);
    }

    /// @param _key The key for the record
    function deleteBytes(bytes32 _key) external {
        _deleteBytes(_key);
    }

    /// @param _factProvider The fact provider
    /// @param _key The key for the record
    function getBytes(address _factProvider, bytes32 _key) external view returns (bool success, bytes memory value) {
        return _getBytes(_factProvider, _key);
    }

    function _setBytes(bytes32 _key, bytes memory _value) allowedFactProvider internal {
        bytesStorage[msg.sender][_key] = BytesValue({
            initialized : true,
            value : _value
            });
        emit BytesUpdated(msg.sender, _key);
    }

    function _deleteBytes(bytes32 _key) allowedFactProvider internal {
        delete bytesStorage[msg.sender][_key];
        emit BytesDeleted(msg.sender, _key);
    }

    function _getBytes(address _factProvider, bytes32 _key) internal view returns (bool success, bytes memory value) {
        BytesValue storage initValue = bytesStorage[_factProvider][_key];
        return (initValue.initialized, initValue.value);
    }
}