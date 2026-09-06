// Proposal Display Component - Avalanche Cross-Chain Bridge
// Optimized & polished from the original single-file HTML proposal
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

function Hero({ onScrollTo }) {
  return (
    <section className="hero">
      <div className="hero-badge">Team1 Mini Grants</div>
      <h1>Avalanche 跨链桥<br />项目方案设计</h1>
      <p>
        构建基于验证者集合的去信任化跨链桥协议，打通 Avalanche 与以太坊、BSC、Arbitrum、Optimism 等主流 EVM 链之间的资产与消息流转通道，
        为 Team1 生态建设者提供底层流动性基础设施，加速生态系统增长
      </p>
      <div className="hero-tags">
        <span className="hero-tag">Avalanche C-Chain</span>
        <span className="hero-tag">LayerZero / CCIP</span>
        <span className="hero-tag">去信任化</span>
        <span className="hero-tag">EVM 兼容</span>
        <span className="hero-tag">流动性聚合</span>
        <span className="hero-tag">通用消息传递</span>
      </div>
      <div className="hero-cta">
        <button className="btn btn-primary" onClick={() => onScrollTo("architecture")}>
          查看技术架构
        </button>
        <button className="btn btn-secondary" onClick={() => onScrollTo("roadmap")}>
          实施路线图
        </button>
        <Link href="/admin" className="btn btn-accent">
          进入管理后台
        </Link>
      </div>
    </section>
  );
}

function SectionNav({ sections, activeSection, onNavClick }) {
  return (
    <div className="section-nav">
      <div className="section-nav-inner">
        {sections.map(s => (
          <button
            key={s.id}
            className={"section-nav-item " + (activeSection === s.id ? "active" : "")}
            onClick={() => onNavClick(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ num, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-num">{num}</div>
      <div>
        <div className="section-title">{title}</div>
        <div className="section-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

function Overview() {
  const [expanded, setExpanded] = useState(null);

  const cards = [
    { icon: "\uD83C\uDF09", bg: "rgba(232,65,66,0.15)", title: "跨链资产桥接", desc: "支持 ERC-20 代币在 Avalanche 与 6+ 条 EVM 兼容链之间安全流转，采用 Lock-Mint 与 Burn-Mint 双模式，灵活适配不同代币标准与流动性场景", detail: "Lock-Mint 模式：源链锁定原始代币，目标链铸造映射代币，适用于非原生资产。Burn-Mint 模式：销毁源链桥代币，目标链释放原生代币，减少流动性碎片化。双模式自动路由，根据代币类型和流动性深度选择最优路径。" },
    { icon: "\uD83D\uDCE8", bg: "rgba(76,139,245,0.15)", title: "通用消息传递", desc: "支持跨链智能合约调用，允许 dApp 在不同链上组合逻辑，构建跨链原生应用：跨链 DEX、跨链借贷协议、跨链治理系统等", detail: "通过通用的消息协议层，开发者可以在链 A 上调用链 B 的合约方法，实现跨链状态同步、跨链治理投票、跨链 NFT 转移等复杂场景。消息通过验证者集合签名 + 乐观窗口确认，确保安全性与最终性。" },
    { icon: "\u26A1", bg: "rgba(46,204,113,0.15)", title: "快速最终性", desc: "利用 Avalanche 子网（Subnet）的高吞吐与亚秒级确认特性，将跨链确认时间压缩至 30 秒以内，远优于行业 5-30 分钟的平均水平", detail: "Avalanche 的 Snowman 共识协议可在 1-2 秒内完成区块确认。跨链桥利用这一特性，在验证者签名完成后即可视为最终确认，无需等待额外的安全窗口。对于大额交易，可选择启用 10 分钟乐观欺诈窗口以获得额外保障。" },
    { icon: "\uD83D\uDEE1\uFE0F", bg: "rgba(155,89,182,0.15)", title: "多层安全防线", desc: "结合验证者签名 + 乐观欺诈证明 + 紧急暂停多签三层安全机制，确保跨链资产在极端场景下的可恢复性与用户资产安全", detail: "第一层：2/3+1 验证者多重签名，防止单点作恶。第二层：10 分钟乐观欺诈窗口，任何人都可提交欺诈证明挑战异常交易。第三层：紧急暂停多签，在发现严重漏洞时可立即冻结桥合约，保护用户资产。三层机制相互补充，覆盖不同威胁模型。" }
  ];

  return (
    <section className="section" id="overview">
      <SectionHeader num="1" title="项目概述" subtitle="Project Overview" />
      <div className="highlight-box">
        <h4>核心目标</h4>
        <p>
          构建一个基于动态验证者集合的去信任化跨链桥协议，实现 Avalanche C-Chain 与以太坊、BSC、Arbitrum、Optimism 等主流 EVM 链之间的
          资产与消息跨链传递。为 Team1 生态建设者提供底层流动性通道，降低建设者进入 Avalanche 生态的摩擦成本。
        </p>
      </div>
      <div className="card-grid">
        {cards.map((c, i) => (
          <div className="card card-clickable" key={i} onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="card-icon" style={{ background: c.bg }}>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            {expanded === i && (
              <div className="card-detail">
                <div className="card-detail-divider"></div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>{c.detail}</p>
              </div>
            )}
            <div className="card-expand-hint">
              {expanded === i ? "\u25B2 收起" : "\u25BC 展开详情"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Background() {
  const pains = [
    { num: "\u2460", title: "中心化风险", desc: "多数跨链桥依赖多签钱包或单一验证者集合，历史上已造成超 25 亿美元的安全事故（Wormhole、Ronin Bridge 等）" },
    { num: "\u2461", title: "确认延迟高", desc: "传统跨链桥确认时间 5-30 分钟，无法满足高频交易和实时结算需求，影响用户体验" },
    { num: "\u2462", title: "费用不透明", desc: "跨链手续费结构复杂（gas + 中继费 + 流动性费），用户难以预估总成本，阻碍大规模采用" },
    { num: "\u2463", title: "开发者门槛高", desc: "缺少标准化 SDK 和完整文档，dApp 集成跨链能力开发成本高昂，平均需要 2-4 周额外开发量" }
  ];

  return (
    <section className="section" id="background">
      <SectionHeader num="2" title="项目背景与动机" subtitle="Background & Motivation" />
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 12 }}>为什么需要这个跨链桥？</h3>
        <p style={{ marginBottom: 16, color: "var(--text-secondary)", fontSize: 14 }}>
          Avalanche 作为高性能 Layer1 平台，拥有极低的交易延迟和费用，但生态系统的增长受制于跨链流动性瓶颈。现有跨链方案存在以下痛点：
        </p>
        {pains.map((p, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < pains.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", fontSize: 14, color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--av-red)" }}>{p.num} {p.title}：</strong> {p.desc}
          </div>
        ))}
      </div>
      <div className="highlight-box">
        <h4>Team1 Mini Grants 契合度</h4>
        <p>
          本项目直接响应 Team1 计划"加速生态系统增长"的使命——跨链桥是生态基础设施的底层组件，
          能降低建设者进入 Avalanche 的摩擦成本，为后续 DeFi、NFT、GameFi 等上层应用提供流动性保障，
          具有高杠杆的生态价值。项目周期短（8 个月）、成果可量化、代码完全开源，符合 Mini Grants 快速、专注的资金定位。
        </p>
      </div>
    </section>
  );
}

function Architecture() {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    { label: "应用层", color: "rgba(232,65,66,0.15)", border: "rgba(232,65,66,0.3)", desc: "面向终端用户和开发者的应用层，包括跨链 DEX、跨链借贷、NFT 桥和开发者 SDK", nodes: [
      { name: "跨链 DEX", sub: "Swap & Pool" },
      { name: "跨链借贷", sub: "Lending" },
      { name: "NFT 桥", sub: "NFT Bridge" },
      { name: "dApp SDK", sub: "Developer Tools" }
    ]},
    { label: "协议层", color: "rgba(76,139,245,0.15)", border: "rgba(76,139,245,0.3)", desc: "核心协议层，实现资产桥接和消息传递的核心逻辑", nodes: [
      { name: "消息传递协议", sub: "Generic Messaging" },
      { name: "资产桥合约", sub: "Lock / Mint / Burn" },
      { name: "流动性池", sub: "Liquidity Pool" },
      { name: "路由器", sub: "Router" }
    ]},
    { label: "安全层", color: "rgba(46,204,113,0.15)", border: "rgba(46,204,113,0.3)", desc: "安全保障层，多重安全机制保护跨链资产安全", nodes: [
      { name: "验证者集合", sub: "Validator Set" },
      { name: "乐观欺诈证明", sub: "Fraud Proof" },
      { name: "紧急暂停", sub: "Emergency Pause" },
      { name: "速率限制", sub: "Rate Limit" }
    ]},
    { label: "链层", color: "rgba(155,89,182,0.15)", border: "rgba(155,89,182,0.3)", desc: "底层区块链网络，支持 Avalanche 和主流 EVM 兼容链", nodes: [
      { name: "Avalanche", sub: "C-Chain" },
      { name: "Ethereum", sub: "Mainnet" },
      { name: "BSC", sub: "BNB Chain" },
      { name: "Arbitrum", sub: "+ Optimism" }
    ]}
  ];

  const techStack = [
    { name: "Solidity", sub: "0.8.x" },
    { name: "Foundry", sub: "测试框架" },
    { name: "TypeScript", sub: "中继服务" },
    { name: "Node.js", sub: "后端" },
    { name: "ethers.js", sub: "链交互" },
    { name: "Next.js", sub: "前端" },
    { name: "The Graph", sub: "索引" },
    { name: "IPFS", sub: "元数据存储" }
  ];

  const decisions = [
    { title: "验证者集合模型", desc: "采用动态验证者集合，初始由 12 个独立节点组成，通过质押 AVAX 获得验证资格。每个跨链消息需 2/3+1 验证者签名方可生效，支持去信任化轮换与 Slashing 惩罚机制。" },
    { title: "双模式资产桥", desc: "Lock-Mint 模式用于非原生代币（锁定源链资产，在目标链铸造映射代币）；Burn-Mint 模式用于原生桥代币（销毁源链代币，在目标链释放原生代币），降低流动性碎片化。" },
    { title: "乐观验证窗口", desc: "跨链交易提交后设置 10 分钟乐观窗口，任何人在此期间可提交欺诈证明挑战异常交易。窗口期满无挑战则自动确认，在速度与安全之间取得平衡。" }
  ];

  return (
    <section className="section" id="architecture">
      <SectionHeader num="3" title="技术架构" subtitle="Technical Architecture" />
      <div className="arch-diagram" style={{ marginBottom: 20 }}>
        <div className="arch-layers">
          {layers.map((layer, i) => (
            <div key={i}>
              <div
                className={"arch-layer " + (activeLayer === i ? "layer-active" : "")}
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                style={{ cursor: "pointer", borderRadius: 10, transition: "background 0.2s" }}
              >
                <div className="layer-label">{layer.label}</div>
                {layer.nodes.map((node, j) => (
                  <div key={j} className="arch-node" style={{ background: layer.color, border: "1px solid " + layer.border, marginLeft: j > 0 ? "4px" : 0 }}>
                    {node.name}
                    <small>{node.sub}</small>
                  </div>
                ))}
              </div>
              {activeLayer === i && (
                <div className="layer-detail">
                  <p>{layer.desc}</p>
                </div>
              )}
              {i < layers.length - 1 && <div className="arch-arrow">{"\u2191\u2193"}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
          点击任意层查看详细说明
        </div>
      </div>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 14 }}>技术栈</h3>
        <div className="tech-pills">
          {techStack.map((t, i) => (
            <div key={i} className="tech-pill">{t.name}<small>{t.sub}</small></div>
          ))}
        </div>
      </div>
      <div className="card-grid">
        {decisions.map((d, i) => (
          <div className="card" key={i}>
            <h3 style={{ marginBottom: 8 }}>{d.title}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { date: "第 1-2 月", title: "Phase 1 \u2014 核心合约开发与测试网部署", desc: "完成跨链桥核心智能合约（资产桥合约、消息协议合约、验证者管理合约）开发与审计。部署 Fuji 测试网，完成与 Ethereum Goerli/BSC Testnet 的跨链联调。产出：可运行的测试网版本 + 开发者文档 v0.1。" },
    { date: "第 3-4 月", title: "Phase 2 \u2014 主网部署与安全审计", desc: "通过两家独立安全审计公司（CertiK + Halborn）完成代码审计。部署主网合约，首先支持 Avalanche \u2194 Ethereum 双向桥。启动验证者节点集合，开放质押注册。产出：主网 MVP + 审计报告。" },
    { date: "第 5-6 月", title: "Phase 3 \u2014 多链扩展与 SDK 发布", desc: "扩展至 BSC、Arbitrum、Optimism 共 4 条链。发布开发者 SDK（TypeScript/Python）和集成文档。上线前端界面，支持一键跨链操作。产出：多链版本 + SDK v1.0 + 用户前端。" },
    { date: "第 7-8 月", title: "Phase 4 \u2014 生态集成与优化", desc: "与 3+ 个 Avalanche 生态 dApp 完成集成。实现流动性聚合层，支持最优跨链路径选择。开源全部代码，提交至 Team1 生态资源库。产出：生态集成案例 + 开源仓库 + 性能优化报告。" }
  ];

  return (
    <section className="section" id="roadmap">
      <SectionHeader num="4" title="实施路线图" subtitle="Implementation Roadmap" />
      <div className="timeline">
        {phases.map((p, i) => (
          <div
            className={"timeline-item " + (activePhase === i ? "timeline-active" : "")}
            key={i}
            onClick={() => setActivePhase(i)}
          >
            <div className="timeline-date">{p.date}</div>
            <div className="timeline-title">{p.title}</div>
            <div className="timeline-desc">{p.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}>
        当前选中：Phase {activePhase + 1} &middot; 点击切换阶段
      </div>
    </section>
  );
}

function Budget() {
  const [showDetail, setShowDetail] = useState(false);

  const rows = [
    { cat: "核心开发", desc: "智能合约开发、中继服务、前端（2 名全职 + 1 名兼职，8 个月）", amount: "3,000", pct: "50%" },
    { cat: "安全审计", desc: "两家独立审计公司合约审计 + 漏洞赏金计划初始资金", amount: "1,200", pct: "20%" },
    { cat: "基础设施", desc: "验证者节点服务器、RPC 节点、The Graph 索引、CDN", amount: "900", pct: "15%" },
    { cat: "开发者生态", desc: "SDK 开发、文档编写、开发者激励、黑客松赞助", amount: "600", pct: "10%" },
    { cat: "运营与市场", desc: "社区运营、内容创作、集成合作伙伴拓展", amount: "300", pct: "5%" }
  ];

  return (
    <section className="section" id="budget">
      <SectionHeader num="5" title="预算与资金分配" subtitle="Budget & Resource Allocation" />
      <table className="data-table">
        <thead>
          <tr>
            <th>类别</th>
            <th>用途说明</th>
            <th style={{ textAlign: "right" }}>金额 (AVAX)</th>
            <th style={{ textAlign: "right" }}>占比</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.cat}</td>
              <td>{r.desc}</td>
              <td style={{ textAlign: "right" }} className="budget-amount">{r.amount}</td>
              <td style={{ textAlign: "right" }}>{r.pct}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td>合计</td>
            <td>Team1 Mini Grants 资金申请总额</td>
            <td style={{ textAlign: "right" }}>6,000 AVAX</td>
            <td style={{ textAlign: "right" }}>100%</td>
          </tr>
        </tbody>
      </table>
      <div className="highlight-box" style={{ marginTop: 20 }}>
        <h4>资金分配原则</h4>
        <button className="btn-toggle" onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? "\u25B2 收起详情" : "\u25BC 展开资金管理详情"}
        </button>
        {showDetail && (
          <div style={{ marginTop: 12 }}>
            <p>
              核心开发占比最大（50%），确保工程质量；安全审计占 20%，是跨链桥信任的基石；基础设施和开发者生态各占 15%/10%，
              保障长期可持续运营。所有资金使用将通过链上多签钱包管理，每月公开资金使用报告，接受 Team1 社区监督。
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 2 }}>
              <li>多签钱包：3/5 多签，由核心团队 + 社区代表共同管理</li>
              <li>月度报告：每月 5 日前公开上月资金使用明细</li>
              <li>紧急拨款：需 4/5 多签批准，用于安全事件响应</li>
              <li>剩余资金：项目完成后返还 Team1 国库或用于生态激励</li>
            </ul>
          </div>
        )}
        {!showDetail && (
          <p style={{ marginTop: 8 }}>
            核心开发占比最大（50%），确保工程质量；安全审计占 20%，是跨链桥信任的基石...
          </p>
        )}
      </div>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Link href="/admin" className="btn btn-primary">
          查看资金使用情况
        </Link>
      </div>
    </section>
  );
}

function Risks() {
  const [expandedRisk, setExpandedRisk] = useState(null);

  const risks = [
    { level: "high", name: "合约漏洞利用", desc: "跨链桥合约逻辑复杂，可能存在未发现的攻击面（重入、签名伪造等）。", mitigation: "双机构审计 + 漏洞赏金 + 速率限制 + 紧急暂停多签", detail: "CertiK 和 Halborn 两家独立安全公司进行全面审计，覆盖重入攻击、签名伪造、整数溢出等常见漏洞。漏洞赏金计划提供最高 50,000 USDC 的奖励。速率限制每条链每小时最多 500,000 USDC 等值资产跨链。紧急暂停多签可在 4/5 验证者同意下立即冻结所有跨链操作。" },
    { level: "high", name: "验证者串谋", desc: "验证者集合可能串谋签署 fraudulent 消息，盗取锁定资产。", mitigation: "质押 Slashing 机制 + 验证者轮换 + 乐观欺诈窗口 + 2/3+1 阈值", detail: "每个验证者需质押 5,000+ AVAX，作恶将被全额 Slashing。验证者每 30 天轮换一次，防止长期串谋。10 分钟乐观窗口允许任何人提交欺诈证明。需要至少 8/12 验证者签名（2/3+1），单点串谋无法生效。" },
    { level: "medium", name: "流动性不足", desc: "主网初期流动性池深度不足，导致大额跨链交易滑点高。", mitigation: "LP 激励计划 + 流动性聚合路由 + 渐进式开放大额限制", detail: "前 3 个月提供额外 200 AVAX/月的 LP 激励。流动性聚合路由自动选择最优路径，拆分大额交易到多个流动性池。主网前 2 周单笔限额 10,000 USDC，之后逐步提升至 100,000 USDC。" },
    { level: "medium", name: "开发延迟", desc: "跨链集成涉及多链兼容性，技术复杂度可能导致进度滞后。", mitigation: "敏捷迭代 + MVP 优先 + 测试网先行验证 + 预留 20% 缓冲时间", detail: "采用 2 周 Sprint 敏捷开发。Phase 1 仅实现 Avalanche-Ethereum 双向桥，验证核心架构。每条新链在测试网完成全部集成测试后才上主网。总工期预留 1.6 个月缓冲。" },
    { level: "low", name: "监管合规", desc: "跨链桥作为基础设施可能面临不同司法管辖区的合规要求。", mitigation: "去信任化设计 + 非托管模式 + 法律顾问咨询 + 持续关注监管动态", detail: "桥合约为非托管模式，用户始终控制自己的资产。已咨询 Chainlight Partners 法律团队，确认技术架构不构成证券发行。将持续跟踪美/欧/亚主要司法管辖区的 DeFi 监管政策。" },
    { level: "low", name: "链生态变化", desc: "目标链可能进行硬分叉或升级，导致兼容性问题。", mitigation: "模块化链适配层 + 升级监控 + 社区预警机制", detail: "链适配层抽象了不同链的 RPC 接口差异，新增链仅需实现标准接口。通过 Chainlink 节点监控各链升级公告，提前 7 天预警。社区 Discord 设立 #chain-updates 频道通知开发者。" }
  ];

  return (
    <section className="section" id="risks">
      <SectionHeader num="6" title="风险评估与缓解" subtitle="Risk Assessment & Mitigation" />
      <div className="risk-grid">
        {risks.map((r, i) => (
          <div
            key={i}
            className={"risk-item " + r.level + (expandedRisk === i ? " risk-expanded" : "")}
            onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}
          >
            <div className="risk-header">
              <span className="risk-name">{r.name}</span>
              <span className={"risk-level " + r.level}>{r.level === "high" ? "高风险" : r.level === "medium" ? "中风险" : "低风险"}</span>
            </div>
            <p className="risk-desc">{r.desc}</p>
            <p className="risk-mitigation"><strong>缓解：</strong>{r.mitigation}</p>
            {expandedRisk === i && (
              <div className="risk-detail">
                <div className="card-detail-divider"></div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>{r.detail}</p>
              </div>
            )}
            <div className="card-expand-hint">
              {expandedRisk === i ? "\u25B2 收起" : "\u25BC 展开详细方案"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  const metrics = [
    { value: "4+", label: "连通 EVM 链数量" },
    { value: "<30s", label: "跨链确认时间" },
    { value: "3+", label: "生态 dApp 集成数" },
    { value: "$50M+", label: "预期 TVL（12 个月内）" }
  ];

  const values = [
    { title: "流动性入口", desc: "降低外部资产进入 Avalanche 的摩擦，直接提升链上 TVL" },
    { title: "开发者赋能", desc: "标准 SDK 让 dApp 一行代码集成跨链能力，降低建设者开发成本" },
    { title: "安全标准", desc: "为 Avalanche 生态树立跨链安全标杆，增强用户信心" },
    { title: "开源贡献", desc: "全部代码开源，丰富 Avalanche 开发者工具库，吸引更多建设者加入" }
  ];

  return (
    <section className="section" id="impact">
      <SectionHeader num="7" title="预期影响与指标" subtitle="Expected Impact & Metrics" />
      <div className="metrics-row">
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 12 }}>对 Avalanche 生态的长期价值</h3>
        {values.map((v, i) => (
          <div key={i} style={{ padding: "6px 0", fontSize: 14, color: "var(--text-secondary)", borderBottom: i < values.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <strong style={{ color: "var(--accent-blue)" }}>{v.title}：</strong> {v.desc}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/admin" className="btn btn-accent btn-lg">
          进入管理后台查看实时数据
        </Link>
      </div>
    </section>
  );
}

function BackToTop({ visible, onClick }) {
  if (!visible) return null;
  return (
    <button className="back-to-top" onClick={onClick}>
      {"\u2191"}
    </button>
  );
}

export default function Proposal() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showBackTop, setShowBackTop] = useState(false);

  const sections = [
    { id: "overview", label: "概述" },
    { id: "background", label: "背景" },
    { id: "architecture", label: "架构" },
    { id: "roadmap", label: "路线图" },
    { id: "budget", label: "预算" },
    { id: "risks", label: "风险" },
    { id: "impact", label: "影响" }
  ];

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
      const scrollPos = window.scrollY + 150;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Hero onScrollTo={scrollToSection} />
      <SectionNav sections={sections} activeSection={activeSection} onNavClick={scrollToSection} />
      <div className="container">
        <Overview />
        <Background />
        <Architecture />
        <Roadmap />
        <Budget />
        <Risks />
        <Impact />
      </div>
      <footer className="footer">
        <p>Avalanche Cross-Chain Bridge Project Proposal &middot; Team1 Mini Grants</p>
        <p style={{ marginTop: 8 }}>本方案为概念设计稿，实际实施需根据安全审计结果和生态反馈迭代调整</p>
        <div style={{ marginTop: 12 }}>
          <Link href="/admin" className="btn btn-secondary btn-sm">
            管理后台
          </Link>
        </div>
      </footer>
      <BackToTop visible={showBackTop} onClick={scrollToTop} />
    </>
  );
}
