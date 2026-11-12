/* =====================================================================
 * PMP 制造协同平台 · UI Demo 渲染器
 * 元数据驱动：页面定义来自 assets/data.js，本文件负责路由、权限、渲染与交互
 * 设计依据：《系统整合架构设计方案-V1.0.md》
 * ===================================================================== */
(function () {
  'use strict';

  const PMP = window.PMP || { ROLES: [], MENU: [], PAGES: {}, CAPABILITIES: [] };
  const ROLES = PMP.ROLES, MENU = PMP.MENU, PAGES = PMP.PAGES, CAPABILITIES = PMP.CAPABILITIES || [];
  const ALL = '';
  const roleMap = {};
  ROLES.forEach(r => { roleMap[r.id] = r; });

  const state = { role: 'admin', loginRole: 'admin', page: 'workbench', tab: {}, open: {}, q: {}, rows: {}, cols: {}, pageNo: {} };

  const TAG = {
    '启用': 'success', '生效': 'success', '已完成': 'success', '正常': 'success', '通过': 'success', '已签收': 'success', '在线': 'success', '成功': 'success', '已确认': 'success', '合格': 'success', '已发布': 'success', '已修复': 'success', '已结清': 'muted',
    '待审批': 'warning', '待处理': 'warning', '待确认': 'warning', '进行中': 'info', '待收货': 'info', '待发货': 'info', '待分配': 'info', '运行中': 'info', '处理中': 'info', '待对账': 'warning', '待审核': 'warning', '待检': 'warning', '考察': 'warning', '预警': 'warning', '执行中': 'info', '运输中': 'info', '生产中': 'warning', '已下达': 'info', '已审核': 'info', '已入库': 'info', '已出库': 'info', '已发货': 'info', '部分收货': 'info', '已确认': 'info', '已验真': 'success',
    '停用': 'muted', '草稿': 'muted', '已取消': 'muted', '驳回': 'danger', '异常': 'danger', '超时': 'danger', '缺货': 'danger', '离线': 'muted', '失败': 'danger', '待整改': 'danger', '冻结': 'danger', '逾期': 'danger', '超载': 'danger', '不合格': 'danger', '已回滚': 'danger'
  };

  const COLORS = ['#2563eb', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981'];

  const MOD_RULES = {
    '工作台': '跨域聚合只读视图：待办来自统一 BPM，消息来自通知中心，指标取自指标平台；工作台不产生业务数据，只做入口与提醒。',
    '研发协同': 'EBOM、工艺路线与图纸由 PLM 维护；物料临时码经审批后由 ERP 正式建档并回写正式编码；ECN 审批生效后经消息总线分发至 ERP、MES、WMS，并校验在途工单。',
    '计划': '需求预测 → S&OP 共识 → 主生产计划 → 补货/产能平衡；计划结果以 ERP 为供需存运归集中心，向采购、生产、仓储分发，实际执行数据按日回传修正。',
    '采购': '采购申请经预算校验转采购订单，订单审批后推送 SRM；供应商发货通知（ASN）驱动 WMS 收货，收货、发票与订单三单匹配后进入应付。供应商编码由 SRM 生成、ERP 订阅。',
    '生产': '工单由 ERP 下达，MES 执行派工、报工与质量检验；完工与物料消耗实时回写 ERP，批次/序列号全程留痕，异常经安灯升级。',
    '仓储': '出入库指令由 ERP/OMS 下发，WMS 执行并回传实绩；库存数量以 WMS 实物为准回写，可售库存由履约域计算；退货不良品进入隔离库，不进入可用库存。',
    '履约': '多渠道订单进入订单池，完成信用、价格与库存校验后分单并锁定可售库存；OMS 向 WMS 下发出库指令、向 TMS 下发运输任务，状态与签收回传 CRM。',
    '物流': '运输任务由发货单生成，TMS 指派承运商并采集在途轨迹；运费对账经逐笔匹配后回传 ERP，是物流成本与应付的唯一入口。',
    '客户': '客户编码按渠道形态二选一（B2B 取 ERP、B2C 取 CRM/CDP），信用额度由 ERP 授信、CRM/OMS 只消费校验结果，禁止多头建档。',
    '财务协同': '业务单据经三单匹配生成应收应付，发票与金税系统对接验真；结算与付款排程回写 ERP 凭证，实现业务单据与财务凭证双向可追溯。',
    '数据': 'ODS→DWD→DWS→ADS 分层加工，指标口径统一由指标平台注册并评审；数据质量规则按字段稽核，问题生成工单闭环，数据服务以 API 形式对外复用。',
    '公共能力': '六件套底座：IAM 统一认证与权限、MDM 主数据唯一权威源、API 网关统一接入、消息总线异步解耦、可观测全链路追踪、CI/CD 标准化交付；业务系统只订阅公共能力，不重复建设。',
    '运维管控': '生产变更只经 GitOps 与合并请求触发，发布采用金丝雀/蓝绿并支持一键回滚；监控按 SLO 与错误预算管理，配置与密钥集中托管、动态注入并按周期轮换。',
    '系统管理': '组织/人员以统一身份平台为源（无平台时取 ERP），菜单与按钮权限按角色+数据范围配置；字典与参数变更需审批并通知订阅系统。',
    '帮助与异常': '统一异常状态与空数据规范：403/404/500/维护/断网均给出明确原因与下一步操作，异常自动上报可观测平台并关联 Trace ID。'
  };

  /* ---------------- 基础工具 ---------------- */
  const $ = sel => document.querySelector(sel);
  const esc = v => String(v == null ? '' : v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = n => (n < 10 ? '0' + n : '' + n);
  const can = (roles, role) => {
    if (!roles) return true;
    if (typeof roles === 'string') roles = [roles];
    if (!Array.isArray(roles)) return true;
    if (roles.includes(ALL)) return true;
    if (role === 'admin') return true;
    return roles.includes(role);
  };
  const roleName = id => (roleMap[id] ? roleMap[id].name : id);
  const rolesText = roles => {
    if (!roles) return '页面可见角色';
    if (typeof roles === 'string') return roleName(roles);
    return roles.includes(ALL) ? '全部登录用户' : roles.map(roleName).join('、');
  };
  const tagClass = (v, map) => (map && map[v]) || TAG[v] || 'muted';

  function toast(msg) {
    const wrap = $('#toast-root');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }

  const go = id => {
    if (('#' + '/' + id) === location.hash) return render();
    location.hash = '#/' + id;
  };

  /* ---------------- 路由 ---------------- */
  function currentPage() { return PAGES[state.page] || null; }

  function route() {
    closeDrawer();
    const raw = (location.hash || '').replace(/^#\/?/, '');
    if (raw === 'login') { state.page = 'login'; return render(); }
    if (!raw) { state.page = 'workbench'; return render(); }
    state.page = PAGES[raw] ? raw : '__404';
    render();
  }

  /* ---------------- 整体骨架 ---------------- */
  function render() {
    const app = $('#app');
    if (state.page === 'login') { app.innerHTML = loginHTML(); return; }
    const p = currentPage();
    app.innerHTML = shellHTML(p);
    const content = $('#content');
    content.innerHTML = contentHTML(p);
    const active = document.querySelector('.nav-item.active');
    if (active && !state._scrolled) {
      state._scrolled = true;
      try { active.scrollIntoView({ block: 'center' }); } catch (e) { /* noop */ }
    }
  }

  function shellHTML(p) {
    const mod = p ? p.mod : '异常';
    const title = p ? p.title : '页面不存在';
    return `
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-logo">PMP</div>
          <div>
            <div class="brand-name">制造协同平台</div>
            <div class="brand-sub">MANUFACTURING PLATFORM</div>
          </div>
        </div>
        <nav class="nav">${navHTML()}</nav>
        <div class="sidebar-foot">UI Demo v1.0 · 共 ${Object.keys(PAGES).length} 个页面<br>基准分辨率 1920×1080 · 演示数据</div>
      </aside>
      <div class="main">
        <header class="topbar">
          <div class="breadcrumb">${esc(mod)}<span>/</span><b>${esc(title)}</b></div>
          <div class="topbar-spacer"></div>
          <div class="global-search"><span>⌕</span><input id="topSearch" placeholder="搜索页面、单据、主数据" autocomplete="off"><kbd>Ctrl K</kbd></div>
          <select class="role-select" id="roleSelect" title="切换角色视角">
            ${ROLES.map(r => `<option value="${r.id}" ${r.id === state.role ? 'selected' : ''}>${r.name}</option>`).join('')}
          </select>
          <button class="icon-btn" data-nav="message" title="消息中心">⚑<span class="dot"></span></button>
          <button class="icon-btn" data-doc title="当前页面说明">?</button>
          <div class="user-chip" data-nav="profile" title="个人中心">
            <div class="avatar">张</div>
            <div class="user-meta"><b>张工</b><span>${roleName(state.role)}</span></div>
          </div>
        </header>
        <main class="content" id="content"></main>
      </div>
    </div>`;
  }

  function navHTML() {
    return MENU.map(group => {
      const items = group.items.filter(it => PAGES[it[0]] && can(PAGES[it[0]].roles, state.role));
      if (!items.length) return '';
      const open = state.open[group.g] !== false;
      const rows = items.map(it => {
        const page = PAGES[it[0]];
        const ico = ({ workbench: '◈', dashboard: '▤', monitor: '◉', search: '⌕', profile: '☺', error: '!' }[page.type]) || '▪';
        return `<a class="nav-item ${state.page === it[0] ? 'active' : ''}" href="#/${it[0]}">
          <span class="nav-icon">${ico}</span>
          <span>${it[1]}</span>${it[2] ? `<span class="nav-badge">${it[2]}</span>` : ''}
        </a>`;
      }).join('');
      return `<div class="nav-group">
        <div class="nav-group-title" data-group="${esc(group.g)}" style="cursor:pointer;display:flex;align-items:center;gap:6px">
          <span>${group.icon}</span><span style="flex:1">${esc(group.g)}</span><span style="font-size:10px">${open ? '▾' : '▸'}</span>
        </div>
        <div style="display:${open ? 'block' : 'none'}">${rows}</div>
      </div>`;
    }).join('');
  }

  /* ---------------- 内容分发 ---------------- */
  function contentHTML(p) {
    if (state.page === '__404' || !p) {
      return headHTML({ mod: '异常', title: '页面不存在', desc: '地址可能已变更或页面已下线。', jump: [], actions: [], roles: [ALL] }) +
        errorState('404', '页面不存在', '请检查访问地址，或返回工作台重新进入。', true);
    }
    if (!can(p.roles, state.role)) return forbiddenHTML(p);
    switch (p.type) {
      case 'workbench': return workbenchHTML(p);
      case 'dashboard': return dashboardHTML(p);
      case 'monitor': return dashboardHTML(p);
      case 'search': return searchHTML(p);
      case 'profile': return profileHTML(p);
      case 'error': return errorPageHTML(p);
      default: return listHTML(p);
    }
  }

  function headHTML(p, withActions) {
    const acts = (p.actions || []).filter(a => can(a[2], state.role));
    const btns = withActions === false ? '' : acts.map((a, i) =>
      `<button class="btn ${i === 0 ? 'primary' : ''}" data-act="${esc(a[0])}" data-label="${esc(a[1])}">${esc(a[1])}</button>`).join('');
    return `
    <div class="page-head">
      <div class="page-head-main">
        <div class="page-title">${esc(p.title)}<span class="page-module">${esc(p.mod)}</span></div>
        <div class="page-desc">${esc(p.desc)}</div>
        ${jumpHTML(p)}
      </div>
      <div class="page-actions">
        ${btns}
        <button class="btn ghost" data-doc>ⓘ 页面说明</button>
      </div>
    </div>`;
  }

  function jumpHTML(p) {
    const jumps = (p.jump || []).filter(j => PAGES[j[1]] && can(PAGES[j[1]].roles, state.role));
    if (!jumps.length) return '';
    return `<div class="quick-links"><span class="muted">关键路径：</span>${jumps.map(j =>
      `<a href="#/${j[1]}">${esc(j[0])} →</a>`).join('')}</div>`;
  }

  function kpiHTML(kpis) {
    if (!kpis || !kpis.length) return '';
    return `<div class="kpi-grid">${kpis.map(k => {
      const trend = k[2] || '';
      const cls = /\+|提升|上升/.test(trend) ? 'up' : /-|下降|超|逾期/.test(trend) ? 'down' : '';
      return `<div class="kpi">
        <div class="kpi-label">${esc(k[0])}</div>
        <div class="kpi-value">${esc(k[1])}</div>
        <div class="kpi-trend ${cls}">${esc(trend)}</div>
      </div>`;
    }).join('')}</div>`;
  }

  function flowHTML(flow) {
    if (!flow) return '';
    const cur = flow.current || 0;
    return `<div class="flow-banner">
      <div class="steps">${flow.steps.map((s, i) => {
        const cls = i < cur ? 'done' : i === cur ? 'current' : '';
        return `<div class="step ${cls}"><span class="step-dot">${i < cur ? '✓' : i + 1}</span>${esc(s)}</div>${i < flow.steps.length - 1 ? '<div class="step-line"></div>' : ''}`;
      }).join('')}</div>
      <span class="tag primary">当前：${esc(flow.steps[cur] || '')}</span>
    </div>`;
  }

  function workbenchHTML(p) {
    const hour = new Date().getHours();
    const greet = hour < 6 ? '凌晨好' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好';
    const d = new Date();
    const week = '日一二三四五六'[d.getDay()];
    return headHTML(p) + `
    <div class="welcome">
      <div>
        <h2>${greet}，张工（${roleName(state.role)}）</h2>
        <p>${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} 星期${week} · 今日 12 项待办、8 条未读消息，3 条异常需关注</p>
      </div>
      <div class="welcome-actions">
        <button class="btn" data-nav="todo">处理待办</button>
        <button class="btn" data-nav="dashboard">查看驾驶舱</button>
      </div>
    </div>
    ${kpiHTML(p.kpis)}
    <div class="two-col">
      <div class="card">
        <div class="card-head"><h3>我的待办</h3><span class="sub">按紧急度排序</span><span style="margin-left:auto"><a href="#/todo">查看全部 →</a></span></div>
        <div class="card-body list-simple">
          ${(p.todos || []).map(t => `<div class="list-row">
            <span class="tag ${t[3]}">${esc(t[1])}</span>
            <span class="grow">${esc(t[0])}</span>
            <span class="time">${esc(t[2])}</span>
            <a href="#/todo">办理</a>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>通知公告</h3><span class="sub">系统与制度</span></div>
        <div class="card-body list-simple">
          ${(p.notices || []).map(n => `<div class="list-row"><span class="grow">${esc(n[0])}</span><span class="time">${esc(n[1])}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card mt16">
      <div class="card-head"><h3>快捷入口</h3><span class="sub">常用业务动作</span></div>
      <div class="card-body">
        <div class="quick-grid">
          ${(p.quicks || []).map(q => `<div class="quick" data-nav="${q[1]}">
            <i>${esc(q[2])}</i><b>${esc(q[0])}</b><span>进入 ${esc((PAGES[q[1]] || {}).title || q[1])}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  }

  function dashboardHTML(p) {
    return headHTML(p) + kpiHTML(p.kpis) + chartsHTML(p) + tableCard(p, '数据明细');
  }

  function listHTML(p) {
    return headHTML(p) + flowHTML(p.flow) + kpiHTML(p.kpis) + chartsHTML(p) + (p.map ? mapHTML(p.map) : '') + tableCard(p, '数据列表');
  }

  /* ---------------- 图表 ---------------- */
  function chartsHTML(p) {
    const charts = p.charts || (p.chart ? [p.chart] : []);
    if (!charts.length) return '';
    if (charts.length === 1) return `<div class="chart-grid" style="grid-template-columns:1fr">${chartCard(charts[0])}</div>`;
    return `<div class="chart-grid ${charts.length >= 3 ? 'three' : ''}">${charts.map(chartCard).join('')}</div>`;
  }

  function chartCard(c) {
    return `<div class="chart-card"><h4>${esc(c.title || '')}</h4><div class="sub">${esc(c.sub || '')}</div>${chartBody(c)}</div>`;
  }

  function chartBody(c) {
    if (c.type === 'donut') {
      const items = c.items || [];
      return `<div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap">
        ${donutSVG(items)}
        <div class="legend" style="flex-direction:column;gap:7px;margin-top:0">
          ${items.map((it, i) => `<span><i style="background:${it[2] || COLORS[i % COLORS.length]}"></i>${esc(it[0])} <b style="margin-left:6px;color:#0f172a">${it[1]}%</b></span>`).join('')}
        </div>
      </div>`;
    }
    if (c.type === 'bar') return barSVG(c);
    return lineSVG(c);
  }

  function lineSVG(c) {
    const W = 760, H = 250, L = 52, T = 18, B = 34;
    const labels = c.labels || [], series = c.series || [];
    const maxes = series.map(s => Math.max.apply(null, s[1].concat([1])));
    const dual = series.length === 2 && Math.max.apply(null, maxes) / Math.max(1, Math.min.apply(null, maxes)) > 5;
    const R = dual ? 50 : 18;
    const iw = W - L - R, ih = H - T - B;
    const topL = Math.ceil((maxes[0] * 1.15) / 10) * 10;
    const topR = dual ? Math.ceil((maxes[1] * 1.12) / 10) * 10 : topL;
    const x = i => L + (labels.length <= 1 ? iw / 2 : iw * i / (labels.length - 1));
    const yFor = (v, si) => T + ih * (1 - v / (dual && si === 1 ? topR : topL));
    const grid = [0, .25, .5, .75, 1].map(t => {
      const gy = T + ih * t;
      const right = dual ? `<text x="${W - R + 14}" y="${gy + 4}" font-size="10" fill="${series[1][2] || COLORS[1]}">${Math.round(topR * (1 - t))}</text>` : '';
      return `<line x1="${L}" y1="${gy}" x2="${W - R}" y2="${gy}" stroke="#eef2f7"/>
        <text x="${L - 8}" y="${gy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${Math.round(topL * (1 - t))}</text>${right}`;
    }).join('');
    const xlab = labels.map((l, i) => `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="10" fill="#94a3b8">${esc(l)}</text>`).join('');
    const lines = series.map((s, si) => {
      const color = s[2] || COLORS[si % COLORS.length];
      const pts = s[1].map((v, i) => `${x(i).toFixed(1)},${yFor(v, si).toFixed(1)}`).join(' ');
      const dots = s[1].map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${yFor(v, si).toFixed(1)}" r="2.6" fill="#fff" stroke="${color}" stroke-width="1.8"/>`).join('');
      return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>${dots}`;
    }).join('');
    const legend = series.map((s, si) => `<span><i style="background:${s[2] || COLORS[si % COLORS.length]}"></i>${esc(s[0])}${dual && si === 1 ? '（右轴）' : ''}</span>`).join('');
    return `<svg class="chart-svg" viewBox="0 0 ${W} ${H}">${grid}${xlab}${lines}</svg><div class="legend">${legend}</div>`;
  }

  function barSVG(c) {
    const W = 760, H = 250, L = 48, R = 18, T = 26, B = 40;
    const data = c.data || [], labels = c.labels || [];
    const iw = W - L - R, ih = H - T - B;
    const max = Math.max(1, ...data) * 1.15;
    const step = iw / Math.max(1, data.length);
    const bw = Math.min(64, step * .52);
    const bars = data.map((v, i) => {
      const cx = L + step * i + step / 2;
      const h = ih * v / max;
      const y = T + ih - h;
      return `<rect x="${cx - bw / 2}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${c.color || COLORS[0]}" opacity=".92"/>
        <text x="${cx}" y="${y - 6}" text-anchor="middle" font-size="10" fill="#475569">${v}</text>
        <text x="${cx}" y="${H - 12}" text-anchor="middle" font-size="10" fill="#94a3b8">${esc(labels[i] || '')}</text>`;
    }).join('');
    const grid = [0, .5, 1].map(t => {
      const gy = T + ih * t;
      return `<line x1="${L}" y1="${gy}" x2="${W - R}" y2="${gy}" stroke="#eef2f7"/>`;
    }).join('');
    return `<svg class="chart-svg" viewBox="0 0 ${W} ${H}">${grid}${bars}</svg>`;
  }

  function donutSVG(items) {
    const R = 60, C = 2 * Math.PI * R;
    const total = items.reduce((s, i) => s + i[1], 0) || 1;
    let off = 0;
    const segs = items.map((it, i) => {
      const len = C * it[1] / total;
      const seg = `<circle cx="90" cy="90" r="${R}" fill="none" stroke="${it[2] || COLORS[i % COLORS.length]}" stroke-width="20" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 90 90)"/>`;
      off += len;
      return seg;
    }).join('');
    return `<svg viewBox="0 0 180 180" style="width:180px;height:180px;flex:0 0 180px">
      ${segs}
      <text x="90" y="86" text-anchor="middle" font-size="11" fill="#64748b">合计</text>
      <text x="90" y="108" text-anchor="middle" font-size="20" font-weight="700" fill="#0f172a">100%</text>
    </svg>`;
  }

  function mapHTML(label) {
    const cities = [['上海工厂', 90, 150], ['嘉兴中转', 340, 96], ['杭州仓', 590, 132], ['宁波客户', 900, 88]];
    return `<div class="card" style="margin-bottom:16px"><div class="map-wrap">
      <span class="map-badge">${esc(label)}</span>
      <svg viewBox="0 0 1000 220">
        ${[40, 80, 120, 160, 200].map(y => `<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="#e6eefb" stroke-dasharray="4 6"/>`).join('')}
        ${[100, 250, 400, 550, 700, 850].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="220" stroke="#e6eefb" stroke-dasharray="4 6"/>`).join('')}
        <path d="M90 150 C 210 70 280 70 340 96 S 500 150 590 132 S 780 60 900 88" fill="none" stroke="#bfdbfe" stroke-width="10" stroke-linecap="round"/>
        <path d="M90 150 C 210 70 280 70 340 96 S 500 150 590 132 S 780 60 900 88" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="7 7" stroke-linecap="round"/>
        ${cities.map((c, i) => `<g>
          <circle cx="${c[1]}" cy="${c[2]}" r="10" fill="#dbeafe"/>
          <circle cx="${c[1]}" cy="${c[2]}" r="5" fill="${i === 3 ? '#16a34a' : '#2563eb'}"/>
          <text x="${c[1]}" y="${c[2] - 18}" text-anchor="middle" font-size="12" fill="#0f172a" font-weight="600">${c[0]}</text>
        </g>`).join('')}
        <text x="470" y="196" text-anchor="middle" font-size="11" fill="#64748b">华东干线 · 在途 12 车 · 平均时效 6.5 小时 · 异常 1 单</text>
      </svg>
    </div></div>`;
  }

  /* ---------------- 表格 ---------------- */
  function makeRows(sample, count) {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      let row = typeof sample === 'function' ? sample(i) : Object.assign({}, sample);
      rows.push(fill(row, i));
    }
    return rows;
  }

  function fill(v, n) {
    if (typeof v === 'string') return v.replace(/\{nn\}/g, pad(n)).replace(/\{n\}/g, String(n));
    if (Array.isArray(v)) return v.map(x => fill(x, n));
    if (v && typeof v === 'object') { const o = {}; Object.keys(v).forEach(k => { o[k] = fill(v[k], n); }); return o; }
    return v;
  }

  function filterRows(rows, id) {
    const q = state.q[id];
    if (!q || (!q.t.length && !q.s.length)) return rows;
    return rows.filter(r => {
      const vals = Object.keys(r).map(k => String(r[k]));
      if (q.t.length && !q.t.every(t => vals.some(v => v.indexOf(t) >= 0))) return false;
      if (q.s.length && !q.s.every(s => vals.some(v => v === s))) return false;
      return true;
    });
  }

  function filtersHTML(p) {
    if (!p.filters) return '';
    const saved = state.q[p.id] || { t: [], s: [] };
    const fields = p.filters.map((f, i) => {
      if (typeof f === 'string' || Array.isArray(f)) {
        const label = Array.isArray(f) ? f[1] : f;
        return `<div class="filter"><label>${esc(label)}</label><input data-fk="t${i}" value="${esc(saved['t' + i] || '')}" placeholder="请输入${esc(label)}"></div>`;
      }
      return `<div class="filter"><label>${esc(f.l)}</label><select data-fk="s${i}">
        <option value="">全部</option>
        ${f.o.filter(o => o !== '全部').map(o => `<option ${saved['s' + i] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}
      </select></div>`;
    }).join('');
    return `<div class="filters" id="filters-${p.id}">${fields}
      <div class="filter-actions">
        <button class="btn primary" data-filter="apply">查询</button>
        <button class="btn" data-filter="reset">重置</button>
      </div></div>`;
  }

  function cellHTML(row, col, idx) {
    const key = col[0], label = col[1], kind = col[3], map = col[4];
    let v = row[key];
    if (v == null || v === '') {
      if (key === 'progress') {
        const pct = 28 + (idx % 8) * 8;
        return `<div class="progress" style="width:92px"><i style="width:${pct}%"></i></div>`;
      }
      v = '—';
    }
    if (kind === 'tag') return `<span class="tag ${tagClass(v, map)}">${esc(v)}</span>`;
    if (kind === 'mono' || kind === 'num') return `<span class="mono">${esc(v)}</span>`;
    return esc(v);
  }

  function tableHTML(p, rows, cols) {
    const rowActs = (p.rowActions || []).filter(a => can(a[2], state.role));
    if (!cols || !cols.length) return `<div class="center muted" style="padding:38px">该页面为配置型视图，暂无表格字段</div>`;
    const head = cols.map(c => `<th${c[2] ? ` style="width:${c[2]}px"` : ''}>${esc(c[1])}</th>`).join('');
    const body = rows.length ? rows.map((r, ri) => {
      const tds = cols.map((c, ci) => `<td${ci === 0 ? ' class="td-main"' : ''}>${cellHTML(r, c, ri)}</td>`).join('');
      const acts = rowActs.length ? `<td><div class="actions-cell">${rowActs.map(a =>
        `<button class="link-btn ${/delete|disable|freeze|offline|close|reject/.test(a[0]) ? 'danger' : ''}" data-row="${ri}" data-key="${esc(a[0])}" data-label="${esc(a[1])}">${esc(a[1])}</button>`).join('')}</div></td>` : '<td class="muted">—</td>';
      return `<tr>${tds}${acts}</tr>`;
    }).join('') : `<tr><td colspan="${cols.length + 2}" class="center muted" style="padding:44px">暂无符合条件的数据，可调整筛选条件或新建记录</td></tr>`;
    return `<div class="table-wrap"><table>
      <thead><tr><th style="width:34px"><input type="checkbox" title="全选"></th>${head}<th style="white-space:nowrap;min-width:120px">操作</th></tr></thead>
      <tbody>${body}</tbody>
    </table></div>`;
  }

  function pagerHTML(p) {
    const cur = state.pageNo[p.id] || 1;
    return `<div class="table-foot">
      <span>共 128 条 · 每页 8 条 · 当前第 ${cur} 页 · 演示数据</span>
      <div class="pager">
        <button data-page="prev">‹</button>
        ${[1, 2, 3, 4, 5].map(n => `<button data-page="${n}" class="${n === cur ? 'active' : ''}">${n}</button>`).join('')}
        <button data-page="next">›</button>
      </div>
    </div>`;
  }

  function tableCard(p, title) {
    let def = p, cols = p.cols, sample = p.sample, tabs = '';
    if (p.tabs && p.tabs.length) {
      let idx = state.tab[p.id] || 0;
      if (idx >= p.tabs.length) idx = 0;
      state.tab[p.id] = idx;
      def = p.tabs[idx];
      cols = def.cols; sample = def.sample;
      tabs = `<div class="tabs">${p.tabs.map((t, i) =>
        `<button class="tab ${i === idx ? 'active' : ''}" data-tab="${i}">${esc(t.name)}</button>`).join('')}</div>`;
    }
    const all = makeRows(sample, p.rows || 8);
    const rows = filterRows(all, p.id);
    state.rows[p.id] = rows;
    state.cols[p.id] = cols;
    return `<div class="card" style="overflow:hidden">
      ${tabs}
      ${filtersHTML(p)}
      <div class="card-head" style="border-bottom:1px solid var(--border-2)">
        <h3>${esc(title)}</h3><span class="sub">${esc(def.name || p.title)}</span>
        <span style="margin-left:auto;font-size:11px;color:var(--muted)">数据范围：${roleName(state.role)}可见</span>
      </div>
      ${tableHTML(p, rows, cols)}
      ${pagerHTML(p)}
    </div>`;
  }

  /* ---------------- 搜索 / 个人中心 / 异常 ---------------- */
  function searchHTML(p) {
    const q = state.q.search || '';
    const list = Object.values(PAGES).filter(x => can(x.roles, state.role)).filter(x =>
      !q || (x.title + x.desc + x.mod + x.id).toLowerCase().indexOf(q.toLowerCase()) >= 0);
    const groups = {};
    list.forEach(x => { (groups[x.mod] = groups[x.mod] || []).push(x); });
    const hot = ['采购订单', '库存', 'BOM', '主数据', '接口台账'];
    return headHTML(p) + `
    <div class="card" style="padding:22px;margin-bottom:16px">
      <div class="search-hero">
        <span class="search-ico">⌕</span>
        <input id="bigSearch" value="${esc(q)}" placeholder="搜索页面、单据、主数据，支持 Ctrl+K 唤起">
        <button class="btn primary" data-search-go>搜索</button>
      </div>
      <div class="quick-links" style="margin-top:12px"><span class="muted">热门搜索：</span>
        ${hot.map(h => `<a href="javascript:void(0)" data-hot="${esc(h)}">${esc(h)}</a>`).join('')}
      </div>
      <div class="note" style="margin:14px 0 0">搜索覆盖 12 类对象：页面、采购/销售订单、出入库单、工单、BOM、物料/供应商/客户主数据、接口、指标与审计日志。索引延迟 &lt; 5s。</div>
    </div>
    <div class="card">
      <div class="card-head"><h3>搜索结果</h3><span class="sub">匹配 ${list.length} 个页面${q ? ' · 关键字“' + esc(q) + '”' : ''}</span></div>
      <div class="card-body list-simple">
        ${list.length ? Object.keys(groups).map(mod => `
          <div class="section-title" style="margin-top:12px">${esc(mod)}</div>
          ${groups[mod].map(x => `<div class="result-row" data-nav="${x.id}">
            <span class="tag primary">${esc(mod)}</span>
            <div class="grow"><b>${esc(x.title)}</b><span>${esc(x.desc)}</span></div>
            <span class="mono muted">#/${x.id}</span>
          </div>`).join('')}
        `).join('') : '<div class="center muted" style="padding:40px">未找到匹配内容，试试“采购”“库存”“BOM”</div>'}
      </div>
    </div>`;
  }

  function profileHTML(p) {
    return headHTML(p) + `
    <div class="card profile-head">
      <div class="avatar" style="width:64px;height:64px;font-size:22px">张</div>
      <div style="flex:1">
        <div class="page-title" style="font-size:18px">张工 <span class="tag success">在职</span></div>
        <div class="page-desc">研发中心 · 研发工程师 · 工号 EMP-2026-0186 · 账号 zhang.gong</div>
        <div class="quick-links"><span class="muted">当前视角：</span><span class="pill">${roleName(state.role)}</span><span class="pill">统一身份平台同步</span><span class="pill">最近登录 2026-11-11 09:12</span></div>
      </div>
      <div class="page-actions">
        <button class="btn" data-submit="个人资料已保存">编辑资料</button>
        <button class="btn primary" data-nav="iam">权限申请</button>
      </div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-head"><h3>安全设置</h3><span class="sub">由统一 IAM 托管</span></div>
        <div class="card-body list-simple">
          ${[['登录密码', '上次修改 2026-09-12', '修改'],
            ['多因素认证（MFA）', '已开启 · 企业微信动态码', '管理'],
            ['单点登录（SSO）', '已接入 OIDC · 全部 14 个应用', '查看'],
            ['API 访问令牌', '2 个有效令牌 · 最近使用 3 天前', '管理']].map(r =>
            `<div class="list-row"><div class="grow"><b>${r[0]}</b><div class="muted" style="font-size:11px">${r[1]}</div></div><button class="btn sm" data-submit="${r[0]}设置已更新">${r[2]}</button></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>通知偏好</h3><span class="sub">站内信 / 邮件 / 企业 IM</span></div>
        <div class="card-body list-simple">
          ${[['审批待办', true], ['交期与库存预警', true], ['质量与安灯异常', true], ['系统维护通知', true], ['运营周报', false]].map(r =>
            `<div class="list-row"><span class="grow">${r[0]}</span><span class="tag ${r[1] ? 'success' : 'muted'}">${r[1] ? '已开启' : '已关闭'}</span><button class="btn sm" data-submit="通知偏好已更新">调整</button></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card mt16">
      <div class="card-head"><h3>登录设备</h3><span class="sub">异常登录将被拦截并通知</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>设备</th><th>浏览器</th><th>IP</th><th>地点</th><th>最近活跃</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          <tr><td class="td-main">MacBook Pro</td><td>Chrome 130</td><td class="mono">10.20.3.86</td><td>上海</td><td>2026-11-11 09:12</td><td><span class="tag success">当前设备</span></td><td><span class="muted">—</span></td></tr>
          <tr><td class="td-main">Windows 11</td><td>Edge 130</td><td class="mono">10.20.4.21</td><td>苏州</td><td>2026-11-10 18:40</td><td><span class="tag info">正常</span></td><td><button class="link-btn danger" data-submit="设备已下线">下线</button></td></tr>
          <tr><td class="td-main">iPhone 15</td><td>企业微信内置</td><td class="mono">172.16.8.9</td><td>上海</td><td>2026-11-09 08:05</td><td><span class="tag info">正常</span></td><td><button class="link-btn danger" data-submit="设备已下线">下线</button></td></tr>
        </tbody>
      </table></div>
    </div>`;
  }

  function errorPageHTML(p) {
    return headHTML(p) + `
    <div class="note">以下为统一异常状态设计规范。点击任一状态可查看全屏效果；所有异常均自动上报可观测平台并生成 Trace ID，便于运维定位。</div>
    <div class="error-grid">
      ${(p.states || []).map((s, i) => `<div class="error-card" data-state="${i}">
        <div class="error-code">${esc(s[0])}</div>
        <h4>${esc(s[1])}</h4>
        <p>${esc(s[2])}</p>
        <button class="btn sm" data-state="${i}">查看示例</button>
      </div>`).join('')}
    </div>`;
  }

  function errorState(code, title, desc, withBack) {
    return `<div class="error-state">
      <div class="big">${esc(code)}</div>
      <h2>${esc(title)}</h2>
      <p>${esc(desc)}</p>
      <div style="display:flex;gap:8px">
        ${withBack ? '<button class="btn primary" data-nav="workbench">返回工作台</button>' : ''}
        <button class="btn" data-nav="message">联系管理员</button>
      </div>
    </div>`;
  }

  function forbiddenHTML(p) {
    return `<div class="error-state">
      <div class="big">403</div>
      <h2>无访问权限</h2>
      <p>当前角色「${roleName(state.role)}」无权访问「${esc(p.title)}」。该页面允许的角色：${esc(rolesText(p.roles))}。</p>
      <div style="display:flex;gap:8px">
        <button class="btn primary" data-nav="workbench">返回工作台</button>
        <button class="btn" data-set-role="admin">切换为系统管理员查看</button>
        <button class="btn" data-nav="iam">申请权限</button>
      </div>
    </div>`;
  }

  /* ---------------- 登录 ---------------- */
  function loginHTML() {
    return `<div class="login">
      <div class="login-left">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
          <div class="brand-logo" style="width:38px;height:38px;font-size:14px">PMP</div>
          <div><div style="font-size:15px;font-weight:700;color:#f8fafc">制造协同平台</div><div style="font-size:11px;color:#64748b">MANUFACTURING PLATFORM</div></div>
        </div>
        <h1>一套底座<br>贯通研发、计划、采购、生产、仓储、履约与财务</h1>
        <p>基于云原生组装式架构，统一门户、统一主数据、统一流程、统一集成与统一运维。本 Demo 覆盖 64 个页面，与《系统整合架构设计方案-V1.0》功能清单逐一对应。</p>
        <div class="login-points">
          <div class="login-point"><b>01</b> 六件套公共底座</div>
          <div class="login-point"><b>02</b> 九大业务域协同</div>
          <div class="login-point"><b>03</b> 16 类角色分权</div>
          <div class="login-point"><b>04</b> 全链路数据追溯</div>
        </div>
        <div style="margin-top:40px;font-size:11px;color:#475569">主数据一致率 ≥99.5% · P95 查询 ≤300ms · 发布 ≤10 分钟 · 可用性 99.95%</div>
      </div>
      <div class="login-right">
        <h2>登录工作台</h2>
        <div class="sub">请使用统一身份账号登录，演示环境可任选角色视角</div>
        <div class="login-form">
          <div class="form-item"><label>账号</label><input id="loginAccount" value="zhang.gong"></div>
          <div class="form-item"><label>密码</label><input id="loginPwd" type="password" value="demo1234"></div>
          <div class="form-item"><label>角色视角</label>
            <div class="role-chips">
              ${ROLES.map(r => `<span class="role-chip ${state.loginRole === r.id ? 'active' : ''}" data-login-role="${r.id}" title="${esc(r.desc)}">${r.name}</span>`).join('')}
            </div>
          </div>
          <button class="btn primary" style="height:40px;justify-content:center;margin-top:8px" data-login>登 录</button>
          <div class="login-tip">演示账号已预填，密码不校验。登录后可在右上角随时切换角色，系统管理员可查看全部页面。<br>账号与权限由统一 IAM 托管，支持 SSO / MFA。</div>
        </div>
      </div>
    </div>`;
  }

  /* ---------------- 抽屉 ---------------- */
  function drawer(html, wide) {
    $('#drawer-root').innerHTML = `
      <div class="drawer-mask show" data-close></div>
      <aside class="drawer show ${wide ? 'wide' : ''}">${html}</aside>`;
  }
  function closeDrawer() { $('#drawer-root').innerHTML = ''; }

  function docDrawer(p) {
    const def = p.tabs ? p.tabs[state.tab[p.id] || 0] : p;
    const cols = (def && def.cols) || [];
    let fields = p.fields;
    if (!fields || !fields.length) {
      fields = cols.map(c => [c[1],
        c[3] === 'tag' ? '枚举 / 状态' : c[3] === 'mono' ? '编码 / 只读' : c[3] === 'num' ? '数值（千分位）' : '文本',
        c[3] === 'mono' ? '系统生成，只读' : '页面可见角色可查看']);
    }
    const caps = CAPABILITIES.filter(c => c[1].indexOf(p.id) >= 0).map(c => c[0]);
    const acts = p.actions || [], rowActs = p.rowActions || [];
    const fieldTable = fields.length ? `
      <div class="table-wrap" style="border:1px solid var(--border);border-radius:8px">
        <table><thead><tr><th>字段</th><th>类型 / 规则</th><th>权限 / 来源</th></tr></thead>
        <tbody>${fields.map(f => `<tr><td class="td-main">${esc(f[0])}</td><td>${esc(f[1])}</td><td>${esc(f[2] || '—')}</td></tr>`).join('')}</tbody></table>
      </div>` : `<div class="note">该页为聚合视图，无独立业务字段，数据来自各业务域接口与指标平台。</div>`;

    const actRows = (acts.length || rowActs.length) ? `
      <div class="table-wrap" style="border:1px solid var(--border);border-radius:8px">
        <table><thead><tr><th>操作</th><th>位置</th><th>允许角色</th></tr></thead><tbody>
          ${acts.map(a => `<tr><td class="td-main">${esc(a[1])}</td><td>页面顶部</td><td>${esc(a[2] ? rolesText(a[2]) : '页面可见角色')}</td></tr>`).join('')}
          ${rowActs.map(a => `<tr><td class="td-main">${esc(a[1])}</td><td>行内操作</td><td>${esc(a[2] ? rolesText(a[2]) : '页面可见角色')}</td></tr>`).join('')}
        </tbody></table>
      </div>` : '<div class="note">该页无写操作，仅提供查看与跳转。</div>';

    drawer(`
      <div class="drawer-head"><h3>页面说明 · ${esc(p.title)}</h3><button class="btn sm" data-close>关闭</button></div>
      <div class="drawer-body">
        <div class="section-title">一、页面功能说明</div>
        <dl class="desc-list">
          <dt>页面路由</dt><dd class="mono">#/${p.id}</dd>
          <dt>所属模块</dt><dd>${esc(p.mod)}</dd>
          <dt>页面类型</dt><dd>${typeName(p.type)}</dd>
          <dt>功能说明</dt><dd>${esc(p.desc)}</dd>
          <dt>关联能力</dt><dd>${caps.length ? caps.map(c => `<span class="pill">${esc(c)}</span>`).join('') : '<span class="muted">业务操作页</span>'}</dd>
        </dl>

        <div class="section-title">二、字段定义说明</div>
        ${p.tabs ? `<div class="note">本页含 ${p.tabs.length} 个页签：${p.tabs.map(t => esc(t.name)).join(' / ')}。以下为当前页签字段。</div>` : ''}
        ${fieldTable}

        <div class="section-title">三、操作权限控制</div>
        <dl class="desc-list">
          <dt>页面可见角色</dt><dd>${p.roles.includes(ALL) ? '<span class="pill">全部登录用户</span>' : p.roles.map(r => `<span class="pill">${esc(roleName(r))}</span>`).join('')}</dd>
          <dt>角色说明</dt><dd class="muted">${p.roles.includes(ALL) ? '登录用户均可访问；写操作仍按按钮权限控制。' : p.roles.map(r => roleName(r) + '：' + (roleMap[r] || {}).desc).join('；')}</dd>
          <dt>权限模型</dt><dd>页面级 RBAC + 按钮级 RBAC + 数据范围（本人/本组织/全部）；系统管理员始终拥有全部页面与操作权限。</dd>
        </dl>
        <div class="mt12">${actRows}</div>

        <div class="section-title">四、跳转逻辑与数据流转</div>
        <dl class="desc-list">
          <dt>关键跳转</dt><dd>${(p.jump || []).map(j => `<a href="#/${j[1]}">${esc(j[0])}（#/${j[1]}）</a>`).join('<br>') || '<span class="muted">—</span>'}</dd>
          <dt>业务流</dt><dd>${p.flow ? esc(p.flow.steps.join(' → ')) + `（当前：${esc(p.flow.steps[p.flow.current] || '')}）` : '<span class="muted">无独立审批流，按业务状态流转</span>'}</dd>
          <dt>数据流转规则</dt><dd>${esc(MOD_RULES[p.mod] || '遵循架构方案的主数据权威源与接口台账约束，跨系统调用统一经 API 网关。')}</dd>
        </dl>

        <div class="section-title">五、数据展示与操作规则</div>
        <ul style="font-size:12px;color:var(--text-2);padding-left:18px;line-height:1.9">
          <li>列表默认每页 8 条，支持关键字与枚举条件组合筛选，筛选结果即时回显。</li>
          <li>状态列使用统一色板：绿色=成功/生效，蓝色=进行中，橙色=待处理/预警，红色=异常/驳回，灰色=草稿/停用。</li>
          <li>编码与单号使用等宽字体；金额、数量按数值格式展示。</li>
          <li>删除、停用、冻结、回滚等高风险操作需二次确认，并写入审计日志（留存 ≥180 天）。</li>
          <li>字段取值以主数据权威源为准：物料/仓库取 ERP，供应商取 SRM，客户按渠道取 ERP 或 CRM，库位取 WMS。</li>
        </ul>
      </div>
      <div class="drawer-foot"><button class="btn" data-close>关闭</button></div>`, true);
  }

  function typeName(t) {
    return ({ workbench: '角色工作台', dashboard: '数据看板', list: '列表 / 管理页', monitor: '监控页', search: '搜索页', profile: '个人中心', error: '异常状态页' })[t] || t;
  }

  function detailDrawer(p, row) {
    const cols = state.cols[p.id] || p.cols || [];
    drawer(`
      <div class="drawer-head"><h3>详情查看 · ${esc(p.title)}</h3><button class="btn sm" data-close>关闭</button></div>
      <div class="drawer-body">
        <div class="note">以下为演示数据，字段与定义来自页面元数据。真实环境由后端接口按数据权限返回。</div>
        <dl class="desc-list">
          ${cols.map(c => `<dt>${esc(c[1])}</dt><dd>${c[3] === 'tag' ? `<span class="tag ${tagClass(row[c[0]], c[4])}">${esc(row[c[0]] || '—')}</span>` : esc(row[c[0]] == null || row[c[0]] === '' ? '—' : row[c[0]])}</dd>`).join('')}
        </dl>
        <div class="section-title">审批 / 操作轨迹</div>
        <div class="timeline">
          ${['创建单据，提交业务校验', '系统完成主数据与库存校验', '当前节点：业务审批（' + roleName(state.role) + '）', '后续：执行与回写 ERP'].map((t, i) =>
            `<div class="tl-item ${i < 2 ? 'done' : i === 2 ? 'current' : ''}"><div class="tl-dot"></div><div class="tl-title">${esc(t)}</div><div class="tl-meta">2026-11-1${i} 10:2${i} · 操作人 张工</div></div>`).join('')}
        </div>
      </div>
      <div class="drawer-foot">
        <button class="btn" data-close>关闭</button>
        <button class="btn primary" data-submit="已进入编辑（演示）">编辑</button>
      </div>`);
  }

  function formDrawer(p, label, row) {
    const cols = (state.cols[p.id] || p.cols || []).filter(c => c[0] !== 'progress').slice(0, 8);
    const fields = cols.map((c, i) => {
      const val = row ? row[c[0]] : '';
      if (c[3] === 'tag' && c[4]) {
        const opts = Object.keys(c[4]);
        return `<div class="form-item"><label>${esc(c[1])}${i < 3 ? ' <span class="req">*</span>' : ''}</label>
          <select>${opts.map(o => `<option ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`;
      }
      return `<div class="form-item"><label>${esc(c[1])}${i < 3 ? ' <span class="req">*</span>' : ''}</label>
        <input value="${esc(val)}" ${c[3] === 'mono' ? 'readonly' : ''} placeholder="请输入${esc(c[1])}"></div>`;
    }).join('');
    drawer(`
      <div class="drawer-head"><h3>${esc(label)} · ${esc(p.title)}</h3><button class="btn sm" data-close>关闭</button></div>
      <div class="drawer-body">
        <div class="note">${row ? '编辑现有记录' : '新建记录'}。带 * 为必填项；编码类字段由编码服务自动生成，只读。</div>
        <div class="form-grid">
          ${fields}
          <div class="form-item full"><label>备注说明</label><textarea placeholder="填写业务背景、变更原因或附件说明"></textarea></div>
        </div>
        <div class="section-title">权限与校验</div>
        <div class="note warn">当前角色：${roleName(state.role)} · 保存将执行必填校验、主数据引用校验与重复性校验；高风险字段变更需走审批流。</div>
      </div>
      <div class="drawer-foot">
        <button class="btn" data-close>取消</button>
        <button class="btn primary" data-submit="${esc(label)}已提交（演示，不写入真实数据）">提交</button>
      </div>`);
  }

  function actionDrawer(p, label, row) {
    const steps = p.flow ? p.flow.steps : ['发起', '业务校验', '审批', '执行完成'];
    const cur = p.flow ? Math.min(p.flow.current + 1, steps.length - 1) : 2;
    drawer(`
      <div class="drawer-head"><h3>${esc(label)} · ${esc(p.title)}</h3><button class="btn sm" data-close>关闭</button></div>
      <div class="drawer-body">
        <div class="note">该操作将触发流程校验并写入审计日志。演示环境不产生真实业务影响。</div>
        <dl class="desc-list">
          <dt>操作类型</dt><dd>${esc(label)}</dd>
          <dt>业务对象</dt><dd>${esc(p.title)}${row ? ' · ' + esc(row[Object.keys(row)[0]]) : ''}</dd>
          <dt>操作角色</dt><dd>${roleName(state.role)}</dd>
          <dt>数据影响</dt><dd>${esc(MOD_RULES[p.mod] || '按业务规则更新状态并回写下游系统')}</dd>
        </dl>
        <div class="section-title">流程进度</div>
        <div class="timeline">
          ${steps.map((s, i) => `<div class="tl-item ${i < cur ? 'done' : i === cur ? 'current' : ''}">
            <div class="tl-dot"></div><div class="tl-title">${esc(s)}</div>
            <div class="tl-meta">${i < cur ? '已完成 · 2026-11-1' + i + ' 10:2' + i : i === cur ? '待处理 · 当前节点' : '未开始'}</div>
          </div>`).join('')}
        </div>
        <div class="section-title">处理意见</div>
        <div class="form-item"><textarea placeholder="填写审批意见 / 处理说明（选填）"></textarea></div>
      </div>
      <div class="drawer-foot">
        <button class="btn" data-close>取消</button>
        <button class="btn danger" data-submit="已驳回（演示）">驳回</button>
        <button class="btn primary" data-submit="${esc(label)}已完成（演示）">确认</button>
      </div>`);
  }

  /* ---------------- 交互处理 ---------------- */
  document.addEventListener('click', e => {
    const t = e.target;

    const nav = t.closest('[data-nav]');
    if (nav) { go(nav.getAttribute('data-nav')); return; }

    const group = t.closest('[data-group]');
    if (group) {
      const g = group.getAttribute('data-group');
      state.open[g] = state.open[g] === false ? true : false;
      render();
      return;
    }

    if (t.closest('[data-doc]')) { const p = currentPage(); if (p) docDrawer(p); return; }
    if (t.closest('[data-close]')) { closeDrawer(); return; }

    const setRole = t.closest('[data-set-role]');
    if (setRole) {
      state.role = setRole.getAttribute('data-set-role');
      render();
      toast('已切换为 ' + roleName(state.role));
      return;
    }

    const loginRole = t.closest('[data-login-role]');
    if (loginRole) {
      state.loginRole = loginRole.getAttribute('data-login-role');
      document.querySelectorAll('[data-login-role]').forEach(el => el.classList.toggle('active', el === loginRole));
      return;
    }
    if (t.closest('[data-login]')) {
      state.role = state.loginRole || 'admin';
      state._scrolled = false;
      toast('登录成功，当前视角：' + roleName(state.role));
      go('workbench');
      return;
    }

    const tab = t.closest('[data-tab]');
    if (tab) {
      const p = currentPage();
      state.tab[p.id] = parseInt(tab.getAttribute('data-tab'), 10) || 0;
      render();
      return;
    }

    const filter = t.closest('[data-filter]');
    if (filter) {
      const p = currentPage();
      const box = document.getElementById('filters-' + p.id);
      if (filter.getAttribute('data-filter') === 'reset') {
        delete state.q[p.id];
        render();
        toast('筛选条件已重置');
        return;
      }
      const q = { t: [], s: [] };
      box.querySelectorAll('[data-fk]').forEach(el => {
        const k = el.getAttribute('data-fk');
        const v = (el.value || '').trim();
        if (!v) return;
        if (k.charAt(0) === 't') { q.t.push(v); q[k] = v; } else { q.s.push(v); q[k] = v; }
      });
      state.q[p.id] = q;
      render();
      const count = (state.rows[p.id] || []).length;
      toast('筛选完成，命中 ' + count + ' 条演示数据');
      return;
    }

    const page = t.closest('[data-page]');
    if (page) {
      const p = currentPage();
      const v = page.getAttribute('data-page');
      let cur = state.pageNo[p.id] || 1;
      if (v === 'prev') cur = Math.max(1, cur - 1);
      else if (v === 'next') cur = Math.min(5, cur + 1);
      else cur = parseInt(v, 10) || 1;
      state.pageNo[p.id] = cur;
      render();
      toast('已切换到第 ' + cur + ' 页（演示数据不分页）');
      return;
    }

    const rowAct = t.closest('[data-row]');
    if (rowAct) {
      const p = currentPage();
      const row = (state.rows[p.id] || [])[parseInt(rowAct.getAttribute('data-row'), 10)];
      const key = rowAct.getAttribute('data-key');
      const label = rowAct.getAttribute('data-label') || key;
      if (!row) return;
      if (key === 'detail' || key === 'trace' || key === 'log' || key === 'timeline' || key === 'history' || key === 'version' || key === 'preview' || key === 'voucher') {
        detailDrawer(p, row);
      } else if (['export', 'download', 'print', 'read'].indexOf(key) >= 0) {
        toast(label + '：演示环境已模拟执行');
      } else {
        actionDrawer(p, label, row);
      }
      return;
    }

    const act = t.closest('[data-act]');
    if (act) {
      const p = currentPage();
      const key = act.getAttribute('data-act');
      const label = act.getAttribute('data-label') || key;
      if (['export', 'import', 'download'].indexOf(key) >= 0) {
        toast(label + '：已生成演示文件（不包含真实数据）');
      } else if (['read', 'refresh'].indexOf(key) >= 0) {
        toast(label + '：已刷新');
      } else if (/^create|^new|upload|invoice|settle|design|menu|role|price|appointment|register|add/.test(key)) {
        formDrawer(p, label);
      } else {
        actionDrawer(p, label);
      }
      return;
    }

    const submit = t.closest('[data-submit]');
    if (submit) {
      closeDrawer();
      toast(submit.getAttribute('data-submit'));
      return;
    }

    const stateCard = t.closest('[data-state]');
    if (stateCard && state.page === 'error') {
      const p = currentPage();
      const s = p.states[parseInt(stateCard.getAttribute('data-state'), 10)] || p.states[0];
      drawer(`
        <div class="drawer-head"><h3>异常状态示例 · ${esc(s[0])}</h3><button class="btn sm" data-close>关闭</button></div>
        <div class="drawer-body">
          <div class="error-state" style="min-height:420px">
            <div class="big">${esc(s[0])}</div>
            <h2>${esc(s[1])}</h2>
            <p>${esc(s[2])}</p>
            <div style="display:flex;gap:8px">
              <button class="btn primary" data-nav="workbench">返回工作台</button>
              <button class="btn" data-close>重试</button>
            </div>
          </div>
          <div class="note">Trace ID：TRC-2026-1111-8f3a2c · 已自动上报可观测平台。异常页遵循统一视觉与文案规范，禁止出现空白页或原始报错堆栈。</div>
        </div>`, true);
      return;
    }

    const hot = t.closest('[data-hot]');
    if (hot) {
      state.q.search = hot.getAttribute('data-hot');
      render();
      return;
    }

    if (t.closest('[data-search-go]')) {
      const inp = document.getElementById('bigSearch');
      state.q.search = inp ? inp.value.trim() : '';
      render();
      return;
    }
  });

  document.addEventListener('change', e => {
    if (e.target && e.target.id === 'roleSelect') {
      state.role = e.target.value;
      state._scrolled = false;
      render();
      toast('已切换角色：' + roleName(state.role));
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const el = document.getElementById('topSearch');
      if (el) el.focus();
    }
    if (e.key === 'Enter') {
      if (e.target && e.target.id === 'topSearch') {
        state.q.search = e.target.value.trim();
        go('search');
      }
      if (e.target && e.target.id === 'bigSearch') {
        state.q.search = e.target.value.trim();
        render();
      }
    }
    if (e.key === 'Escape') closeDrawer();
  });

  window.addEventListener('hashchange', route);

  /* 启动 */
  route();
})();
