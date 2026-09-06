# Avalanche Cross-Chain Bridge - Full Stack Web App

Avalanche 跨链桥全栈 Web 应用，基于 Team1 Mini Grants 计划，包含项目方案展示与管理后台。

## 技术栈

- **前端**: Next.js 14 (React 18)
- **后端**: Express.js
- **样式**: 自定义 CSS（Avalanche 主题）

## 项目结构

```
avalanche-bridge-app/
├── package.json              # 根目录 (concurrently 同时启动前后端)
├── server/                   # Express 后端 API
│   ├── package.json
│   ├── index.js              # API 服务入口
│   └── data.js              # 模拟数据 (桥接请求/验证者/资金流水)
├── client/                   # Next.js 前端
│   ├── package.json
│   ├── next.config.js
│   ├── pages/
│   │   ├── _app.js          # 全局布局 (导航栏)
│   │   ├── index.js         # 方案展示页 (7 个模块)
│   │   └── admin.js         # 管理后台页
│   ├── components/
│   │   ├── Proposal.js      # 方案展示组件
│   │   └── AdminDashboard.js # 管理后台组件
│   ├── lib/
│   │   └── api.js           # API 调用工具
│   └── styles/
│       └── globals.css      # 全局样式
```

## 快速启动

### 1. 安装依赖

```bash
cd avalanche-bridge-app
npm install              # 安装 concurrently
cd server && npm install  # 安装 express, cors
cd ../client && npm install  # 安装 next, react
cd ..
```

或一次性安装:

```bash
cd avalanche-bridge-app
npm run install:all
```

### 2. 启动应用

```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:server   # 后端: http://localhost:3001
npm run dev:client   # 前端: http://localhost:3000
```

### 3. 访问应用

- **方案展示**: http://localhost:3000
- **管理后台**: http://localhost:3000/admin
- **API 端点**: http://localhost:3001/api

## 功能模块

### 方案展示页 (首页)

1. 项目概述 - 4 张核心能力卡片
2. 项目背景与动机 - 痛点分析 + Team1 契合度
3. 技术架构 - 四层架构图 + 技术栈 + 设计决策
4. 实施路线图 - 4 阶段时间线 (8 个月)
5. 预算与资金分配 - 6,000 AVAX 预算表
6. 风险评估 - 6 项风险矩阵
7. 预期影响 - 4 项关键指标

### 管理后台

- **仪表盘**: 统计概览 + 资金支出分布柱状图
- **桥接请求**: 状态筛选 + 状态管理操作
- **验证者**: 验证者列表 + 启用/停用操作
- **资金流水**: 分类筛选 + 收支明细

### 后端 API

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/stats` | GET | 统计概览 |
| `/api/bridge-requests` | GET | 桥接请求列表 (支持 status 筛选) |
| `/api/bridge-requests/:id` | GET/PATCH | 单条请求查询/更新状态 |
| `/api/validators` | GET | 验证者列表 (支持 status 筛选) |
| `/api/validators/:id` | GET/PATCH | 单条验证者查询/更新状态 |
| `/api/funds` | GET | 资金流水列表 (支持 category 筛选) |
| `/api/funds/summary` | GET | 资金汇总分类统计 |
| `/api/health` | GET | 健康检查 |

## 环境要求

- Node.js >= 18
- npm >= 8
