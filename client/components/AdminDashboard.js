// Admin Dashboard Component - Avalanche Cross-Chain Bridge
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  getStats, getBridgeRequests, getValidators, getFunds, getFundSummary,
  createBridgeRequest, updateBridgeRequest, updateValidator
} from "../lib/api";

function StatCard({ value, label, color }) {
  return (
    <div className="stat-card">
      <div className={"stat-value " + (color || "")}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function RefreshButton({ onClick }) {
  return (
    <button className="btn btn-sm btn-secondary" onClick={onClick} style={{ marginBottom: 16 }}>
      {"\u27F3"} 刷新数据
    </button>
  );
}

function ExportButton({ data, filename, label }) {
  const handleExport = () => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map(row => headers.map(h => {
        const val = row[h];
        const str = val === null || val === undefined ? "" : String(val);
        return str.includes(",") || str.includes('"') ? '"' + str.replace(/"/g, '""') + '"' : str;
      }).join(","))
    ];
    const csv = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button className="btn btn-sm btn-secondary" onClick={handleExport} style={{ marginBottom: 16, marginLeft: 8 }}>
      {"\u2B07"} 导出 {label}
    </button>
  );
}

function DashboardTab({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [fundSummary, setFundSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getFundSummary()])
      .then(([s, fs]) => { setStats(s); setFundSummary(fs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [refreshKey]);

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

function CreateRequestModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    sourceChain: "Avalanche",
    targetChain: "Ethereum",
    asset: "AVAX",
    amount: "",
    sender: "0x0000...0000"
  });
  const [creating, setCreating] = useState(false);

  const chains = ["Avalanche", "Ethereum", "BSC", "Arbitrum", "Optimism"];
  const assets = ["AVAX", "ETH", "USDC", "LINK", "WBTC"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreating(true);
    createBridgeRequest(form)
      .then(() => { onCreate(); onClose(); })
      .catch(() => { setCreating(false); });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>新建跨链请求</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>源链</label>
            <select value={form.sourceChain} onChange={e => setForm({ ...form, sourceChain: e.target.value })}>
              {chains.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>目标链</label>
            <select value={form.targetChain} onChange={e => setForm({ ...form, targetChain: e.target.value })}>
              {chains.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>资产</label>
            <select value={form.asset} onChange={e => setForm({ ...form, asset: e.target.value })}>
              {assets.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>金额</label>
            <input type="text" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="例如: 100.00" required />
          </div>
          <div className="form-row">
            <label>发送者地址</label>
            <input type="text" value={form.sender} onChange={e => setForm({ ...form, sender: e.target.value })} placeholder="0x..." />
          </div>
          <button type="submit" className="btn btn-primary" disabled={creating} style={{ marginTop: 8 }}>
            {creating ? "创建中..." : "创建请求"}
          </button>
        </form>
      </div>
    </div>
  );
}

function RequestDetailModal({ request, onClose }) {
  if (!request) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>跨链请求详情 - {request.id}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="detail-grid">
          <div className="detail-row"><span className="detail-label">请求 ID</span><span className="detail-value">{request.id}</span></div>
          <div className="detail-row"><span className="detail-label">源链</span><span className="detail-value">{request.sourceChain}</span></div>
          <div className="detail-row"><span className="detail-label">目标链</span><span className="detail-value">{request.targetChain}</span></div>
          <div className="detail-row"><span className="detail-label">资产</span><span className="detail-value">{request.asset}</span></div>
          <div className="detail-row"><span className="detail-label">金额</span><span className="detail-value">{request.amount}</span></div>
          <div className="detail-row"><span className="detail-label">发送者</span><span className="detail-value mono">{request.sender}</span></div>
          <div className="detail-row"><span className="detail-label">状态</span><span className="detail-value"><span className={"status-badge " + request.status}>{request.status}</span></span></div>
          <div className="detail-row"><span className="detail-label">交易哈希</span><span className="detail-value mono">{request.txHash || "暂无"}</span></div>
          <div className="detail-row"><span className="detail-label">时间</span><span className="detail-value">{request.timestamp}</span></div>
          {request.error && <div className="detail-row"><span className="detail-label">错误信息</span><span className="detail-value" style={{ color: "var(--av-red)" }}>{request.error}</span></div>}
        </div>
      </div>
    </div>
  );
}

function BridgeRequestsTab({ refreshKey, onRefresh }) {
  const [requests, setRequests] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [detailRequest, setDetailRequest] = useState(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getBridgeRequests(filter)
      .then(setRequests)
      .catch(() => setError("Failed to load bridge requests"))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { loadData(); }, [loadData, refreshKey]);

  const handleStatusChange = (id, newStatus) => {
    updateBridgeRequest(id, { status: newStatus }).then(() => loadData());
  };

  const tabs = ["all", "pending", "processing", "completed", "failed"];

  if (loading) return <div className="loading">Loading bridge requests...</div>;
  if (error) return (
    <div>
      <div className="loading">{error}</div>
      <button className="btn btn-sm btn-secondary" onClick={() => { onRefresh(); loadData(); }}>重试</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
        <button className="btn btn-sm btn-primary" onClick={() => setShowCreate(true)}>
          + 新建跨链请求
        </button>
        <button className="btn btn-sm btn-secondary" onClick={() => { onRefresh(); loadData(); }}>
          刷新
        </button>
        <ExportButton data={requests} filename="bridge-requests.csv" label="CSV" />
      </div>
      <div className="tabs">
        {tabs.map(t => (
          <button key={t} className={"tab " + (filter === t ? "active" : "")} onClick={() => setFilter(t)}>
            {t === "all" ? "全部" : t === "pending" ? "待处理" : t === "processing" ? "处理中" : t === "completed" ? "已完成" : "失败"}
          </button>
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
              <td>
                <button className="link-btn" onClick={() => setDetailRequest(r)}>{r.id}</button>
              </td>
              <td>{r.sourceChain}</td>
              <td>{r.targetChain}</td>
              <td>{r.asset}</td>
              <td style={{ fontWeight: 700, color: "var(--accent-blue)" }}>{r.amount}</td>
              <td style={{ fontFamily: "monospace", fontSize: 12 }}>{r.sender}</td>
              <td><span className={"status-badge " + r.status}>{r.status === "completed" ? "已完成" : r.status === "processing" ? "处理中" : r.status === "pending" ? "待处理" : "失败"}</span></td>
              <td style={{ fontSize: 12, whiteSpace: "nowrap" }}>{r.timestamp}</td>
              <td>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <button className="btn-table btn-table-blue" onClick={() => setDetailRequest(r)}>详情</button>
                  {r.status === "pending" && (
                    <button className="btn-table btn-table-blue" onClick={() => handleStatusChange(r.id, "processing")}>开始处理</button>
                  )}
                  {r.status === "processing" && (
                    <button className="btn-table btn-table-green" onClick={() => handleStatusChange(r.id, "completed")}>标记完成</button>
                  )}
                  {r.status === "failed" && (
                    <button className="btn-table btn-table-yellow" onClick={() => handleStatusChange(r.id, "pending")}>重试</button>
                  )}
                  {(r.status === "completed" || r.status === "processing") && (
                    <button className="btn-table btn-table-red" onClick={() => handleStatusChange(r.id, "failed")}>标记失败</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}>
        {requests.length === 0 ? "当前筛选条件下无数据" : "共 " + requests.length + " 条记录"}
      </div>
      {showCreate && (
        <CreateRequestModal
          onClose={() => setShowCreate(false)}
          onCreate={() => { onRefresh(); loadData(); }}
        />
      )}
      {detailRequest && (
        <RequestDetailModal
          request={detailRequest}
          onClose={() => setDetailRequest(null)}
        />
      )}
    </div>
  );
}

function ValidatorsTab({ refreshKey, onRefresh }) {
  const [validators, setValidators] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    getValidators(filter)
      .then(setValidators)
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { loadData(); }, [loadData, refreshKey]);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateValidator(id, { status: newStatus }).then(() => loadData());
  };

  if (loading) return <div className="loading">Loading validators...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <button className="btn btn-sm btn-secondary" onClick={() => { onRefresh(); loadData(); }}>刷新</button>
        <ExportButton data={validators} filename="validators.csv" label="CSV" />
      </div>
      <div className="tabs">
        <button className={"tab " + (filter === "all" ? "active" : "")} onClick={() => setFilter("all")}>全部</button>
        <button className={"tab " + (filter === "active" ? "active" : "")} onClick={() => setFilter("active")}>活跃</button>
        <button className={"tab " + (filter === "inactive" ? "active" : "")} onClick={() => setFilter("inactive")}>非活跃</button>
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
                <button
                  className={"btn-table " + (v.status === "active" ? "btn-table-red" : "btn-table-green")}
                  onClick={() => toggleStatus(v.id, v.status)}
                >
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

function FundFlowsTab({ refreshKey, onRefresh }) {
  const [funds, setFunds] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFunds(filter)
      .then(setFunds)
      .finally(() => setLoading(false));
  }, [filter, refreshKey]);

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
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <button className="btn btn-sm btn-secondary" onClick={() => onRefresh()}>刷新</button>
        <ExportButton data={funds} filename="fund-flows.csv" label="CSV" />
      </div>
      <div className="tabs">
        {categories.map(c => (
          <button key={c.key} className={"tab " + (filter === c.key ? "active" : "")} onClick={() => setFilter(c.key)}>
            {c.label}
          </button>
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
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

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
        <div style={{ marginTop: 8 }}>
          <Link href="/" className="btn btn-sm btn-secondary">
            返回方案展示
          </Link>
        </div>
      </div>
      <div className="tabs">
        {tabs.map(t => (
          <button key={t.key} className={"tab " + (activeTab === t.key ? "active" : "")} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      {activeTab === "dashboard" && (
        <div>
          <RefreshButton onClick={handleRefresh} />
          <DashboardTab refreshKey={refreshKey} />
        </div>
      )}
      {activeTab === "requests" && <BridgeRequestsTab refreshKey={refreshKey} onRefresh={handleRefresh} />}
      {activeTab === "validators" && <ValidatorsTab refreshKey={refreshKey} onRefresh={handleRefresh} />}
      {activeTab === "funds" && <FundFlowsTab refreshKey={refreshKey} onRefresh={handleRefresh} />}
    </div>
  );
}
