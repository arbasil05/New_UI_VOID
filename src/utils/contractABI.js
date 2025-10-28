export const CONTRACT_ABI = [


    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_gstin",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addExpense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_gstin",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addIncome",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "gstin",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "ExpenseAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "gstin",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "IncomeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "gstin",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "TaxesCalculated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CORPORATE_TAX_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllGSTINs",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_gstin",
                "type": "string"
            }
        ],
        "name": "getFinancialSummary",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalIncome",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalExpense",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "netProfit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gst",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tds",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "corporateTax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "professionalTax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tcs",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalAnnualTaxes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalAllTaxes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getGSTINCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GST_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_gstin",
                "type": "string"
            }
        ],
        "name": "gstinExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "gstinList",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PROFESSIONAL_TAX_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "records",
        "outputs": [
            {
                "internalType": "string",
                "name": "gstin",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalIncome",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalExpense",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gstCollected",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tdsDeducted",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "corporateTax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "professionalTax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tcsCollected",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TCS_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TDS_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }


];