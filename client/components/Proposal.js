// Proposal Display Component - Avalanche Cross-Chain Bridge
// Optimized & polished from the original single-file HTML proposal

function Hero() {
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
    </section>
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
  const cards = [
    { icon: "\uD83C\uDF09", bg: "rgba(232,65,66,0.15)", title: "跨链资产桥接", desc: "支持 ERC-20 代币在 Avalanche 与 6+ 条 EVM 兼容链之间安全流转，采用 Lock-Mint 与 Burn-Mint 双模式，灵活适配不同代币标准与流动性场景" },
    { icon: "\uD83D\uDCE8", bg: "rgba(76,139,245,0.15)", title: "通用消息传递", desc: "支持跨链智能合约调用，允许 dApp 在不同链上组合逻辑，构建跨链原生应用：跨链 DEX、跨链借贷协议、跨链治理系统等" },
    { icon: "\u26A1", bg: "rgba(46,204,113,0.15)", title: "快速最终性", desc: "利用 Avalanche 子网（Subnet）的高吞吐与亚秒级确认特性，将跨链确认时间压缩至 30 秒以内，远优于行业 5-30 分钟的平均水平" },
    { icon: "\uD83D\uDEE1\uFE0F", bg: "rgba(155,89,182,0.15)", title: "多层安全防线", desc: "结合验证者签名 + 乐观欺诈证明 + 紧急暂停多签三层安全机制，确保跨链资产在极端场景下的可恢复性与用户资产安全" }
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
          <div className="card" key={i}>
            <div className="card-icon" style={{ background: c.bg }}>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
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
  const layers = [
    { label: "应用层", color: "rgba(232,65,66,0.15)", border: "rgba(232,65,66,0.3)", nodes: [
      { name: "跨链 DEX", sub: "Swap & Pool" },
      { name: "跨链借贷", sub: "Lending" },
      { name: "NFT 桥", sub: "NFT Bridge" },
      { name: "dApp SDK", sub: "Developer Tools" }
    ]},
    { label: "协议层", color: "rgba(76,139,245,0.15)", border: "rgba(76,139,245,0.3)", nodes: [
      { name: "消息传递协议", sub: "Generic Messaging" },
      { name: "资产桥合约", sub: "Lock / Mint / Burn" },
      { name: "流动性池", sub: "Liquidity Pool" },
      { name: "路由器", sub: "Router" }
    ]},
    { label: "安全层", color: "rgba(46,204,113,0.15)", border: "rgba(46,204,113,0.3)", nodes: [
      { name: "验证者集合", sub: "Validator Set" },
      { name: "乐观欺诈证明", sub: "Fraud Proof" },
      { name: "紧急暂停", sub: "Emergency Pause" },
      { name: "速率限制", sub: "Rate Limit" }
    ]},
    { label: "链层", color: "rgba(155,89,182,0.15)", border: "rgba(155,89,182,0.3)", nodes: [
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
              <div className="arch-layer">
                <div className="layer-label">{layer.label}</div>
                {layer.nodes.map((node, j) => (
                  <div key={j} className="arch-node" style={{ background: layer.color, border: "1px solid " + layer.border, marginLeft: j > 0 ? "4px" : 0 }}>
                    {node.name}
                    <small>{node.sub}</small>
                  </div>
                ))}
              </div>
              {i < layers.length - 1 && <div className="arch-arrow">{"\u2191\u2193"}</div>}
            </div>
          ))}
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
          <div className="timeline-item" key={i}>
            <div className="timeline-date">{p.date}</div>
            <div className="timeline-title">{p.title}</div>
            <div className="timeline-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Budget() {
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
        <p>
          核心开发占比最大（50%），确保工程质量；安全审计占 20%，是跨链桥信任的基石；基础设施和开发者生态各占 15%/10%，
          保障长期可持续运营。所有资金使用将通过链上多签钱包管理，每月公开资金使用报告，接受 Team1 社区监督。
        </p>
      </div>
    </section>
  );
}

function Risks() {
  const risks = [
    { level: "high", name: "合约漏洞利用", desc: "跨链桥合约逻辑复杂，可能存在未发现的攻击面（重入、签名伪造等）。", mitigation: "双机构审计 + 漏洞赏金 + 速率限制 + 紧急暂停多签" },
    { level: "high", name: "验证者串谋", desc: "验证者集合可能串谋签署 fraudulent 消息，盗取锁定资产。", mitigation: "质押 Slashing 机制 + 验证者轮换 + 乐观欺诈窗口 + 2/3+1 阈值" },
    { level: "medium", name: "流动性不足", desc: "主网初期流动性池深度不足，导致大额跨链交易滑点高。", mitigation: "LP 激励计划 + 流动性聚合路由 + 渐进式开放大额限制" },
    { level: "medium", name: "开发延迟", desc: "跨链集成涉及多链兼容性，技术复杂度可能导致进度滞后。", mitigation: "敏捷迭代 + MVP 优先 + 测试网先行验证 + 预留 20% 缓冲时间" },
    { level: "low", name: "监管合规", desc: "跨链桥作为基础设施可能面临不同司法管辖区的合规要求。", mitigation: "去信任化设计 + 非托管模式 + 法律顾问咨询 + 持续关注监管动态" },
    { level: "low", name: "链生态变化", desc: "目标链可能进行硬分叉或升级，导致兼容性问题。", mitigation: "模块化链适配层 + 升级监控 + 社区预警机制" }
  ];

  return (
    <section className="section" id="risks">
      <SectionHeader num="6" title="风险评估与缓解" subtitle="Risk Assessment & Mitigation" />
      <div className="risk-grid">
        {risks.map((r, i) => (
          <div key={i} className={"risk-item " + r.level}>
            <div className="risk-header">
              <span className="risk-name">{r.name}</span>
              <span className={"risk-level " + r.level}>{r.level === "high" ? "高风险" : r.level === "medium" ? "中风险" : "低风险"}</span>
            </div>
            <p className="risk-desc">{r.desc}</p>
            <p className="risk-mitigation"><strong>缓解：</strong>{r.mitigation}</p>
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
    </section>
  );
}

export default function Proposal() {
  return (
    <>
      <Hero />
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
      </footer>
    </>
  );
}
