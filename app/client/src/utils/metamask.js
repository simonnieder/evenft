export const requestAccounts = async (callback) => {
  if(!window.ethereum || window.ethereum.isM) return;
  try{
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    callback(accounts[0]);
  }catch(err){
    callback(undefined);
  }
};