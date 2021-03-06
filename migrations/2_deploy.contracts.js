const IcoToken = artifacts.require('IcoToken');
const IcoContract = artifacts.require('IcoContract');
const GiftCoupon = artifacts.require('GiftCoupon');

module.exports = function(deployer){
	deployer.deploy(
			IcoToken,
			'OLA Token',
			'OLAT',
			'18',
			'1.0'
		).then(() => {

			return deployer.deploy(
					IcoContract,
					'0xd2e8dbb45a2230ab9d874602d5a742c273bff611', //put Your Wallet Address here from which all contracts will be deployed
					IcoToken.address,
					'100000000000000000000000000', // 100000000 Token
				    '1000', // 1 ETH = 1000 Token
				    '1514764800', // 01/01/2018
				    '1546214400', // 31/12/2018
				    '100000000000000000' // 0.1 ETH
				)
		}).then(() => 
		{	
			return IcoToken.deployed();	
		}).then(async function(instance){

			await instance.setIcoContract(IcoContract.address);
			return deployer.deploy(
					GiftCoupon,
					IcoToken.address					
				);	
		});
};