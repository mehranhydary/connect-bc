pragma solidity ^0.4.24;

import "./Storage.sol";

/**
 * @title TxDataStorage
 * @dev This contract saves only the block number for the input data. The input data is not stored into
 * Ethereum storage, but it can be decoded from the transaction input data later.
 */
contract TxDataStorageLogic is Storage {
    event TxDataUpdated(address indexed factProvider, bytes32 indexed key);
    event TxDataDeleted(address indexed factProvider, bytes32 indexed key);

    /// @param _key The key for the record
    /// @param _data The data for the record. Ignore "unused function parameter" warning, it's not commented out so that
    ///              it would remain in the ABI file.
    function setTxDataBlockNumber(bytes32 _key, bytes _data) allowedFactProvider external {
        _data;
        txBytesStorage[msg.sender][_key] = BlockNumberValue({
            initialized : true,
            blockNumber : block.number
            });
        emit TxDataUpdated(msg.sender, _key);
    }

    /// @param _key The key for the record
    function deleteTxDataBlockNumber(bytes32 _key) allowedFactProvider external {
        delete txBytesStorage[msg.sender][_key];
        emit TxDataDeleted(msg.sender, _key);
    }

    /// @param _factProvider The fact provider
    /// @param _key The key for the record
    function getTxDataBlockNumber(address _factProvider, bytes32 _key) external view returns (bool success, uint blockNumber) {
        return _getTxDataBlockNumber(_factProvider, _key);
    }

    function _getTxDataBlockNumber(address _factProvider, bytes32 _key) private view returns (bool success, uint blockNumber) {
        BlockNumberValue storage initValue = txBytesStorage[_factProvider][_key];
        return (initValue.initialized, initValue.blockNumber);
    }
}