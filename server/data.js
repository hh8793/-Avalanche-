// Mock data store for Avalanche Cross-Chain Bridge

let bridgeRequests = [
  { id: "BR-001", sourceChain: "Avalanche", targetChain: "Ethereum", asset: "AVAX", amount: "1,250.00", sender: "0x7a3F...e91B", status: "completed", txHash: "0xabc123...def456", timestamp: "2026-08-28 14:32:11" },
  { id: "BR-002", sourceChain: "Ethereum", targetChain: "Avalanche", asset: "USDC", amount: "45,000.00", sender: "0x9c2D...f84A", status: "completed", txHash: "0xbcd234...ef567", timestamp: "2026-08-28 15:01:44" },
  { id: "BR-003", sourceChain: "Avalanche", targetChain: "BSC", asset: "AVAX", amount: "820.00", sender: "0x3e8B...a72C", status: "processing", txHash: null, timestamp: "2026-08-29 09:15:22" },
  { id: "BR-004", sourceChain: "Arbitrum", targetChain: "Avalanche", asset: "ETH", amount: "12.50", sender: "0x5f1C...d93E", status: "completed", txHash: "0xcde345...fa678", timestamp: "2026-08-29 10:42:08" },
  { id: "BR-005", sourceChain: "Avalanche", targetChain: "Optimism", asset: "LINK", amount: "3,200.00", sender: "0x2b9A...e61F", status: "pending", txHash: null, timestamp: "2026-08-29 11:30:55" },
  { id: "BR-006", sourceChain: "BSC", targetChain: "Avalanche", asset: "USDC", amount: "18,500.00", sender: "0x8d4E...b27D", status: "completed", txHash: "0xdef456...ab789", timestamp: "2026-08-29 13:22:41" },
  { id: "BR-007", sourceChain: "Avalanche", targetChain: "Ethereum", asset: "WBTC", amount: "0.85", sender: "0x6a3F...c48B", status: "failed", txHash: null, timestamp: "2026-08-29 14:05:33", error: "Insufficient liquidity on target chain" },
  { id: "BR-008", sourceChain: "Ethereum", targetChain: "Avalanche", asset: "ETH", amount: "8.20", sender: "0x4c7D...f19E", status: "completed", txHash: "0xef5678...bc890", timestamp: "2026-08-30 08:18:12" },
  { id: "BR-009", sourceChain: "Avalanche", targetChain: "Arbitrum", asset: "USDC", amount: "22,000.00", sender: "0x1b6E...a53C", status: "processing", txHash: null, timestamp: "2026-08-30 09:45:27" },
  { id: "BR-010", sourceChain: "Optimism", targetChain: "Avalanche", asset: "ETH", amount: "5.40", sender: "0x9f2A...d87B", status: "completed", txHash: "0xfab890...cd012", timestamp: "2026-08-30 10:33:09" },
  { id: "BR-011", sourceChain: "Avalanche", targetChain: "BSC", asset: "USDC", amount: "12,300.00", sender: "0x3d5C...e94F", status: "pending", txHash: null, timestamp: "2026-08-30 11:20:48" },
  { id: "BR-012", sourceChain: "Avalanche", targetChain: "Ethereum", asset: "AVAX", amount: "2,800.00", sender: "0x7e9B...f16A", status: "completed", txHash: "0xabc012...def345", timestamp: "2026-08-30 12:15:33" }
];

let validators = [
  { id: "VAL-001", address: "0x7a3F8c2D9e1B4a56...e91B", stakeAmount: "12,000", status: "active", uptime: "99.98", blocksSigned: 152840, joinedAt: "2026-07-01" },
  { id: "VAL-002", address: "0x9c2D4f3E8a1B7c65...f84A", stakeAmount: "10,500", status: "active", uptime: "99.95", blocksSigned: 148920, joinedAt: "2026-07-01" },
  { id: "VAL-003", address: "0x3e8B6a2F1c9D4e78...a72C", stakeAmount: "8,000", status: "active", uptime: "99.91", blocksSigned: 142350, joinedAt: "2026-07-01" },
  { id: "VAL-004", address: "0x5f1C3d7A9b2E8f64...d93E", stakeAmount: "15,000", status: "active", uptime: "100.0", blocksSigned: 161200, joinedAt: "2026-07-01" },
  { id: "VAL-005", address: "0x2b9A7e5C3f1D8a62...e61F", stakeAmount: "6,500", status: "active", uptime: "99.87", blocksSigned: 139870, joinedAt: "2026-07-02" },
  { id: "VAL-006", address: "0x8d4E1f9C6a3B5d27...b27D", stakeAmount: "11,200", status: "active", uptime: "99.93", blocksSigned: 147560, joinedAt: "2026-07-02" },
  { id: "VAL-007", address: "0x6a3F2c8D9e4B1a75...c48B", stakeAmount: "9,800", status: "active", uptime: "99.89", blocksSigned: 140230, joinedAt: "2026-07-03" },
  { id: "VAL-008", address: "0x4c7D8e3F5a1B9c62...f19E", stakeAmount: "13,500", status: "active", uptime: "99.96", blocksSigned: 150180, joinedAt: "2026-07-03" },
  { id: "VAL-009", address: "0x1b6E9a3F2c7D8e54...a53C", stakeAmount: "7,200", status: "inactive", uptime: "97.82", blocksSigned: 118450, joinedAt: "2026-07-04" },
  { id: "VAL-010", address: "0x9f2A5c8D3e6B1f47...d87B", stakeAmount: "10,800", status: "active", uptime: "99.92", blocksSigned: 146790, joinedAt: "2026-07-04" },
  { id: "VAL-011", address: "0x3d5C2f8A9e4B1c76...e94F", stakeAmount: "9,000", status: "active", uptime: "99.88", blocksSigned: 141520, joinedAt: "2026-07-05" },
  { id: "VAL-012", address: "0x7e9B3d6F1c8A2e59...f16A", stakeAmount: "12,500", status: "active", uptime: "99.97", blocksSigned: 151910, joinedAt: "2026-07-05" }
];

let fundFlows = [
  { id: "FND-001", category: "core-dev", categoryLabel: "核心开发", description: "智能合约开发 - Phase 1 核心桥合约实现", amount: 750, amountUnit: "AVAX", date: "2026-07-15", type: "expense" },
  { id: "FND-002", category: "core-dev", categoryLabel: "核心开发", description: "中继服务与前端开发 - Phase 1", amount: 500, amountUnit: "AVAX", date: "2026-07-28", type: "expense" },
  { id: "FND-003", category: "security-audit", categoryLabel: "安全审计", description: "CertiK 合约安全审计", amount: 600, amountUnit: "AVAX", date: "2026-08-10", type: "expense" },
  { id: "FND-004", category: "security-audit", categoryLabel: "安全审计", description: "Halborn 独立安全审计", amount: 400, amountUnit: "AVAX", date: "2026-08-18", type: "expense" },
  { id: "FND-005", category: "infrastructure", categoryLabel: "基础设施", description: "验证者节点服务器部署 (4台)", amount: 300, amountUnit: "AVAX", date: "2026-07-20", type: "expense" },
  { id: "FND-006", category: "infrastructure", categoryLabel: "基础设施", description: "RPC 节点 + The Graph 索引服务", amount: 250, amountUnit: "AVAX", date: "2026-08-05", type: "expense" },
  { id: "FND-007", category: "dev-ecosystem", categoryLabel: "开发者生态", description: "SDK 开发与文档编写", amount: 300, amountUnit: "AVAX", date: "2026-08-22", type: "expense" },
  { id: "FND-008", category: "operations", categoryLabel: "运营与市场", description: "社区运营与内容创作", amount: 150, amountUnit: "AVAX", date: "2026-08-25", type: "expense" },
  { id: "FND-009", category: "grant", categoryLabel: "Team1 资金", description: "Team1 Mini Grants 资金到账", amount: 6000, amountUnit: "AVAX", date: "2026-07-01", type: "income" }
];

module.exports = { bridgeRequests, validators, fundFlows };
