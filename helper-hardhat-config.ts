export interface networkConfigItem {
    name?: string
    myERC20Vote?: string 
    tokenizedBallot?: string
  }
export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        myERC20Vote: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },

    5: {
        name: "goerli",
        myERC20Vote: "0x9828c2Ad0A705F3E8D21FE31A1a5edBFDfc67e1f",
        tokenizedBallot: "0xde2e9c4d7adE0F9128718466380B71b4302293fc",
    },

    1: {
        name: "mainnet",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6