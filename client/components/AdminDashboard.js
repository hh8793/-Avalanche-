// Admin Dashboard Component - Avalanche Cross-Chain Bridge
import { useState, useEffect, useCallback } from "react";
import {
  getStats, getBridgeRequests, getValidators, getFunds, getFundSummary,
  updateBridgeRequest, updateValidator
} from "../lib/api";

function StatCard({ value, label, color }) {
  return (
    <div className="stat-card">
      <div className={"stat-value " + (color || "")}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function DashboardTab() {
  const [stats, setStats] = useState(null);
  const [fundSummary, setFundSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getFundSummary()])
      .then(([s, fs]) => { setStats(s); setFundSummary(fs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (!stats) return <div className="loading">Failed to load data. Make sure backend is running on port 3001.</div>;

  const br = stats.bridgeRequests;
  const val = stats.validators;
  const fund = stats.funds;
  const maxExpense = fundSummary ? Math.max(...Object.values(fundSummary.categories).map(c => c.amount), 1) : 1;
  const barColors = ["#E84142", "#4C8BF5", "#2ECC71", "#F1C40F", "#9B59B6"];

  return (
    <div>
      <div className="admin-stats">
        <StatCard value={br.total} label="跨链请求总数" color="blue" />
        <StatCard value={br.completed} label="已完成" color="green" />
        <StatCard value={br.processing} label="处理中" color="yellow" />
        <StatCard value={br.pending} label="待处理" color="red" />
        <StatCard value={br.failed} label="失败" color="red" />
      </div>
      <div className="admin-stats">
        <StatCard value={val.total} label="验证者总数" color="blue" />
        <StatCard value={val.active} label="活跃验证者" color="green" />
        <StatCard value={val.inactive} label="非活跃" color="yellow" />
        <StatCard value={stats.avgUptime + "%"} label="平均在线率" color="green" />
        <StatCard value={val.totalStake} label="总质押 AVAX" color="red" />
      </div>
      <div className="admin-stats">
        <StatCard value={fund.totalIncome + " AVAX"} label="资金总收入" color="green" />
        <StatCard value={fund.totalExpense + " AVAX"} label="已支出" color="red" />
        <StatCard value={fund.remaining + " AVAX"} label="剩余资金" color="blue" />
      </div>

      {fundSummary && (
        <div className="card" style={{ marginTop: 4 }}>
          <h3 style={{ marginBottom: 16 }}>资金支出分布</h3>
          <div className="bar-chart">
            {Object.values(fundSummary.categories).map((cat, i) => (
              <div className="bar-row" key={i}>
                <div className="bar-label">{cat.label}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{
                    width: (cat.amount / maxExpense * 100) + "%",
                    background: barColors[i % barColors.length]
                  }}>
                    {cat.amount} AVAX
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", width: 60, textAlign: "right" }}>
                  {cat.items} 笔
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BridgeRequestsTab() {
  const [requests, setRequests] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getBridgeRequests(filter)
      .then(setRequests)
      .catch(() => setError("Failed to load bridge requests"))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleStatusChange = (id, newStatus) => {
    updateBridgeRequest(id, { status: newStatus }).then(() => loadData());
  };

  const tabs = ["all", "pending", "processing", "completed", "failed"];

  if (loading) return <div className="loading">Loading bridge requests...</div>;
  if (error) return <div className="loading">{error}</div>;

  return (
    <div>
      <div className="tabs">
        {tabs.map(t => (
          <div key={t} className={"tab " + (filter === t ? "active" : "")} onClick={() => setFilter(t)}>
            {t === "all" ? "全部" : t === "pending" ? "待处理" : t === "processing" ? "处理中" : t === "completed" ? "已完成" : "失败"}
          </div>
        ))}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>源链</th>
            <th>目标链</th>
            <th>资产</th>
            <th>金额</th>
            <th>发送者</th>
            <th>状态</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.sourceChain}</td>
              <td>{r.targetChain}</td>
              <td>{r.asset}</td>
              <td style={{ fontWeight: 700, color: "var(--accent-blue)" }}>{r.amount}</td>
              <td style={{ fontFamily: "monospace", fontSize: 12 }}>{r.sender}</td>
              <td><span className={"status-badge " + r.status}>{r.status === "completed" ? "已完成" : r.status === "processing" ? "处理中" : r.status === "pending" ? "待处理" : "失败"}</span></td>
              <td style={{ fontSize: 12, whiteSpace: "nowrap" }}>{r.timestamp}</td>
              <td>
                {r.status === "pending" && (
                  <button onClick={() => handleStatusChange(r.id, "processing")} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 6, border: "1px solid var(--accent-blue)", background: "rgba(76,139,245,0.15)", color: "var(--accent-blue)", cursor: "pointer" }}>开始处理</button>
                )}
                {r.status === "processing" && (
                  <button onClick={() => handleStatusChange(r.id, "completed")} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 6, border: "1px solid var(--accent-green)", background: "rgba(46,204,113,0.15)", color: "var(--accent-green)", cursor: "pointer" }}>标记完成</button>
                )}
                {r.status === "failed" && (
                  <button onClick={() => handleStatusChange(r.id, "pending")} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 6, border: "1px solid var(--accent-yellow)", background: "rgba(241,196,15,0.15)", color: "var(--accent-yellow)", cursor: "pointer" }}>重试</button>
                )}
                {(r.status === "completed" || r.status === "processing") && (
                  <button onClick={() => handleStatusChange(r.id, "failed")} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 6, border: "1px solid var(--av-red)", background: "rgba(232,65,66,0.15)", color: "var(--av-red)", cursor: "pointer", marginLeft: 4 }}>标记失败</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}>
        {requests.length === 0 ? "当前筛选条件下无数据" : "共 " + requests.length + " 条记录"}
      </div>
    </div>
  );
}

function ValidatorsTab() {
  const [validators, setValidators] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    getValidators(filter)
      .then(setValidators)
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { loadData(); }, [loadData]);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateValidator(id, { status: newStatus }).then(() => loadData());
  };

  if (loading) return <div className="loading">Loading validators...</div>;

  return (
    <div>
      <div className="tabs">
        <div className={"tab " + (filter === "all" ? "active" : "")} onClick={() => setFilter("all")}>全部</div>
        <div className={"tab " + (filter === "active" ? "active" : "")} onClick={() => setFilter("active")}>活跃</div>
        <div className={"tab " + (filter === "inactive" ? "active" : "")} onClick={() => setFilter("inactive")}>非活跃</div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>地址</th>
            <th>质押量 (AVAX)</th>
            <th>状态</th>
            <th>在线率</th>
            <th>已签名区块</th>
            <th>加入时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {validators.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td style={{ fontFamily: "monospace", fontSize: 12 }}>{v.address}</td>
              <td style={{ fontWeight: 700, color: "var(--av-red)" }}>{v.stakeAmount}</td>
              <td><span className={"status-badge " + v.status}>{v.status === "active" ? "活跃" : "非活跃"}</span></td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: parseFloat(v.uptime) >= 99 ? "var(--accent-green)" : "var(--accent-yellow)", fontWeight: 700, width: 48 }}>{v.uptime}%</span>
                  <div className="progress-bar" style={{ width: 60 }}>
                    <div className="progress-fill" style={{ width: v.uptime + "%", background: parseFloat(v.uptime) >= 99 ? "var(--accent-green)" : "var(--accent-yellow)" }}></div>
                  </div>
                </div>
              </td>
              <td>{v.blocksSigned.toLocaleString()}</td>
              <td style={{ fontSize: 12 }}>{v.joinedAt}</td>
              <td>
                <button onClick={() => toggleStatus(v.id, v.status)} style={{
                  padding: "4px 10px", fontSize: 12, borderRadius: 6, cursor: "pointer",
                  border: v.status === "active" ? "1px solid var(--av-red)" : "1px solid var(--accent-green)",
                  background: v.status === "active" ? "rgba(232,65,66,0.15)" : "rgba(46,204,113,0.15)",
                  color: v.status === "active" ? "var(--av-red)" : "var(--accent-green)"
                }}>
                  {v.status === "active" ? "停用" : "启用"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FundFlowsTab() {
  const [funds, setFunds] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFunds(filter)
      .then(setFunds)
      .finally(() => setLoading(false));
  }, [filter]);

  if (loading) return <div className="loading">Loading fund flows...</div>;

  const categories = [
    { key: "all", label: "全部" },
    { key: "grant", label: "Team1 资金" },
    { key: "core-dev", label: "核心开发" },
    { key: "security-audit", label: "安全审计" },
    { key: "infrastructure", label: "基础设施" },
    { key: "dev-ecosystem", label: "开发者生态" },
    { key: "operations", label: "运营与市场" }
  ];

  return (
    <div>
      <div className="tabs">
        {categories.map(c => (
          <div key={c.key} className={"tab " + (filter === c.key ? "active" : "")} onClick={() => setFilter(c.key)}>
            {c.label}
          </div>
        ))}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>类别</th>
            <th>描述</th>
            <th>类型</th>
            <th>金额</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          {funds.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.categoryLabel}</td>
              <td>{f.description}</td>
              <td>
                <span className={"status-badge " + (f.type === "income" ? "active" : "failed")}>
                  {f.type === "income" ? "收入" : "支出"}
                </span>
              </td>
              <td style={{ fontWeight: 700, color: f.type === "income" ? "var(--accent-green)" : "var(--av-red)" }}>
                {f.type === "income" ? "+" : "-"}{f.amount} {f.amountUnit}
              </td>
              <td style={{ fontSize: 12 }}>{f.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { key: "dashboard", label: "仪表盘" },
    { key: "requests", label: "桥接请求" },
    { key: "validators", label: "验证者" },
    { key: "funds", label: "资金流水" }
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">Avalanche 跨链桥管理后台</div>
        <div className="admin-subtitle">Bridge Management Dashboard &middot; Team1 Mini Grants</div>
      </div>
      <div className="tabs">
        {tabs.map(t => (
          <div key={t.key} className={"tab " + (activeTab === t.key ? "active" : "")} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </div>
        ))}
      </div>
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "requests" && <BridgeRequestsTab />}
      {activeTab === "validators" && <ValidatorsTab />}
      {activeTab === "funds" && <FundFlowsTab />}
    </div>
  );
}
