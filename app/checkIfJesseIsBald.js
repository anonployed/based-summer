const checkIfJesseIsBald = async (address) => {
  const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
  if (!endpoint) {
    console.error("NEXT_PUBLIC_RPC_ENDPOINT is not defined");
    return false;
  }

  console.log(`Checking balances for address: ${address}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "cdp_listBalances",
        "params": [
          {
            "address": address,
            "pageToken": "",
            "pageSize": 100
          }
        ]
      })
    });

    const data = await response.json();
    console.log('API response data:', data);

    if (!data.result || !data.result.balances) {
      console.warn('No balances found:', data);
      return false;
    }

    // Adjust according to the response structure from Coinbase API
    const isHolder = data.result.balances.some(balance => 
      balance.asset.type === 'erc721' && 
      balance.asset.groupId.toLowerCase() === '0xb27b1369808c817d61baca58833232f97add28ea'
    );
    console.log(`Is holder: ${isHolder}`);
    return isHolder;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return false;
  }
};

export default checkIfJesseIsBald;
