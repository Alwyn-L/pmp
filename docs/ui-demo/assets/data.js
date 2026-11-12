/* 制造平台（PMP）UI Demo 页面元数据 —— 与《系统整合架构设计方案-V1.0》对齐 */
const ROLES = [
  ['exec','高管','经营驾驶舱、数据看板与关键指标只读'],
  ['planner','计划员','预测、S&OP、主生产、补货与产能'],
  ['buyer','采购员','供应商、寻源、采购订单与对账'],
  ['supplier','供应商','外部协同：订单确认、ASN、对账'],
  ['customer','客户','外部门户：订单查询、物流轨迹、对账与售后'],
  ['rd','研发工程师','物料申请、BOM、工艺、ECN、图纸'],
  ['prod','生产主管','工单、派工、报工、现场异常'],
  ['qc','质量员','检验、不良品、批次追溯'],
  ['wh','仓管员','收货、上架、拣货、发货、盘点'],
  ['logi','物流调度','运输任务、承运商、在途、运费'],
  ['sales','销售客服','客户、订单、售后与退换货'],
  ['fin','财务','应收应付、发票、结算与成本'],
  ['data','数据管理员','指标、报表、数据质量与服务'],
  ['mdm','主数据管理员','物料/供应商/客户/仓库主数据'],
  ['admin','系统管理员','全部页面、权限、流程与系统配置'],
  ['sre','运维工程师','CI/CD、监控、配置、资源与密钥'],
  ['audit','审计员','审计日志、合规与只读核查']
].map(r=>({id:r[0],name:r[1],desc:r[2]}));

const MENU = [
  {g:'工作台',icon:'◈',items:[['workbench','我的工作台',''],['dashboard','经营驾驶舱',''],['todo','待办中心','12'],['message','消息中心','8']]},
  {g:'研发协同',icon:'◇',items:[['material-apply','物料申请',''],['bom','BOM 管理',''],['routing','工艺路线',''],['ecn','ECN 变更',''],['drawing','图纸中心','']]},
  {g:'计划',icon:'▤',items:[['forecast','需求预测',''],['sop','S&OP 会议',''],['mps','主生产计划',''],['replenish','补货计划',''],['capacity','产能平衡','']]},
  {g:'采购',icon:'⇄',items:[['supplier','供应商管理',''],['supplier-portal','供应商门户',''],['sourcing','寻源询价',''],['purchase-req','采购申请',''],['purchase-order','采购订单',''],['asn','ASN 收货协同',''],['reconciliation','三单匹配对账','']]},
  {g:'生产',icon:'⚙',items:[['work-order','工单管理',''],['report-work','报工管理',''],['quality','质量管理',''],['trace','批次追溯',''],['andon','安灯异常','3'],['equipment','设备管理','']]},
  {g:'仓储',icon:'▥',items:[['inbound','收货与上架',''],['outbound','拣货与发货',''],['stocktake','盘点管理',''],['inventory','库存管理','']]},
  {g:'履约',icon:'▦',items:[['order-pool','订单池',''],['order-review','订单审核与分单',''],['shipment','发货单',''],['rma','退换货 RMA','']]},
  {g:'物流',icon:'◎',items:[['transport-task','运输任务',''],['carrier','承运商与运价',''],['tracking','在途与签收',''],['freight','运费对账','']]},
  {g:'客户',icon:'☺',items:[['customer','客户 360',''],['customer-portal','客户门户',''],['sales-order','销售订单','']]},
  {g:'财务协同',icon:'¥',items:[['receivable-payable','应收应付',''],['invoice-settlement','发票与结算',''],['cost','成本核算','']]},
  {g:'数据',icon:'▧',items:[['indicator','指标平台',''],['bi','自助报表',''],['data-quality','数据质量与血缘','']]},
  {g:'公共能力',icon:'⬡',items:[['mdm','主数据管理',''],['iam','身份与权限',''],['bpm','流程中心',''],['file','文件中心',''],['coding','编码规则',''],['notify','通知中心',''],['audit','审计日志',''],['integration','集成与接口台账',''],['gateway','API 网关',''],['event-bus','消息总线',''],['rule','规则引擎',''],['scheduler','调度任务','']]},
  {g:'运维管控',icon:'⌘',items:[['cicd','CI/CD 与发布',''],['observability','监控与 SLO',''],['config','配置与密钥',''],['resource','资源与成本','']]},
  {g:'系统管理',icon:'⚑',items:[['org','组织与岗位',''],['dict-param','字典与参数',''],['tenant-menu','租户与菜单','']]},
  {g:'帮助与异常',icon:'?',items:[['search','全局搜索',''],['profile','个人中心',''],['error','异常提示页','']]}
];

const PAGES = {};
const P = (id,cfg)=>{PAGES[id]=Object.assign({id},cfg)};
const ALL='';
const ST={ok:{'启用':'success','生效':'success','已完成':'success','正常':'success','通过':'success','已签收':'success','在线':'success','成功':'success','已确认':'success'},
  wait:{'待审批':'warning','待处理':'warning','待确认':'warning','进行中':'info','待收货':'info','待发货':'info','待分配':'info','运行中':'info','处理中':'info','待对账':'warning'},
  bad:{'停用':'muted','草稿':'muted','已取消':'muted','驳回':'danger','异常':'danger','超时':'danger','缺货':'danger','离线':'muted','失败':'danger','待整改':'danger'},
  info:{'已下达':'info','已审核':'info','已入库':'info','已出库':'info','已发货':'info','部分收货':'info'}};
const T=(arr)=>{const m={};arr.forEach(x=>m[x[0]]=x[1]);return m};

/* ================= 工作台 ================= */
P('workbench',{mod:'工作台',type:'workbench',roles:[ALL],title:'我的工作台',desc:'按角色聚合待办、审批、预警与快捷入口，是全部系统的统一入口。',
  jump:[['待办中心','todo'],['经营驾驶舱','dashboard'],['消息中心','message']],
  kpis:[['今日待办','12','待审批 5 · 待处理 7','warning'],['我发起的','6','进行中 4 · 已完成 2','info'],['未读消息','8','告警 3 · 业务 5','danger'],['本周完成','23','较上周 +12%','success']],
  todos:[['采购订单 PO-2026-0412 待审批','采购','10:30','warning'],['ECN-2026-0087 变更待审核','研发','09:45','warning'],['库存差异工单 DIF-0312 待处理','仓储','昨天','danger'],['RMA-2026-0156 退货待质检','售后','昨天','info'],['S&OP 11 月会议材料待确认','计划','11-09','info']],
  notices:[['系统维护通知：11 月 16 日 22:00-24:00 网关升级','2026-11-10'],['主数据治理月报（10 月）已发布','2026-11-08'],['关于规范接口台账登记的通知','2026-11-05'],['数据口径变更：库存准确率计算方式更新','2026-11-02']],
  quicks:[['新建采购申请','purchase-req','＋'],['订单审核','order-review','✓'],['库存查询','inventory','▤'],['主数据查询','mdm','⬡'],['发布记录','cicd','⌘'],['异常处理','andon','!']]});

P('dashboard',{mod:'工作台',type:'dashboard',roles:['exec','admin','planner','fin','sales'],title:'经营驾驶舱',desc:'跨域指标统一口径，展示订单履约、库存、采购、生产、物流与数据一致性六类核心指标。',
  jump:[['指标平台','indicator'],['自助报表','bi'],['数据质量','data-quality']],
  kpis:[['订单履约率','96.8%','目标 ≥95%','success'],['库存准确率','99.6%','目标 ≥99.5%','success'],['采购准时率','92.4%','较上月 +1.6%','success'],['生产达成率','94.1%','较上月 -0.8%','warning'],['物流成本占比','3.2%','目标 ≤3.5%','success'],['主数据一致率','99.7%','目标 ≥99.5%','success']],
  charts:[{type:'line',title:'订单量与履约率趋势',sub:'近 12 个月',labels:['12月','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月'],series:[['订单量',[3200,2900,3400,4100,4600,4800,5200,5400,5600,5900,6100,6400],'#2563eb'],['履约率',[92,93,92.5,94,94.5,95,95.2,95.8,96,96.2,96.5,96.8],'#06b6d4']]},
    {type:'donut',title:'库存结构',sub:'按库龄',items:[['0-30 天',62,'#2563eb'],['31-90 天',23,'#06b6d4'],['91-180 天',9,'#f59e0b'],['180 天以上',6,'#ef4444']]}],
  cols:[['type','预警类型',120,'tag',{'库存':'warning','交期':'danger','质量':'info','接口':'danger'}],['content','预警内容'],['owner','责任人',100],['time','发生时间',150],['status','状态',90,'tag',ST.wait]],
  sample:n=>({type:'库存',content:'华东仓 SKU-88213 低于安全库存',owner:'王仓管',time:'2026-11-11 09:12',status:'待处理'}),rows:6});

P('todo',{mod:'工作台',type:'list',roles:[ALL],title:'待办中心',desc:'汇聚各业务系统审批与处理任务，支持按类型、紧急度与来源系统筛选，统一跳转办理。',
  jump:[['流程中心','bpm'],['采购订单','purchase-order'],['BOM 管理','bom']],
  tabs:[{name:'待我审批',cols:[['code','待办编号',130,'mono'],['title','标题'],['biz','业务类型',110],['from','来源系统',110],['urgent','紧急度',90,'tag',{'高':'danger','中':'warning','低':'muted'}],['time','到达时间',150],['status','状态',90,'tag',ST.wait]],sample:n=>({code:'TD-2026-0{n}',title:'采购订单 PO-2026-0{n} 待审批',biz:'采购订单',from:'采购协同',urgent:'高',time:'2026-11-11 09:2{n}',status:'待审批'})},
    {name:'待我处理',cols:[['code','待办编号',130,'mono'],['title','标题'],['biz','业务类型',110],['from','来源系统',110],['urgent','紧急度',90,'tag',{'高':'danger','中':'warning','低':'muted'}],['time','到达时间',150],['status','状态',90,'tag',ST.wait]],sample:n=>({code:'TD-2026-1{n}',title:'库存差异工单 DIF-03{nn} 待处理',biz:'库存差异',from:'仓储管理',urgent:'中',time:'2026-11-10 16:4{n}',status:'待处理'})},
    {name:'我发起的',cols:[['code','单号',140,'mono'],['title','标题'],['biz','业务类型',110],['to','当前处理人',110],['time','提交时间',150],['status','状态',90,'tag',ST.wait]],sample:n=>({code:'SQ-2026-0{n}',title:'物料主数据新增申请',biz:'主数据',to:'李主数据',time:'2026-11-09 11:2{n}',status:'进行中'})},
    {name:'已完成',cols:[['code','单号',140,'mono'],['title','标题'],['biz','业务类型',110],['result','处理结果',100,'tag',ST.ok],['time','完成时间',150]],sample:n=>({code:'TD-2026-3{n}',title:'ECN-2026-00{nn} 变更审核',biz:'ECN',result:'通过',time:'2026-11-08 15:3{n}'})}],
  actions:[['batch','批量办理'],['export','导出']],rowActions:[['handle','办理'],['detail','查看'],['transfer','转办']]});

P('message',{mod:'工作台',type:'list',roles:[ALL],title:'消息中心',desc:'统一接收系统通知、业务提醒与运维告警，支持标记已读与按渠道查看。',
  jump:[['通知中心','notify'],['审计日志','audit']],
  filters:[['title','消息标题'],{l:'类型',o:['全部','系统通知','业务提醒','运维告警']},{l:'状态',o:['全部','未读','已读']},'时间范围'],
  cols:[['title','消息标题'],['type','类型',100,'tag',{'系统通知':'info','业务提醒':'primary','运维告警':'danger'}],['channel','渠道',90],['time','时间',150],['status','状态',80,'tag',{'未读':'warning','已读':'muted'}]],
  sample:n=>({title:'采购订单 PO-2026-0{n} 已超交期 2 天',type:'业务提醒',channel:'站内信',time:'2026-11-1{n} 10:2{n}',status:'未读'}),
  actions:[['read','全部已读'],['setting','通知设置','admin']],rowActions:[['detail','查看'],['read','标记已读'],['delete','删除','admin']]});

/* ================= 研发协同 ================= */
P('material-apply',{mod:'研发协同',type:'list',roles:['rd','planner','mdm','admin'],title:'物料申请',desc:'研发阶段创建物料临时码并提交正式建档申请，正式编码由 ERP 生成后回写 PLM。',
  jump:[['BOM 管理','bom'],['主数据管理','mdm'],['编码规则','coding']],
  kpis:[['本月申请','48','待审核 6'],['已建档','36','转正式码'],['驳回','4','资料不全'],['平均处理','1.8 天','目标 ≤2 天']],
  filters:['临时码','物料名称',{l:'状态',o:['全部','草稿','待审核','已建档','驳回']},{l:'物料类型',o:['全部','原材料','半成品','成品','包装']}],
  cols:[['code','临时码',130,'mono'],['name','物料名称'],['type','物料类型',90],['spec','规格型号',140],['applicant','申请人',90],['status','状态',90,'tag',{'草稿':'muted','待审核':'warning','已建档':'success','驳回':'danger'}],['time','申请时间',150]],
  sample:n=>({code:'TMP-2026-0{nn}',name:'伺服电机 {n} 型',type:'原材料',spec:'220V / 750W',applicant:'张工',status:'待审核',time:'2026-11-0{n} 09:2{n}'}),
  actions:[['create','新建物料申请','rd'],['import','批量导入','rd'],['export','导出']],rowActions:[['detail','查看'],['edit','编辑','rd'],['submit','提交审核','rd'],['approve','审核','mdm']],
  fields:[['临时码','系统生成，规则 TMP-年份-流水号','研发创建，只读'],['物料名称','必填，≤60 字符','研发/主数据可编辑'],['物料类型','必填，枚举：原材料/半成品/成品/包装','研发可编辑'],['规格型号','必填，≤120 字符','研发可编辑'],['正式物料编码','ERP 建档后回写，只读','仅系统写入'],['状态','草稿/待审核/已建档/驳回','按流程流转']]});

P('bom',{mod:'研发协同',type:'list',roles:['rd','planner','prod','mdm','admin'],title:'BOM 管理',desc:'维护设计 BOM（EBOM）与制造 BOM（MBOM），支持版本对比、替代料、损耗率与生效日期管理。',
  jump:[['ECN 变更','ecn'],['工艺路线','routing'],['物料申请','material-apply']],
  kpis:[['BOM 总数','12,480','较上月 +2.1%'],['待生效版本','18','需 ECN 审核'],['本月变更','42','ECN 驱动'],['不一致项','0','跨系统校验']],
  filters:['BOM 编码','物料名称',{l:'BOM 类型',o:['全部','EBOM','MBOM']},{l:'状态',o:['全部','草稿','待审批','生效','停用']}],
  cols:[['code','BOM 编码',150,'mono'],['name','物料名称'],['type','类型',80,'tag',{'EBOM':'info','MBOM':'primary'}],['ver','版本',70,'mono'],['qty','层级',70],['status','状态',90,'tag',{'草稿':'muted','待审批':'warning','生效':'success','停用':'muted'}],['owner','负责人',90],['updated','更新时间',150]],
  sample:n=>({code:'BOM-2026-{nn}',name:'驱动总成 {n}',type:'MBOM',ver:'V1.{n}',qty:'3 层',status:'生效',owner:'张工',updated:'2026-11-0{n} 10:20'}),
  actions:[['create','新建 BOM','rd'],['compare','版本对比','rd'],['export','导出']],rowActions:[['detail','查看'],['edit','编辑','rd'],['approve','审批','rd'],['obsolete','停用','rd']],
  fields:[['BOM 编码','系统生成，BOM-年份-流水','只读'],['BOM 类型','EBOM 由 PLM 维护，MBOM 由 ERP/工艺维护','按类型分权'],['版本','语义化版本 V主.次','变更需 ECN'],['损耗率','0~100%，按工序维护','工艺工程师'],['替代料','可配置优先级与替代比例','研发/工艺'],['生效日期','必填，不得早于审批日期','审批通过后生效']]});

P('routing',{mod:'研发协同',type:'list',roles:['rd','prod','qc','mdm','admin'],title:'工艺路线',desc:'维护工序、工作中心、标准工时与检验点，工单下达前同步至 MES。',
  jump:[['BOM 管理','bom'],['工单管理','work-order'],['质量检验','quality']],
  filters:['工艺编码','物料编码',{l:'状态',o:['全部','草稿','启用','停用']}],
  cols:[['code','工艺编码',140,'mono'],['material','物料编码',140,'mono'],['name','工艺名称'],['steps','工序数',80],['center','工作中心',110],['std','标准工时',90],['status','状态',80,'tag',{'草稿':'muted','启用':'success','停用':'muted'}],['ver','版本',70,'mono']],
  sample:n=>({code:'RT-2026-{nn}',material:'M-882{nn}',name:'总装工艺 {n}',steps:6+n,center:'总装一线',std:'48 min',status:'启用',ver:'V1.{n}'}),
  actions:[['create','新建工艺','rd'],['import','导入','rd']],rowActions:[['detail','查看'],['edit','编辑','rd'],['copy','复制新版本','rd'],['publish','发布','rd']],
  fields:[['工艺编码','系统生成','只读'],['物料编码','关联物料，必选','研发'],['工序顺序','整数递增，不可重复','工艺工程师'],['工作中心','来自 MES 工作中心主数据','工艺工程师'],['检验点','首检/巡检/终检可多选','质量与工艺共同确认']]});

P('ecn',{mod:'研发协同',type:'list',roles:['rd','planner','prod','qc','mdm','admin'],title:'ECN 工程变更',desc:'工程变更申请、影响分析、跨系统审批与分发，变更生效后同步 BOM、工艺、库存与在途订单。',
  jump:[['BOM 管理','bom'],['工单管理','work-order'],['待办中心','todo']],
  flow:{steps:['提交申请','影响分析','跨域审批','发布生效','下游同步'],current:2},
  kpis:[['本月 ECN','26','待审批 5'],['平均审批','2.3 天','目标 ≤3 天'],['影响物料','148','含在途订单 12'],['同步失败','0','下游 9 系统']],
  filters:['ECN 编号','变更标题',{l:'变更类型',o:['全部','物料','BOM','工艺','图纸']},{l:'状态',o:['全部','草稿','待审批','已生效','驳回']}],
  cols:[['code','ECN 编号',140,'mono'],['title','变更标题'],['type','类型',80],['scope','影响范围',110],['owner','申请人',90],['status','状态',90,'tag',{'草稿':'muted','待审批':'warning','已生效':'success','驳回':'danger'}],['time','提交时间',150]],
  sample:n=>({code:'ECN-2026-00{nn}',title:'驱动总成 {n} 轴承规格变更',type:'BOM',scope:'3 个物料 / 2 条产线',owner:'张工',status:'待审批',time:'2026-11-0{n} 14:2{n}'}),
  actions:[['create','新建变更','rd'],['impact','影响分析','rd']],rowActions:[['detail','查看'],['approve','审批','rd'],['timeline','审批轨迹'],['sync','下游同步','admin']],
  fields:[['ECN 编号','系统生成，ECN-年份-流水','只读'],['变更类型','物料/BOM/工艺/图纸','申请人选择'],['影响分析','自动列出受影响 BOM、工单、库存、在途订单','系统生成'],['审批链','研发→计划→生产→质量→主数据','按影响范围动态路由'],['生效策略','立即生效/指定日期/用完旧料','审批人确认']]});

P('drawing',{mod:'研发协同',type:'list',roles:['rd','prod','qc','admin'],title:'图纸中心',desc:'图纸上传、版本管理、水印预览与按工单发放，确保车间使用正确版本。',
  jump:[['BOM 管理','bom'],['工单管理','work-order'],['文件中心','file']],
  filters:['图纸编号','图纸名称',{l:'类型',o:['全部','零件图','装配图','工艺图']},{l:'状态',o:['全部','草稿','已发布','已作废']}],
  cols:[['code','图纸编号',140,'mono'],['name','图纸名称'],['type','类型',90],['ver','版本',70,'mono'],['material','关联物料',140,'mono'],['owner','上传人',90],['status','状态',80,'tag',{'草稿':'muted','已发布':'success','已作废':'muted'}],['time','更新时间',150]],
  sample:n=>({code:'DWG-2026-{nn}',name:'总装图 {n}',type:'装配图',ver:'V1.{n}',material:'M-882{nn}',owner:'李工',status:'已发布',time:'2026-11-0{n} 16:1{n}'}),
  actions:[['upload','上传图纸','rd'],['batch','批量发放','rd']],rowActions:[['preview','预览'],['version','版本历史'],['download','下载'],['void','作废','rd']]});

/* ================= 计划 ================= */
P('forecast',{mod:'计划',type:'list',roles:['planner','exec','sales','data','admin'],title:'需求预测',desc:'基于历史销售、在手订单与市场因素生成预测版本，支持人工调整与准确率回溯。',
  jump:[['S&OP 会议','sop'],['主生产计划','mps'],['自助报表','bi']],
  chart:{type:'line',title:'预测 vs 实际销量',sub:'近 8 周',labels:['W1','W2','W3','W4','W5','W6','W7','W8'],series:[['预测',[820,860,910,880,940,980,1020,1060],'#2563eb'],['实际',[800,880,890,900,930,1010,990,1080],'#06b6d4']]},
  kpis:[['预测准确率','88.6%','目标 ≥85%'],['预测版本','12','当前 V12'],['待确认','3','需 S&OP 确认'],['偏差预警','2','偏差 >15%']],
  filters:['物料编码',{l:'预测周期',o:['全部','周','月','季']},{l:'版本',o:['全部','V12','V11','V10']}],
  cols:[['code','物料编码',140,'mono'],['name','物料名称'],['period','预测周期',100],['qty','预测数量',100],['actual','实际销量',100],['acc','准确率',80],['ver','版本',70,'mono'],['status','状态',90,'tag',ST.wait]],
  sample:n=>({code:'M-882{nn}',name:'伺服电机 {n} 型',period:'2026-11',qty:1200+n*10,actual:1100+n*20,acc:(82+n)+'%',ver:'V12',status:'待确认'}),
  actions:[['run','运行预测','planner'],['adjust','人工调整','planner'],['publish','发布版本','planner']],rowActions:[['detail','查看'],['edit','调整','planner'],['history','历史版本']]});

P('sop',{mod:'计划',type:'list',roles:['planner','exec','sales','fin','admin'],title:'S&OP 会议',desc:'需求、供应、财务三方对齐，输出共识预测、主生产计划与补货策略。',
  jump:[['需求预测','forecast'],['主生产计划','mps'],['产能平衡','capacity']],
  flow:{steps:['数据准备','需求评审','供应评审','财务评审','共识发布'],current:1},
  filters:['会议编号',{l:'周期',o:['全部','2026-11','2026-10','2026-09']},{l:'状态',o:['全部','准备中','进行中','已发布']}],
  cols:[['code','会议编号',140,'mono'],['period','周期',100],['topic','议题'],['attendee','参与方',140],['status','状态',90,'tag',{'准备中':'warning','进行中':'info','已发布':'success'}],['time','会议时间',150]],
  sample:n=>({code:'SOP-2026-{nn}',period:'2026-11',topic:'旺季产能与关键料保障',attendee:'计划/采购/生产/财务',status:'进行中',time:'2026-11-1{n} 09:00'}),
  actions:[['create','发起会议','planner'],['material','会议材料','planner']],rowActions:[['detail','查看'],['minutes','会议纪要'],['publish','发布共识','planner']]});

P('mps',{mod:'计划',type:'list',roles:['planner','prod','admin'],title:'主生产计划',desc:'按物料与产线编排主生产计划，校验产能与物料齐套后下达工单。',
  jump:[['工单管理','work-order'],['产能平衡','capacity'],['库存管理','inventory']],
  kpis:[['计划工单','286','本周'],['齐套率','94.2%','较上周 +1.1%'],['冲突项','3','产能/物料'],['已下达','210','73.4%']],
  filters:['物料编码',{l:'产线',o:['全部','总装一线','总装二线','机加线']},{l:'状态',o:['全部','草稿','已确认','已下达']}],
  cols:[['code','计划编号',140,'mono'],['material','物料',110,'mono'],['name','物料名称'],['line','产线',100],['plan','计划量',80],['start','开工日',100],['end','完工日',100],['status','状态',90,'tag',{'草稿':'muted','已确认':'info','已下达':'success'}],['kit','齐套率',80]],
  sample:n=>({code:'MPS-2026-0{nn}',material:'M-882{nn}',name:'驱动总成 {n}',line:'总装一线',plan:200+n*10,start:'2026-11-1{n}',end:'2026-11-2{n}',status:'已确认',kit:(90+n)+'%'}),
  actions:[['create','新建计划','planner'],['check','齐套检查','planner'],['release','批量下达','planner']],rowActions:[['detail','查看'],['edit','调整','planner'],['release','下达','planner'],['split','拆分']]});

P('replenish',{mod:'计划',type:'list',roles:['planner','buyer','wh','admin'],title:'补货计划',desc:'依据安全库存、在途与需求预测生成补货建议，转采购申请或生产计划。',
  jump:[['采购申请','purchase-req'],['库存管理','inventory'],['采购订单','purchase-order']],
  filters:['物料编码',{l:'补货类型',o:['全部','采购补货','生产补货','调拨补货']},{l:'紧急度',o:['全部','高','中','低']}],
  cols:[['code','物料编码',140,'mono'],['name','物料名称'],['stock','当前库存',90],['safe','安全库存',90],['gap','缺口',80,'num'],['type','补货方式',100],['urgent','紧急度',80,'tag',{'高':'danger','中':'warning','低':'muted'}],['status','状态',90,'tag',ST.wait]],
  sample:n=>({code:'M-882{nn}',name:'轴承 {n} 型',stock:120+n*5,safe:200,gap:80-n*3,type:'采购补货',urgent:'高',status:'待处理'}),
  actions:[['generate','生成补货建议','planner'],['to-pr','转采购申请','planner']],rowActions:[['detail','查看'],['ignore','忽略'],['convert','转单','planner']]});

P('capacity',{mod:'计划',type:'list',roles:['planner','prod','admin'],title:'产能平衡',desc:'按工作中心与周期核算产能负荷，识别瓶颈工序并给出外协、加班、调序建议。',
  jump:[['主生产计划','mps'],['工单管理','work-order'],['S&OP 会议','sop']],
  chart:{type:'bar',title:'各工作中心负荷率',sub:'2026 年 11 月',labels:['机加','焊接','喷涂','总装','测试','包装'],data:[86,72,94,108,78,65],color:'#2563eb'},
  filters:[{l:'工作中心',o:['全部','机加','焊接','喷涂','总装','测试','包装']},{l:'周期',o:['全部','2026-11','2026-12']}],
  cols:[['center','工作中心',110],['period','周期',90],['capacity','可用产能',100],['load','负荷',90],['rate','负荷率',90],['bottle','瓶颈工序',120],['status','状态',90,'tag',{'正常':'success','预警':'warning','超载':'danger'}],['advice','建议',160]],
  sample:n=>({center:'总装',period:'2026-11',capacity:'2,400 h',load:(2200+n*80)+' h',rate:(98+n)+'%',bottle:'总装一线',status:'超载',advice:'外协 8% / 加班 120h'}),
  actions:[['recalc','重新核算','planner'],['export','导出']],rowActions:[['detail','查看'],['adjust','调整计划','planner'],['outsource','申请外协','planner']]});

/* ================= 采购 ================= */
P('supplier',{mod:'采购',type:'list',roles:['buyer','mdm','fin','qc','audit','admin'],title:'供应商管理',desc:'供应商准入、资质、绩效与结算主体一体化管理；编码由 SRM 生成，ERP 订阅建档。',
  jump:[['寻源询价','sourcing'],['采购订单','purchase-order'],['主数据管理','mdm']],
  tabs:[{name:'供应商台账',cols:[['code','供应商编码',130,'mono'],['name','供应商名称'],['cat','品类',100],['level','等级',80,'tag',{'A':'success','B':'info','C':'warning','D':'danger'}],['score','绩效分',80],['status','状态',80,'tag',{'合格':'success','考察':'warning','冻结':'danger'}],['owner','采购负责人',100]],sample:n=>({code:'SUP-000{nn}',name:'华东精密制造 {n} 有限公司',cat:'机加工件',level:'A',score:92-n,status:'合格',owner:'刘采购'})},
    {name:'准入审批',cols:[['code','申请编号',130,'mono'],['name','供应商名称'],['cat','品类',100],['stage','准入阶段',100],['submit','提交时间',140],['status','状态',90,'tag',ST.wait]],sample:n=>({code:'SA-2026-0{nn}',name:'新锐材料 {n} 科技',cat:'原材料',stage:'资质审核',submit:'2026-11-0{n}',status:'待审批'})},
    {name:'绩效评价',cols:[['code','供应商编码',130,'mono'],['name','供应商名称'],['quality','质量分',80],['delivery','交付分',80],['cost','成本分',80],['service','服务分',80],['total','总分',80],['period','周期',90]],sample:n=>({code:'SUP-000{nn}',name:'华东精密制造 {n} 有限公司',quality:92-n,delivery:88+n,cost:90,service:86,total:89,period:'2026-10'})}],
  actions:[['create','新增供应商','buyer'],['evaluate','发起评价','buyer'],['export','导出']],rowActions:[['detail','查看'],['edit','编辑','buyer'],['approve','准入审批','buyer'],['freeze','冻结','buyer']],
  fields:[['供应商编码','SRM 生成，规则 SUP-6 位流水','SRM 唯一写入'],['供应商名称','必填，工商全称','SRM/主数据'],['准入资质','营业执照、质量体系、环保资质','供应商上传，采购审核'],['结算账户','ERP 维护，不回写 SRM','财务'],['绩效等级','A/B/C/D，季度更新','系统计算+人工确认']]});

P('supplier-portal',{mod:'采购',type:'list',roles:['supplier','buyer','fin','admin'],title:'供应商门户',desc:'面向外部供应商的统一入口：注册准入、订单确认、ASN 发货、对账开票与资质维护，外部账号由 IAM 统一托管。',
  jump:[['供应商管理','supplier'],['采购订单','purchase-order'],['ASN 收货协同','asn'],['三单匹配对账','reconciliation']],
  kpis:[['待确认订单','6','超 24h 未确认 2'],['待发货 ASN','4','今日应发 3'],['待对账','3','差异 1 单'],['资质到期','2','30 天内']],
  tabs:[{name:'订单协同',cols:[['code','订单号',140,'mono'],['material','物料'],['qty','数量',80],['price','单价',100],['delivery','要求交期',110],['status','状态',90,'tag',{'待确认':'warning','已确认':'success','已拒绝':'danger','已发货':'info'}],['time','下单时间',140]],sample:n=>({code:'PO-2026-0{nn}',material:'M-882{nn} 伺服电机',qty:'200 + {n}0',price:'¥ 126.00',delivery:'2026-11-2{n}',status:'待确认',time:'2026-11-1{n} 09:2{n}'})},
    {name:'发货与 ASN',cols:[['code','ASN 单号',140,'mono'],['order','订单号',140,'mono'],['qty','发货数',80],['carton','箱数',70],['carrier','承运商',110],['eta','预计到货',110],['status','状态',90,'tag',{'待发货':'warning','运输中':'info','已签收':'success'}]],sample:n=>({code:'ASN-2026-0{nn}',order:'PO-2026-0{nn}',qty:'200 + {n}0',carton:8+n,carrier:'顺丰供应链',eta:'2026-11-2{n}',status:'运输中'})},
    {name:'对账与开票',cols:[['code','对账单号',140,'mono'],['period','账期',90],['amount','对账金额',110,'num'],['invoice','发票状态',90,'tag',{'未开票':'warning','已开票':'success','已付款':'info'}],['status','状态',90,'tag',{'待确认':'warning','已确认':'success','异议':'danger'}],['time','创建时间',140]],sample:n=>({code:'REC-2026-0{nn}',period:'2026-10',amount:(286000+n*12000).toLocaleString(),invoice:'已开票',status:'待确认',time:'2026-11-0{n} 10:2{n}'})},
    {name:'企业资料',cols:[['item','资料项',150],['value','内容'],['expire','有效期',110],['status','状态',90,'tag',{'有效':'success','即将到期':'warning','已过期':'danger'}]],sample:n=>({item:n===1?'营业执照':'质量体系认证',value:'91310000MA1K0{nn}XX',expire:'2027-0{n}-01',status:'有效'})}],
  actions:[['confirm','批量确认订单','supplier'],['asn','创建 ASN','supplier'],['export','导出']],
  rowActions:[['detail','查看'],['confirm','确认接单','supplier'],['reject','拒绝','supplier'],['asn','发货','supplier']],
  fields:[['供应商编码','门户不生成编码，注册通过后由 SRM 分配','SRM 唯一写入，门户只读'],['订单确认','供应商仅可确认交期与数量，不可改价','门户可写，ERP 订阅事件'],['ASN 单号','按编码规则 ASN-年月-流水生成','门户发起，WMS 收货校验'],['对账金额','取收货实绩 × 订单单价，差异需在门户申诉','WMS 实绩为准，财务复核'],['外部账号','由 IAM 托管，绑定供应商编码与数据范围','IAM 统一认证，禁止自建账号']]});

P('sourcing',{mod:'采购',type:'list',roles:['buyer','fin','admin'],title:'寻源询价',desc:'询价单发布、供应商报价、比价定标与结果发布，支持多轮报价与成本拆分。',
  jump:[['供应商管理','supplier'],['采购申请','purchase-req'],['采购订单','purchase-order']],
  filters:['询价单号','物料名称',{l:'状态',o:['全部','草稿','报价中','比价中','已定标']}],
  cols:[['code','询价单号',140,'mono'],['title','询价标题'],['material','物料',110,'mono'],['qty','数量',80],['quotes','报价家数',90],['deadline','截止时间',140],['status','状态',90,'tag',{'草稿':'muted','报价中':'info','比价中':'warning','已定标':'success'}],['owner','采购员',100]],
  sample:n=>({code:'RFQ-2026-0{nn}',title:'轴承年度框架询价 {n}',material:'M-882{nn}',qty:'10,000 件',quotes:3+n,deadline:'2026-11-1{n} 18:00',status:'报价中',owner:'刘采购'}),
  actions:[['create','新建询价','buyer'],['award','定标','buyer']],rowActions:[['detail','查看'],['compare','比价'],['award','定标','buyer'],['extend','延期','buyer']]});

P('purchase-req',{mod:'采购',type:'list',roles:['buyer','planner','wh','fin','admin'],title:'采购申请',desc:'需求部门提交采购申请，经预算与权限校验后转采购订单。',
  jump:[['采购订单','purchase-order'],['补货计划','replenish'],['待办中心','todo']],
  filters:['申请单号','物料编码',{l:'状态',o:['全部','草稿','待审批','已转订单','驳回']}],
  cols:[['code','申请单号',140,'mono'],['material','物料',110,'mono'],['name','物料名称'],['qty','数量',80],['demand','需求日期',110],['dept','申请部门',110],['status','状态',90,'tag',{'草稿':'muted','待审批':'warning','已转订单':'success','驳回':'danger'}],['owner','申请人',90]],
  sample:n=>({code:'PR-2026-0{nn}',material:'M-882{nn}',name:'轴承 {n} 型',qty:500+n*20,demand:'2026-11-2{n}',dept:'生产一部',status:'待审批',owner:'王计划'}),
  actions:[['create','新建申请','planner'],['import','导入']],rowActions:[['detail','查看'],['approve','审批','buyer'],['convert','转采购订单','buyer']]});

P('purchase-order',{mod:'采购',type:'list',roles:['buyer','supplier','wh','fin','admin'],title:'采购订单',desc:'采购订单创建、审批、下达与供应商确认，支持交期变更与分批收货。',
  jump:[['ASN 收货协同','asn'],['三单匹配对账','reconciliation'],['供应商管理','supplier']],
  kpis:[['本月订单','186','金额 2,340 万'],['待确认','12','供应商未确认'],['逾期','6','需跟催'],['准时交付','92.4%','较上月 +1.6%']],
  filters:['订单号','供应商',{l:'状态',o:['全部','草稿','待审批','已下达','部分收货','已完成']},'交期'],
  cols:[['code','订单号',140,'mono'],['supplier','供应商'],['material','物料',110,'mono'],['qty','数量',80],['amount','金额(元)',110,'num'],['delivery','交期',100],['status','状态',90,'tag',{'草稿':'muted','待审批':'warning','已下达':'info','部分收货':'warning','已完成':'success'}],['owner','采购员',100]],
  sample:n=>({code:'PO-2026-0{nn}',supplier:'华东精密制造 {n} 有限公司',material:'M-882{nn}',qty:500+n*10,amount:(128000+n*12000).toLocaleString(),delivery:'2026-11-2{n}',status:'已下达',owner:'刘采购'}),
  actions:[['create','新建订单','buyer'],['approve','批量审批','buyer'],['export','导出']],rowActions:[['detail','查看'],['confirm','确认','supplier'],['change','变更交期','buyer'],['close','关闭','buyer']],
  fields:[['订单号','系统生成，PO-年份-流水','只读'],['供应商','必须为已准入合格供应商','采购员选择'],['价格','取框架协议价或询价结果，超权限需审批','采购员/财务'],['交期','必填，变更需供应商确认','采购员'],['状态','草稿/待审批/已下达/部分收货/已完成','流程驱动']]});

P('asn',{mod:'采购',type:'list',roles:['buyer','supplier','wh','qc','admin'],title:'ASN 收货协同',desc:'供应商发货通知、预约到货、收货回执与来料检验结果回传。',
  jump:[['收货与上架','inbound'],['质量管理','quality'],['采购订单','purchase-order']],
  filters:['ASN 单号','供应商',{l:'状态',o:['全部','待发货','运输中','待收货','已收货','异常']}],
  cols:[['code','ASN 单号',140,'mono'],['po','采购订单',130,'mono'],['supplier','供应商'],['qty','发货数量',90],['eta','预计到货',110],['status','状态',90,'tag',{'待发货':'muted','运输中':'info','待收货':'warning','已收货':'success','异常':'danger'}],['qc','质检结果',90,'tag',{'合格':'success','待检':'warning','不合格':'danger'}]],
  sample:n=>({code:'ASN-2026-0{nn}',po:'PO-2026-0{nn}',supplier:'华东精密制造 {n} 有限公司',qty:200+n*20,eta:'2026-11-1{n}',status:'待收货',qc:'待检'}),
  actions:[['create','创建 ASN','supplier'],['appointment','到货预约','supplier']],rowActions:[['detail','查看'],['receive','确认收货','wh'],['qc','质检登记','qc'],['print','打印标签']]});

P('reconciliation',{mod:'采购',type:'list',roles:['buyer','supplier','fin','audit','admin'],title:'三单匹配对账',desc:'采购订单、收货单、发票三单匹配，差异生成工单，匹配通过后进入应付。',
  jump:[['采购订单','purchase-order'],['发票与结算','invoice-settlement'],['待办中心','todo']],
  flow:{steps:['供应商对账','三单匹配','差异处理','财务确认','付款排程'],current:1},
  kpis:[['待对账','18','金额 486 万'],['匹配通过','42','本月'],['差异单','5','超期 1 单'],['平均周期','1.6 天','目标 ≤2 天']],
  filters:['对账单号','供应商',{l:'状态',o:['全部','待对账','匹配中','有差异','已确认']},'对账周期'],
  cols:[['code','对账单号',140,'mono'],['supplier','供应商'],['period','对账周期',100],['amount','对账金额',110,'num'],['diff','差异金额',100,'num'],['status','状态',90,'tag',{'待对账':'warning','匹配中':'info','有差异':'danger','已确认':'success'}],['owner','采购员',100]],
  sample:n=>({code:'REC-2026-0{nn}',supplier:'华东精密制造 {n} 有限公司',period:'2026-10',amount:(286000+n*8000).toLocaleString(),diff:(n%3===0?1200:0).toLocaleString(),status:'有差异',owner:'刘采购'}),
  actions:[['create','发起对账','buyer'],['confirm','批量确认','fin']],rowActions:[['detail','查看'],['match','三单匹配','buyer'],['diff','差异处理','buyer'],['confirm','财务确认','fin']]});

/* ================= 生产 ================= */
P('work-order',{mod:'生产',type:'list',roles:['prod','planner','qc','admin'],title:'工单管理',desc:'工单接收、派工、开工、报工与完工入库；工单与 BOM、工艺、图纸版本强绑定。',
  jump:[['报工管理','report-work'],['质量检验','quality'],['批次追溯','trace']],
  tabs:[{name:'工单列表',cols:[['code','工单号',140,'mono'],['material','物料',110,'mono'],['name','产品名称'],['line','产线',100],['plan','计划量',80],['done','完成量',80],['progress','进度',110],['status','状态',90,'tag',{'待下达':'muted','已下达':'info','生产中':'warning','已完工':'success'}],['priority','优先级',80,'tag',{'高':'danger','中':'warning','低':'muted'}]],sample:n=>({code:'WO-2026-0{nn}',material:'M-882{nn}',name:'驱动总成 {n}',line:'总装一线',plan:200+n*10,done:120+n*15,progress:'',status:'生产中',priority:'高'})},
    {name:'派工看板',cols:[['code','工单号',140,'mono'],['step','工序',100],['center','工作中心',110],['worker','操作工',90],['plan','计划量',80],['start','计划开工',110],['status','状态',90,'tag',{'待派工':'warning','已派工':'info','进行中':'warning','已完成':'success'}]],sample:n=>({code:'WO-2026-0{nn}',step:'总装 {n}',center:'总装一线',worker:'李师傅',plan:50+n*5,start:'2026-11-1{n} 08:30',status:'已派工'})}],
  actions:[['create','新建工单','planner'],['dispatch','批量派工','prod'],['release','下达','planner']],rowActions:[['detail','查看'],['dispatch','派工','prod'],['start','开工','prod'],['report','报工','prod'],['close','完工','prod']]});

P('report-work',{mod:'生产',type:'list',roles:['prod','qc','planner','admin'],title:'报工管理',desc:'按工单与工序报工，记录良品、不良品、工时与物料消耗，实时回传 ERP。',
  jump:[['工单管理','work-order'],['质量管理','quality'],['安灯异常','andon']],
  kpis:[['今日报工','326','条'],['良品率','98.2%','较昨日 +0.3%'],['异常报工','4','待处理'],['同步延迟','< 10s','ERP 回传']],
  filters:['工单号',{l:'产线',o:['全部','总装一线','总装二线','机加线']},{l:'班次',o:['全部','白班','夜班']}],
  cols:[['code','报工单号',140,'mono'],['wo','工单号',130,'mono'],['step','工序',100],['good','良品数',80],['bad','不良数',80],['hours','工时',80],['worker','报工人',90],['time','报工时间',150],['status','状态',80,'tag',{'待审核':'warning','已同步':'success','异常':'danger'}]],
  sample:n=>({code:'RP-2026-0{nn}',wo:'WO-2026-0{nn}',step:'总装 {n}',good:80+n*5,bad:n%4,hours:(6+n*0.5).toFixed(1),worker:'李师傅',time:'2026-11-11 1{n}:2{n}',status:'已同步'}),
  actions:[['create','新增报工','prod'],['import','批量导入','prod']],rowActions:[['detail','查看'],['edit','修改','prod'],['approve','审核','prod'],['sync','重新同步','admin']]});

P('quality',{mod:'生产',type:'list',roles:['qc','prod','buyer','admin'],title:'质量管理',desc:'来料、过程、成品检验任务与不良品处置，支持抽检方案、判定与整改闭环。',
  jump:[['批次追溯','trace'],['ASN 收货协同','asn'],['安灯异常','andon']],
  tabs:[{name:'检验任务',cols:[['code','检验单号',140,'mono'],['type','检验类型',100],['ref','关联单据',130,'mono'],['material','物料',110,'mono'],['sample','抽样数',80],['result','结果',80,'tag',{'合格':'success','不合格':'danger','待检':'warning'}],['inspector','检验员',90],['time','检验时间',150]],sample:n=>({code:'QC-2026-0{nn}',type:'来料检验',ref:'ASN-2026-0{nn}',material:'M-882{nn}',sample:20+n,result:'合格',inspector:'赵质量',time:'2026-11-11 09:4{n}'})},
    {name:'不良品处置',cols:[['code','不良单号',140,'mono'],['source','来源',100],['material','物料',110,'mono'],['defect','缺陷描述'],['qty','数量',70],['disposal','处置方式',100],['status','状态',90,'tag',{'待评审':'warning','返工':'info','报废':'danger','已闭环':'success'}]],sample:n=>({code:'NC-2026-0{nn}',source:'过程检验',material:'M-882{nn}',defect:'装配间隙超差',qty:2+n,disposal:'返工',status:'待评审'})}],
  actions:[['create','新建检验','qc'],['sampling','抽样方案','qc']],rowActions:[['detail','查看'],['judge','判定','qc'],['disposal','处置','qc'],['close','闭环','qc']]});

P('trace',{mod:'生产',type:'list',roles:['qc','prod','sales','admin'],title:'批次追溯',desc:'按批次/序列号正向追踪去向、反向追溯来源，覆盖原料、工序、检验与发货。',
  jump:[['质量管理','quality'],['库存管理','inventory'],['发货单','shipment']],
  filters:['批次号/序列号','物料编码',{l:'追溯方向',o:['全部','正向','反向']}],
  cols:[['batch','批次号',140,'mono'],['material','物料',110,'mono'],['name','物料名称'],['supplier','供应商',130],['wo','来源工单',130,'mono'],['qc','检验结果',90,'tag',{'合格':'success','不合格':'danger'}],['to','当前去向',130],['time','入库时间',140]],
  sample:n=>({batch:'B2026110{nn}',material:'M-882{nn}',name:'轴承 {n} 型',supplier:'华东精密 {n}',wo:'WO-2026-0{nn}',qc:'合格',to:'成品仓 A-0{n}',time:'2026-11-0{n} 11:2{n}'}),
  actions:[['graph','追溯图谱'],['export','导出']],rowActions:[['forward','正向追溯'],['backward','反向追溯'],['detail','明细']]});

P('andon',{mod:'生产',type:'monitor',roles:['prod','qc','planner','admin'],title:'安灯异常',desc:'生产现场异常呼叫、响应、升级与关闭，按类型统计停机时长与响应时效。',
  jump:[['工单管理','work-order'],['报工管理','report-work'],['监控与 SLO','observability']],
  kpis:[['今日呼叫','14','已关闭 11'],['平均响应','3.2 min','目标 ≤5 min'],['未关闭','3','超时 1 单'],['停机时长','46 min','较昨日 -18%']],
  charts:[{type:'bar',title:'异常类型分布',sub:'近 7 天',labels:['设备','物料','质量','工艺','人员'],data:[18,12,9,5,3],color:'#ef4444'}],
  filters:[{l:'产线',o:['全部','总装一线','总装二线','机加线']},{l:'状态',o:['全部','待响应','处理中','已关闭','已升级']},{l:'类型',o:['全部','设备','物料','质量','工艺','人员']}],
  cols:[['code','呼叫编号',140,'mono'],['line','产线',100],['type','类型',80,'tag',{'设备':'danger','物料':'warning','质量':'info','工艺':'primary','人员':'muted'}],['desc','异常描述'],['caller','呼叫人工',90],['wait','等待时长',90],['status','状态',90,'tag',{'待响应':'danger','处理中':'warning','已关闭':'success','已升级':'danger'}],['time','呼叫时间',150]],
  sample:n=>({code:'AND-2026-0{nn}',line:'总装一线',type:'设备',desc:'拧紧枪扭矩报警',caller:'李师傅',wait:(n*2)+' min',status:'处理中',time:'2026-11-11 1{n}:0{n}'}),
  actions:[['call','发起呼叫','prod'],['upgrade','升级','prod']],rowActions:[['respond','响应','prod'],['detail','查看'],['close','关闭','prod'],['escalate','升级','prod']]});

P('equipment',{mod:'生产',type:'list',roles:['prod','qc','planner','admin'],title:'设备管理',desc:'设备台账、点检保养、故障报修与 OEE 分析；设备状态与停机实绩回传 MES，维修领用备件联动库存。',
  jump:[['安灯异常','andon'],['工单管理','work-order'],['库存管理','inventory']],
  kpis:[['设备总数','186','在用 168'],['故障中','4','待派工 2'],['OEE','82.6%','目标 ≥85%'],['本月停机','126 h','较上月 -8%']],
  charts:[{type:'bar',title:'设备 OEE Top5',sub:'本月',labels:['CNC-01','CNC-02','装配线A','注塑机B','检测台C'],data:[91,88,86,82,79],color:'#2563eb'}],
  filters:['设备编码','设备名称',{l:'类型',o:['全部','机加工','装配','检测','公用']},{l:'状态',o:['全部','运行','待机','故障','保养中','停用']}],
  tabs:[{name:'设备台账',cols:[['code','设备编码',130,'mono'],['name','设备名称'],['type','类型',90],['line','产线',100],['status','状态',90,'tag',{'运行':'success','待机':'info','故障':'danger','保养中':'warning','停用':'muted'}],['oee','OEE',70],['owner','责任人',90]],sample:n=>({code:'EQ-CNC-0{nn}',name:'数控加工中心 {n} 号',type:'机加工',line:'机加线',status:'运行',oee:(88-n)+'%',owner:'李设备'})},
    {name:'点检保养',cols:[['code','点检单号',130,'mono'],['equip','设备',120,'mono'],['plan','保养计划'],['cycle','周期',80],['last','上次执行',110],['next','下次到期',110],['status','状态',90,'tag',{'待执行':'warning','已完成':'success','已逾期':'danger'}]],sample:n=>({code:'PM-2026-0{nn}',equip:'CNC-0{n}',plan:'月度润滑与精度校验',cycle:'月度',last:'2026-10-1{n}',next:'2026-11-1{n}',status:'待执行'})},
    {name:'故障报修',cols:[['code','报修单号',130,'mono'],['equip','设备',120,'mono'],['fault','故障现象'],['level','等级',80,'tag',{'高':'danger','中':'warning','低':'muted'}],['owner','维修人',90],['down','停机时长',90],['status','状态',90,'tag',{'待派工':'warning','维修中':'info','已修复':'success'}]],sample:n=>({code:'RP-2026-0{nn}',equip:'CNC-0{n}',fault:'主轴异响、温升偏高',level:'中',owner:'王维修',down:(n*2)+' h',status:'维修中'})}],
  actions:[['create','新增设备','prod'],['check','批量点检','prod'],['export','导出']],
  rowActions:[['detail','查看'],['check','点检','prod'],['repair','报修','prod'],['stop','停用','admin']],
  fields:[['设备编码','由 MES 设备主数据生成，规则 EQ-产线-3 位流水','MES 唯一写入，ERP 订阅'],['设备状态','运行/待机/故障/保养中/停用，采集优先、人工可修正','设备采集 + 生产确认'],['点检周期','按设备类型配置日/周/月计划，逾期自动升级待办','设备管理维护'],['OEE','可用率 × 性能 × 良品率，T+1 计算','MES 采集，指标平台统一口径'],['维修备件','报修领用备件自动扣减库存并生成领料单','WMS 实绩为准']]});

/* ================= 仓储 ================= */
P('inbound',{mod:'仓储',type:'list',roles:['wh','qc','buyer','admin'],title:'收货与上架',desc:'到货预约、收货、质检、上架与异常处理，库存以 WMS 实绩为准回写 ERP。',
  jump:[['ASN 收货协同','asn'],['库存管理','inventory'],['质量管理','quality']],
  tabs:[{name:'收货任务',cols:[['code','收货单号',140,'mono'],['asn','ASN 单号',130,'mono'],['supplier','供应商'],['qty','应收数',80],['recv','已收数',80],['status','状态',90,'tag',{'待收货':'warning','部分收货':'info','已收货':'success','异常':'danger'}],['dock','月台',80],['time','预约时间',140]],sample:n=>({code:'RCV-2026-0{nn}',asn:'ASN-2026-0{nn}',supplier:'华东精密 {n}',qty:200+n*10,recv:150+n*10,status:'部分收货',dock:'D-0{n}',time:'2026-11-1{n} 10:00'})},
    {name:'上架任务',cols:[['code','上架单号',140,'mono'],['material','物料',110,'mono'],['batch','批次',120,'mono'],['qty','数量',80],['from','暂存位',90],['to','目标库位',100],['status','状态',90,'tag',{'待上架':'warning','上架中':'info','已完成':'success'}],['owner','作业员',90]],sample:n=>({code:'PUT-2026-0{nn}',material:'M-882{nn}',batch:'B2026110{nn}',qty:50+n*10,from:'STG-0{n}',to:'A-0{n}-0{n}',status:'待上架',owner:'王仓管'})}],
  actions:[['receive','收货登记','wh'],['putaway','生成上架任务','wh'],['print','打印标签','wh']],rowActions:[['detail','查看'],['qc','质检','qc'],['confirm','确认收货','wh'],['putaway','上架','wh']]});

P('outbound',{mod:'仓储',type:'list',roles:['wh','logi','sales','admin'],title:'拣货与发货',desc:'波次生成、拣货、复核、打包与发货交接，支持边拣边分与批量拣货。',
  jump:[['发货单','shipment'],['运输任务','transport-task'],['库存管理','inventory']],
  tabs:[{name:'拣货任务',cols:[['code','拣货单号',140,'mono'],['wave','波次',100],['order','订单数',80],['sku','SKU 数',80],['qty','件数',80],['zone','库区',80],['status','状态',90,'tag',{'待拣货':'warning','拣货中':'info','已拣货':'success','异常':'danger'}],['owner','拣货员',90]],sample:n=>({code:'PCK-2026-0{nn}',wave:'W-2026-11-0{n}',order:8+n,sku:16+n*3,qty:40+n*8,zone:'A 区',status:'拣货中',owner:'王仓管'})},
    {name:'复核发货',cols:[['code','复核单号',140,'mono'],['order','订单号',130,'mono'],['carrier','承运商',110],['qty','件数',80],['weight','重量',80],['status','状态',90,'tag',{'待复核':'warning','已复核':'info','已发货':'success','异常':'danger'}],['time','发货时间',140]],sample:n=>({code:'CHK-2026-0{nn}',order:'SO-2026-0{nn}',carrier:'顺丰速运',qty:4+n,weight:(12+n*2)+' kg',status:'已复核',time:'2026-11-11 1{n}:3{n}'})}],
  actions:[['wave','生成波次','wh'],['pick','领取任务','wh'],['ship','发货交接','wh']],rowActions:[['detail','查看'],['pick','拣货','wh'],['check','复核','wh'],['handover','交接','wh']]});

P('stocktake',{mod:'仓储',type:'list',roles:['wh','fin','audit','admin'],title:'盘点管理',desc:'全盘、抽盘与循环盘点，差异自动生成工单并进入审批与账务调整。',
  jump:[['库存管理','inventory'],['待办中心','todo'],['审计日志','audit']],
  filters:['盘点单号',{l:'仓库',o:['全部','华东成品仓','华南原料仓','线边仓']},{l:'状态',o:['全部','待盘点','盘点中','待审核','已调整']}],
  cols:[['code','盘点单号',140,'mono'],['wh','仓库',120],['type','盘点类型',100],['scope','范围',120],['diff','差异项',80],['amount','差异金额',110,'num'],['status','状态',90,'tag',{'待盘点':'warning','盘点中':'info','待审核':'warning','已调整':'success'}],['owner','负责人',90]],
  sample:n=>({code:'ST-2026-0{nn}',wh:'华东成品仓',type:'循环盘点',scope:'A 区 120 SKU',diff:n%4,amount:(n*860).toLocaleString(),status:'待审核',owner:'王仓管'}),
  actions:[['create','新建盘点','wh'],['assign','分配任务','wh']],rowActions:[['detail','查看'],['input','录入实盘','wh'],['diff','差异处理','wh'],['approve','审核调整','fin']]});

P('inventory',{mod:'仓储',type:'list',roles:['wh','planner','sales','fin','buyer','admin'],title:'库存管理',desc:'实物库存、可用库存、在途与锁定库存统一查询；可售库存由履约域计算，WMS 只报实物。',
  jump:[['库存分配','order-review'],['补货计划','replenish'],['盘点管理','stocktake']],
  kpis:[['库存 SKU','18,642','多仓合计'],['库存金额','1.26 亿','较上月 -2.1%'],['呆滞占比','6.2%','目标 ≤5%'],['库存准确率','99.6%','目标 ≥99.5%']],
  filters:['物料编码','仓库',{l:'库存状态',o:['全部','可用','锁定','质检中','隔离']},{l:'库龄',o:['全部','0-30 天','31-90 天','90 天以上']}],
  cols:[['material','物料编码',120,'mono'],['name','物料名称'],['wh','仓库',110],['loc','库位',90],['batch','批次',120,'mono'],['qty','实物库存',90,'num'],['lock','锁定',70],['available','可用',80,'num'],['status','状态',80,'tag',{'可用':'success','锁定':'warning','质检中':'info','隔离':'danger'}],['age','库龄',70]],
  sample:n=>({material:'M-882{nn}',name:'轴承 {n} 型',wh:'华东原料仓',loc:'A-0{n}-0{n}',batch:'B2026110{nn}',qty:1200+n*50,lock:n*10,available:1100+n*40,status:'可用',age:(n*12)+' 天'}),
  actions:[['export','导出'],['transfer','库存调拨','wh'],['freeze','冻结','wh']],rowActions:[['detail','查看'],['ledger','库存流水'],['transfer','调拨','wh'],['lock','锁定','wh']]});

/* ================= 履约 ================= */
P('order-pool',{mod:'履约',type:'list',roles:['sales','planner','fin','admin'],title:'订单池',desc:'多渠道订单统一接入、去重、合规校验与优先级排序，进入审核前暂存。',
  jump:[['订单审核与分单','order-review'],['客户 360','customer'],['销售订单','sales-order']],
  kpis:[['今日新增','1,286','多渠道'],['待审核','86','超时 6'],['异常订单','12','地址/信用'],['自动通过率','78%','规则校验']],
  filters:['订单号','客户',{l:'渠道',o:['全部','电商','直销','经销','API']},{l:'状态',o:['全部','待审核','已审核','异常','已取消']}],
  cols:[['code','订单号',140,'mono'],['channel','渠道',80],['customer','客户'],['amount','金额',100,'num'],['items','商品数',80],['priority','优先级',80,'tag',{'高':'danger','中':'warning','低':'muted'}],['status','状态',90,'tag',{'待审核':'warning','已审核':'success','异常':'danger','已取消':'muted'}],['time','下单时间',150]],
  sample:n=>({code:'SO-2026-0{nn}',channel:'电商',customer:'客户 {n} 有限公司',amount:(8600+n*1200).toLocaleString(),items:2+n,priority:'高',status:'待审核',time:'2026-11-11 10:{nn}'}),
  actions:[['import','批量导入'],['rule','规则校验','sales']],rowActions:[['detail','查看'],['audit','审核','sales'],['split','拆单'],['cancel','取消','sales']]});

P('order-review',{mod:'履约',type:'list',roles:['sales','planner','fin','wh','admin'],title:'订单审核与分单',desc:'信用、价格、库存校验，按仓库与承运规则自动分单，锁定可售库存。',
  jump:[['订单池','order-pool'],['发货单','shipment'],['库存管理','inventory']],
  flow:{steps:['订单校验','信用审核','库存分配','分单','生成发货单'],current:2},
  filters:['订单号','客户',{l:'审核状态',o:['全部','待审核','已审核','驳回']},{l:'分单状态',o:['全部','待分单','已分单','缺货']}],
  cols:[['code','订单号',140,'mono'],['customer','客户'],['amount','金额',100,'num'],['credit','信用校验',100,'tag',{'通过':'success','超额':'danger','待校验':'warning'}],['stock','库存分配',100,'tag',{'已锁定':'success','部分缺货':'warning','缺货':'danger'}],['warehouse','分仓',110],['status','状态',90,'tag',{'待审核':'warning','已审核':'info','已分单':'success','驳回':'danger'}],['time','审核时间',140]],
  sample:n=>({code:'SO-2026-0{nn}',customer:'客户 {n} 有限公司',amount:(8600+n*1200).toLocaleString(),credit:'通过',stock:'已锁定',warehouse:'华东仓',status:'已审核',time:'2026-11-11 11:{nn}'}),
  actions:[['batch','批量审核','sales'],['allocate','批量分配','planner']],rowActions:[['detail','查看'],['approve','审核','sales'],['allocate','库存分配','planner'],['split','拆单','sales'],['reject','驳回','sales']]});

P('shipment',{mod:'履约',type:'list',roles:['sales','wh','logi','admin'],title:'发货单',desc:'发货单生成、拣货出库、包装称重与承运交接，状态实时回传 OMS 与 CRM。',
  jump:[['拣货与发货','outbound'],['运输任务','transport-task'],['在途与签收','tracking']],
  filters:['发货单号','订单号',{l:'仓库',o:['全部','华东成品仓','华南成品仓']},{l:'状态',o:['全部','待拣货','待发货','已发货','已签收']}],
  cols:[['code','发货单号',140,'mono'],['order','订单号',130,'mono'],['customer','客户'],['warehouse','仓库',110],['qty','件数',80],['carrier','承运商',100],['status','状态',90,'tag',{'待拣货':'warning','待发货':'info','已发货':'info','已签收':'success'}],['time','发货时间',140]],
  sample:n=>({code:'SH-2026-0{nn}',order:'SO-2026-0{nn}',customer:'客户 {n} 有限公司',warehouse:'华东成品仓',qty:4+n,carrier:'顺丰速运',status:'已发货',time:'2026-11-11 1{n}:2{n}'}),
  actions:[['create','生成发货单','wh'],['print','打印面单','wh']],rowActions:[['detail','查看'],['pick','拣货','wh'],['ship','确认发货','wh'],['track','物流跟踪']]});

P('rma',{mod:'履约',type:'list',roles:['sales','wh','qc','fin','admin'],title:'退换货 RMA',desc:'退货申请、审核、退货入库、质检与退款/换货闭环，库存与应收联动冲减。',
  jump:[['订单审核与分单','order-review'],['收货与上架','inbound'],['应收应付','receivable-payable']],
  flow:{steps:['退货申请','审核','退货入库','质检','退款/换货'],current:1},
  kpis:[['待处理','9','超时 2'],['本月退货率','1.8%','目标 ≤2%'],['退款金额','12.6 万','本月'],['再销售率','72%','质检合格']],
  filters:['RMA 单号','原订单号',{l:'类型',o:['全部','退货','换货','维修']},{l:'状态',o:['全部','待审核','待入库','质检中','已退款','已关闭']}],
  cols:[['code','RMA 单号',140,'mono'],['order','原订单号',130,'mono'],['customer','客户'],['type','类型',80],['qty','数量',70],['reason','退货原因'],['status','状态',90,'tag',{'待审核':'warning','待入库':'info','质检中':'warning','已退款':'success','已关闭':'muted'}],['time','申请时间',140]],
  sample:n=>({code:'RMA-2026-0{nn}',order:'SO-2026-0{nn}',customer:'客户 {n} 有限公司',type:'退货',qty:1+n,reason:'外观划伤',status:'待审核',time:'2026-11-1{n} 09:3{n}'}),
  actions:[['create','新建 RMA','sales']],rowActions:[['detail','查看'],['approve','审核','sales'],['receive','退货入库','wh'],['qc','质检','qc'],['refund','退款','fin']]});

/* ================= 物流 ================= */
P('transport-task',{mod:'物流',type:'list',roles:['logi','wh','sales','admin'],title:'运输任务',desc:'运输任务生成、承运商指派、装车与发运；支持整车、零担与快递三类模式。',
  jump:[['承运商与运价','carrier'],['在途与签收','tracking'],['运费对账','freight']],
  filters:['运输单号','发货单号',{l:'运输模式',o:['全部','整车','零担','快递']},{l:'状态',o:['全部','待指派','待装车','运输中','已签收']}],
  cols:[['code','运输单号',140,'mono'],['shipment','发货单号',130,'mono'],['mode','模式',80],['from','起运地',110],['to','目的地',120],['carrier','承运商',100],['status','状态',90,'tag',{'待指派':'warning','待装车':'info','运输中':'info','已签收':'success'}],['eta','预计到达',120]],
  sample:n=>({code:'TR-2026-0{nn}',shipment:'SH-2026-0{nn}',mode:'零担',from:'上海工厂',to:'杭州 {n} 区',carrier:'安能物流',status:'运输中',eta:'2026-11-1{n} 18:00'}),
  actions:[['create','新建运输任务','logi'],['assign','批量指派','logi']],rowActions:[['detail','查看'],['assign','指派','logi'],['load','装车','wh'],['track','跟踪']]});

P('carrier',{mod:'物流',type:'list',roles:['logi','buyer','fin','admin'],title:'承运商与运价',desc:'承运商档案、线路覆盖、运价协议与时效承诺；承运商须在 ERP 建供应商档案并映射编码。',
  jump:[['运输任务','transport-task'],['运费对账','freight'],['供应商管理','supplier']],
  tabs:[{name:'承运商档案',cols:[['code','承运商编码',130,'mono'],['name','承运商名称'],['mode','覆盖模式',100],['lines','覆盖线路',140],['level','评级',80,'tag',{'A':'success','B':'info','C':'warning'}],['status','状态',80,'tag',{'合作中':'success','暂停':'warning','终止':'muted'}]],sample:n=>({code:'CAR-00{nn}',name:'安能物流 {n} 分公司',mode:'零担/整车',lines:'华东-华南 {n} 条',level:'A',status:'合作中'})},
    {name:'运价协议',cols:[['code','协议编号',130,'mono'],['carrier','承运商',130],['line','线路',140],['mode','计费方式',100],['price','单价',90],['valid','有效期',140],['status','状态',80,'tag',ST.ok]],sample:n=>({code:'PRC-2026-0{nn}',carrier:'安能物流',line:'上海-杭州',mode:'按重计费',price:'0.{n}8 元/kg',valid:'2026-01-01 ~ 2026-12-31',status:'生效'})}],
  actions:[['create','新增承运商','logi'],['price','新增运价','logi']],rowActions:[['detail','查看'],['edit','编辑','logi'],['map','供应商映射','fin']]});

P('tracking',{mod:'物流',type:'list',roles:['logi','sales','wh','admin'],title:'在途与签收',desc:'全链路轨迹、异常（延误/破损/丢件）上报与签收回单管理，回传 OMS。',
  jump:[['运输任务','transport-task'],['发货单','shipment'],['运费对账','freight']],
  map:'华东干线 · 12 条在途',
  tabs:[{name:'在途运输',cols:[['code','运单号',140,'mono'],['carrier','承运商',110],['route','线路',140],['node','当前节点',120],['progress','进度',110],['eta','预计到达',120],['status','状态',90,'tag',{'正常':'success','延误':'warning','异常':'danger'}]],sample:n=>({code:'WB-2026-0{nn}',carrier:'安能物流',route:'上海 → 杭州',node:'嘉兴中转场',progress:'',eta:'2026-11-1{n} 18:00',status:'正常'})},
    {name:'签收管理',cols:[['code','运单号',140,'mono'],['order','订单号',130,'mono'],['receiver','签收人',90],['sign','签收时间',140],['type','签收方式',100],['status','状态',90,'tag',{'已签收':'success','拒收':'danger','部分签收':'warning'}]],sample:n=>({code:'WB-2026-1{nn}',order:'SO-2026-0{nn}',receiver:'张先生',sign:'2026-11-1{n} 15:2{n}',type:'电子签收',status:'已签收'})}],
  actions:[['exception','异常上报','logi'],['export','导出']],rowActions:[['detail','查看'],['trace','轨迹'],['sign','签收回单'],['exception','异常上报','logi']]});

P('freight',{mod:'物流',type:'list',roles:['logi','fin','admin'],title:'运费对账',desc:'承运商账单与运单逐笔匹配，差异工单处理，确认后回传 ERP 计入成本与应付。',
  jump:[['承运商与运价','carrier'],['应收应付','receivable-payable'],['发票与结算','invoice-settlement']],
  kpis:[['本月运费','86.4 万','较上月 +3.2%'],['待对账','12','金额 18.2 万'],['差异单','3','超期 1 单'],['对账差异率','0.08%','目标 ≤0.1%']],
  filters:['对账单号','承运商',{l:'状态',o:['全部','待对账','有差异','已确认','已推送 ERP']},'账期'],
  cols:[['code','对账单号',140,'mono'],['carrier','承运商',130],['period','账期',90],['bills','运单数',80],['amount','账单金额',110,'num'],['diff','差异',90,'num'],['status','状态',90,'tag',{'待对账':'warning','有差异':'danger','已确认':'success','已推送 ERP':'success'}],['owner','对账人',90]],
  sample:n=>({code:'FR-2026-0{nn}',carrier:'安能物流',period:'2026-10',bills:120+n*10,amount:(86000+n*4200).toLocaleString(),diff:(n%3===0?180:0).toLocaleString(),status:'待对账',owner:'周物流'}),
  actions:[['import','导入账单','logi'],['confirm','批量确认','fin']],rowActions:[['detail','查看'],['match','运单匹配','logi'],['diff','差异处理','logi'],['push','推送 ERP','fin']]});

/* ================= 客户 ================= */
P('customer',{mod:'客户',type:'list',roles:['sales','mdm','fin','admin'],title:'客户 360',desc:'客户主数据、商机、交易与售后全景视图；客户编码按渠道形态二选一，信用额度由 ERP 授信。',
  jump:[['销售订单','sales-order'],['应收应付','receivable-payable'],['主数据管理','mdm']],
  tabs:[{name:'客户档案',cols:[['code','客户编码',130,'mono'],['name','客户名称'],['level','客户等级',90,'tag',{'KA':'danger','A':'success','B':'info','C':'muted'}],['channel','渠道',90],['credit','信用额度',110,'num'],['used','已用额度',110,'num'],['status','状态',80,'tag',{'正常':'success','冻结':'danger'}]],sample:n=>({code:'CUS-000{nn}',name:'客户 {n} 有限公司',level:'A',channel:'直销',credit:(500000+n*80000).toLocaleString(),used:(120000+n*20000).toLocaleString(),status:'正常'})},
    {name:'商机',cols:[['code','商机编号',130,'mono'],['customer','客户'],['name','商机名称'],['amount','预计金额',110,'num'],['stage','阶段',100],['prob','赢单率',80],['owner','销售',90],['status','状态',80,'tag',ST.wait]],sample:n=>({code:'OPP-2026-0{nn}',customer:'客户 {n} 有限公司',name:'年度驱动总成采购',amount:(260000+n*30000).toLocaleString(),stage:'方案确认',prob:(30+n*5)+'%',owner:'陈销售',status:'进行中'})},
    {name:'售后服务',cols:[['code','服务单号',130,'mono'],['customer','客户'],['type','服务类型',100],['issue','问题描述'],['owner','处理人',90],['status','状态',90,'tag',{'待受理':'warning','处理中':'info','已解决':'success','待回访':'warning'}]],sample:n=>({code:'SV-2026-0{nn}',customer:'客户 {n} 有限公司',type:'安装调试',issue:'设备运行异响',owner:'陈客服',status:'处理中'})}],
  actions:[['create','新增客户','sales'],['merge','客户查重合并','mdm']],rowActions:[['detail','查看 360'],['edit','编辑','sales'],['credit','信用查询','fin'],['merge','合并','mdm']]});

P('customer-portal',{mod:'客户',type:'list',roles:['customer','sales','fin','admin'],title:'客户门户',desc:'面向外部客户的统一入口：订单查询、物流轨迹、对账开票、售后提单与企业资料维护，客户账号由 IAM 托管并绑定客户编码。',
  jump:[['销售订单','sales-order'],['在途与签收','tracking'],['发票与结算','invoice-settlement'],['退换货 RMA','rma']],
  kpis:[['在途订单','8','今日送达 2'],['待签收','3','超期 1'],['待对账','2','金额 126 万'],['待开票','1','已申请']],
  tabs:[{name:'我的订单',cols:[['code','订单号',140,'mono'],['product','产品'],['qty','数量',80],['amount','金额',110,'num'],['delivery','承诺交期',110],['status','状态',90,'tag',{'待审核':'warning','执行中':'info','已发货':'info','已完成':'success'}]],sample:n=>({code:'SO-2026-1{nn}',product:'驱动总成 {n} 型',qty:20+n*5,amount:(96000+n*8600).toLocaleString(),delivery:'2026-11-2{n}',status:'执行中'})},
    {name:'物流轨迹',cols:[['code','运单号',140,'mono'],['order','订单号',140,'mono'],['carrier','承运商',110],['node','当前节点'],['eta','预计送达',110],['status','状态',90,'tag',{'运输中':'info','派送中':'warning','已签收':'success'}]],sample:n=>({code:'TRK-2026-0{nn}',order:'SO-2026-1{nn}',carrier:'德邦物流',node:'上海分拨中心',eta:'2026-11-1{n}',status:'运输中'})},
    {name:'对账与开票',cols:[['code','对账单号',140,'mono'],['period','账期',90],['amount','金额',110,'num'],['invoice','发票',90,'tag',{'未开票':'warning','已开票':'success'}],['status','状态',90,'tag',{'待确认':'warning','已确认':'success'}]],sample:n=>({code:'AR-2026-0{nn}',period:'2026-10',amount:(186000+n*12000).toLocaleString(),invoice:'已开票',status:'已确认'})},
    {name:'售后申请',cols:[['code','服务单号',130,'mono'],['product','产品'],['issue','问题描述'],['submit','提交时间',140],['status','状态',90,'tag',{'待受理':'warning','处理中':'info','已解决':'success'}]],sample:n=>({code:'SV-2026-0{nn}',product:'驱动总成 {n} 型',issue:'运行异响，需上门检查',submit:'2026-11-0{n}',status:'处理中'})}],
  actions:[['service','提交售后','customer'],['export','导出']],
  rowActions:[['detail','查看'],['confirm','确认收货','customer'],['invoice','下载发票']],
  fields:[['客户编码','门户不生成编码，注册查重通过后由 ERP 编码规则分配','ERP 唯一写入，门户只读'],['可见订单','仅可查看绑定客户编码的订单，数据范围由 IAM 下发','IAM 数据权限，越权返回 403'],['物流轨迹','承运商轨迹每 30 分钟同步，签收后归档','TMS 推送，门户只读'],['对账金额','以 ERP 应收为准，客户可在门户发起异议','ERP 唯一口径'],['售后单','门户提单自动生成 RMA 草稿并进入客服受理','门户可写，售后系统受理']]});

P('sales-order',{mod:'客户',type:'list',roles:['sales','fin','planner','admin'],title:'销售订单',desc:'销售订单创建、价格与信用校验、变更与关闭；B2B 以 ERP 为订单归属，B2C 由 OMS 承接。',
  jump:[['订单池','order-pool'],['订单审核与分单','order-review'],['应收应付','receivable-payable']],
  filters:['订单号','客户',{l:'订单来源',o:['全部','ERP','OMS','CRM']},{l:'状态',o:['全部','草稿','待审核','执行中','已完成','已取消']}],
  cols:[['code','订单号',140,'mono'],['customer','客户'],['source','来源',80],['amount','金额',110,'num'],['delivery','交期',100],['status','状态',90,'tag',{'草稿':'muted','待审核':'warning','执行中':'info','已完成':'success','已取消':'muted'}],['owner','销售',90],['time','下单时间',140]],
  sample:n=>({code:'SO-2026-1{nn}',customer:'客户 {n} 有限公司',source:'ERP',amount:(96000+n*8600).toLocaleString(),delivery:'2026-11-2{n}',status:'执行中',owner:'陈销售',time:'2026-11-0{n} 14:2{n}'}),
  actions:[['create','新建订单','sales'],['import','导入']],rowActions:[['detail','查看'],['edit','编辑','sales'],['change','变更','sales'],['close','关闭','sales']]});

/* ================= 财务协同 ================= */
P('receivable-payable',{mod:'财务协同',type:'dashboard',roles:['fin','exec','admin'],title:'应收应付',desc:'应收、应付、账龄与资金计划统一视图，业务单据与财务凭证双向可追溯。',
  jump:[['发票与结算','invoice-settlement'],['三单匹配对账','reconciliation'],['运费对账','freight']],
  kpis:[['应收账款','3,860 万','逾期 12.4%'],['应付账款','2,140 万','本月到期 680 万'],['逾期应收','478 万','较上月 +3.2%'],['资金缺口','120 万','未来 30 天']],
  charts:[{type:'line',title:'应收应付趋势',sub:'近 6 个月（万元）',labels:['6月','7月','8月','9月','10月','11月'],series:[['应收',[3600,3720,3810,3900,3940,3860],'#2563eb'],['应付',[1980,2050,2090,2120,2160,2140],'#06b6d4']]},{type:'donut',title:'应收账龄',sub:'按逾期天数',items:[['未到期',62,'#2563eb'],['1-30 天',18,'#06b6d4'],['31-90 天',12,'#f59e0b'],['90 天以上',8,'#ef4444']]}],
  cols:[['customer','往来单位'],['type','类型',80,'tag',{'应收':'info','应付':'warning'}],['amount','金额',110,'num'],['due','到期日',110],['overdue','逾期天数',90],['status','状态',80,'tag',{'正常':'success','逾期':'danger','已结清':'muted'}]],
  sample:n=>({customer:'客户 {n} 有限公司',type:'应收',amount:(186000+n*12000).toLocaleString(),due:'2026-11-2{n}',overdue:n*3,status:'逾期'}),rows:6});

P('invoice-settlement',{mod:'财务协同',type:'list',roles:['fin','buyer','sales','audit','admin'],title:'发票与结算',desc:'发票登记、验真、三单匹配与结算付款排程；与金税系统对接，异常发票进入人工复核。',
  jump:[['三单匹配对账','reconciliation'],['应收应付','receivable-payable'],['采购订单','purchase-order']],
  tabs:[{name:'发票管理',cols:[['code','发票号',140,'mono'],['type','类型',90,'tag',{'进项':'info','销项':'warning'}],['party','往来单位'],['amount','金额',110,'num'],['tax','税额',90,'num'],['date','开票日期',110],['status','状态',90,'tag',{'待验真':'warning','已验真':'success','异常':'danger','已认证':'success'}]],sample:n=>({code:'INV-2026-0{nn}',type:'进项',party:'华东精密 {n}',amount:(126000+n*8000).toLocaleString(),tax:(16380+n*1040).toLocaleString(),date:'2026-11-0{n}',status:'已验真'})},
    {name:'结算单',cols:[['code','结算单号',140,'mono'],['party','往来单位'],['period','结算周期',100],['amount','结算金额',110,'num'],['method','结算方式',100],['status','状态',90,'tag',{'待确认':'warning','已确认':'info','已付款':'success','驳回':'danger'}],['time','创建时间',140]],sample:n=>({code:'SET-2026-0{nn}',party:'华东精密 {n}',period:'2026-10',amount:(286000+n*12000).toLocaleString(),method:'电汇',status:'待确认',time:'2026-11-1{n} 10:2{n}'})}],
  actions:[['invoice','发票登记','fin'],['verify','批量验真','fin'],['settle','生成结算单','fin']],rowActions:[['detail','查看'],['verify','验真','fin'],['settle','结算','fin'],['voucher','查看凭证']]});

P('cost',{mod:'财务协同',type:'dashboard',roles:['fin','exec','prod','admin'],title:'成本核算',desc:'按产品与期间归集直接材料、直接人工与制造费用，输出单位成本、标准成本差异与毛利分析；核算结果回写 ERP 总账。',
  jump:[['应收应付','receivable-payable'],['库存管理','inventory'],['指标平台','indicator']],
  kpis:[['本月产品成本','2,860 万','环比 +1.8%'],['制造费用','412 万','分摊率 96%'],['成本差异','+2.3%','超标准 66 万'],['毛利率','23.8%','目标 ≥22%']],
  charts:[{type:'line',title:'单位成本与标准成本趋势',sub:'近 6 个月（元/台）',labels:['6月','7月','8月','9月','10月','11月'],series:[['单位成本',[3260,3245,3290,3310,3285,3305],'#2563eb'],['标准成本',[3200,3200,3220,3220,3240,3240],'#06b6d4']]},{type:'donut',title:'成本构成',sub:'按本月归集',items:[['直接材料',64,'#2563eb'],['直接人工',14,'#06b6d4'],['制造费用',16,'#f59e0b'],['外协加工',6,'#94a3b8']]}],
  cols:[['code','产品编码',130,'mono'],['name','产品名称'],['output','本月产量',100],['unit','单位成本',110,'num'],['std','标准成本',110,'num'],['diff','差异率',90],['margin','毛利率',90],['status','状态',90,'tag',{'正常':'success','超支':'warning','待核算':'info'}]],
  sample:n=>({code:'FG-2026-0{nn}',name:'驱动总成 {n} 型',output:(800+n*60).toLocaleString()+' 台',unit:(3200+n*35).toLocaleString(),std:'3,240',diff:'+'+(1.2+n*0.2).toFixed(1)+'%',margin:'23.8%',status:n>6?'超支':'正常'}),rows:8});

/* ================= 数据 ================= */
P('indicator',{mod:'数据',type:'list',roles:['data','exec','planner','fin','admin'],title:'指标平台',desc:'指标定义、口径、计算逻辑与责任人统一管理，指标变更走评审并留痕。',
  jump:[['自助报表','bi'],['数据质量与血缘','data-quality'],['经营驾驶舱','dashboard']],
  kpis:[['指标总数','286','已发布 264'],['本月新增','12','待评审 3'],['口径变更','5','已公告'],['引用系统','14','跨域指标 86']],
  chart:{type:'bar',title:'指标引用次数 Top6',sub:'近 30 天',labels:['履约率','库存准确率','准时交付','生产达成','运费占比','退货率'],data:[86,72,64,58,42,36],color:'#2563eb'},
  filters:['指标编码','指标名称',{l:'数据域',o:['全部','订单','库存','采购','生产','物流','财务']},{l:'状态',o:['全部','草稿','已发布','已下线']}],
  cols:[['code','指标编码',130,'mono'],['name','指标名称'],['domain','数据域',90],['unit','单位',70],['owner','责任人',90],['refs','引用次数',90],['status','状态',80,'tag',{'草稿':'muted','已发布':'success','已下线':'muted'}],['updated','更新时间',140]],
  sample:n=>({code:'KPI-0{nn}',name:'订单履约率',domain:'订单',unit:'%',owner:'王数据',refs:20+n*3,status:'已发布',updated:'2026-11-0{n} 10:2{n}'}),
  actions:[['create','新建指标','data'],['review','口径评审','data']],rowActions:[['detail','查看'],['edit','编辑','data'],['lineage','血缘'],['offline','下线','data']]});

P('bi',{mod:'数据',type:'dashboard',roles:['data','exec','planner','fin','sales','admin'],title:'自助报表',desc:'拖拽式报表与看板搭建，支持维度、指标、筛选与订阅推送，口径统一取自指标平台。',
  jump:[['指标平台','indicator'],['经营驾驶舱','dashboard'],['数据质量与血缘','data-quality']],
  kpis:[['我的报表','18','共享 6'],['今日访问','246','活跃用户 38'],['订阅任务','12','全部成功'],['平均加载','1.2s','P95 2.4s']],
  charts:[{type:'bar',title:'各工厂产值（万元）',sub:'2026 年 10 月',labels:['上海','苏州','杭州','宁波','合肥'],data:[8600,6200,5400,4800,3600],color:'#2563eb'},{type:'line',title:'订单履约率趋势',sub:'近 8 周',labels:['W1','W2','W3','W4','W5','W6','W7','W8'],series:[['履约率',[94.2,94.8,95.1,95.6,96,96.2,96.5,96.8],'#06b6d4']]}],
  cols:[['name','报表名称'],['domain','数据域',90],['owner','创建人',90],['views','访问量',80],['updated','更新时间',140],['status','状态',80,'tag',{'已发布':'success','草稿':'muted','已下线':'muted'}]],
  sample:n=>({name:'月度经营分析看板 {n}',domain:'经营',owner:'王数据',views:60+n*8,updated:'2026-11-0{n}',status:'已发布'}),rows:6,
  actions:[['create','新建报表','data'],['subscribe','订阅推送','data']]});

P('data-quality',{mod:'数据',type:'list',roles:['data','admin','audit'],title:'数据质量与血缘',desc:'稽核规则、质量评分、问题工单、字段级血缘与数据服务 API 统一管理。',
  jump:[['指标平台','indicator'],['主数据管理','mdm'],['集成与接口台账','integration']],
  tabs:[{name:'质量规则',cols:[['code','规则编号',120,'mono'],['name','规则名称'],['table','对象',130,'mono'],['rule','规则',160],['pass','通过率',80],['status','状态',80,'tag',{'正常':'success','预警':'warning','异常':'danger'}],['owner','责任人',90]],sample:n=>({code:'DQ-0{nn}',name:'物料编码唯一性',table:'dim_material',rule:'唯一 + 非空',pass:(99.8-n*0.1).toFixed(1)+'%',status:'正常',owner:'王数据'})},
    {name:'稽核工单',cols:[['code','工单号',130,'mono'],['rule','触发规则'],['object','对象'],['diff','差异数',80],['owner','处理人',90],['status','状态',90,'tag',{'待处理':'warning','处理中':'info','已修复':'success'}],['time','创建时间',140]],sample:n=>({code:'DQW-0{nn}',rule:'客户重复率',object:'dim_customer',diff:2+n,owner:'李主数据',status:'处理中',time:'2026-11-0{n} 09:2{n}'})},
    {name:'字段血缘',cols:[['source','源表',150,'mono'],['field','源字段',120,'mono'],['target','目标表',150,'mono'],['targetField','目标字段',110,'mono'],['job','加工作业',140],['level','层级',80]],sample:n=>({source:'ods_order',field:'order_id',target:'dws_fulfillment',targetField:'order_cnt',job:'dws_fulfill_daily',level:'ODS→DWS'})},
    {name:'数据服务',cols:[['code','服务编码',130,'mono'],['name','服务名称'],['path','API 路径',180,'mono'],['caller','调用方',110],['qps','QPS',70],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['owner','责任人',90]],sample:n=>({code:'DS-0{nn}',name:'库存可用量查询',path:'/api/v1/stock/available',caller:'OMS',qps:60+n*10,status:'启用',owner:'王数据'})}],
  actions:[['create','新建规则','data'],['run','立即稽核','data']],rowActions:[['detail','查看'],['run','执行','data'],['assign','派单','data']]});

/* ================= 公共能力 ================= */
P('mdm',{mod:'公共能力',type:'list',roles:['mdm','admin','data','audit'],title:'主数据管理',desc:'物料、供应商、客户、仓库与组织的唯一权威源；统一编码、准入、变更、分发与一致性核对。',
  jump:[['编码规则','coding'],['集成与接口台账','integration'],['数据质量与血缘','data-quality']],
  kpis:[['物料','18,642','重复 0'],['供应商','1,286','待准入 12'],['客户','2,480','重复 3'],['仓库/库位','86 / 4,210','一致率 99.7%']],
  tabs:[{name:'物料主数据',cols:[['code','物料编码',130,'mono'],['name','物料名称'],['type','类型',90],['spec','规格',130],['unit','单位',60],['status','状态',80,'tag',{'启用':'success','冻结':'warning','停用':'muted'}],['updated','更新时间',140]],sample:n=>({code:'M-882{nn}',name:'伺服电机 {n} 型',type:'原材料',spec:'220V/750W',unit:'台',status:'启用',updated:'2026-11-0{n}'})},
    {name:'供应商主数据',cols:[['code','供应商编码',130,'mono'],['name','供应商名称'],['cat','品类',90],['settle','结算主体',120],['status','状态',80,'tag',{'合格':'success','考察':'warning','冻结':'danger'}],['source','权威源',90]],sample:n=>({code:'SUP-000{nn}',name:'华东精密 {n}',cat:'机加工',settle:'华东精密科技有限公司',status:'合格',source:'SRM'})},
    {name:'客户主数据',cols:[['code','客户编码',130,'mono'],['name','客户名称'],['channel','渠道',90],['source','权威源',90],['dup','查重',80,'tag',{'通过':'success','疑似':'warning','重复':'danger'}],['status','状态',80,'tag',{'正常':'success','冻结':'danger'}]],sample:n=>({code:'CUS-000{nn}',name:'客户 {n} 有限公司',channel:'直销',source:'ERP',dup:'通过',status:'正常'})},
    {name:'仓库与库位',cols:[['code','仓库编码',120,'mono'],['name','仓库名称'],['type','类型',90],['locs','库位数',80],['source','权威源',90],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['updated','更新时间',140]],sample:n=>({code:'WH-0{nn}',name:'华东成品仓',type:'成品仓',locs:600+n*20,source:'ERP',status:'启用',updated:'2026-11-0{n}'})},
    {name:'组织主数据',cols:[['code','组织编码',120,'mono'],['name','组织名称'],['parent','上级组织',130],['type','类型',90],['source','权威源',100],['status','状态',80,'tag',{'启用':'success','停用':'muted'}]],sample:n=>({code:'ORG-0{nn}',name:'生产中心 {n}',parent:'制造事业部',type:'部门',source:'统一身份平台',status:'启用'})}],
  actions:[['create','新增主数据','mdm'],['distribute','重新分发','mdm'],['check','一致性核对','mdm']],rowActions:[['detail','查看'],['edit','编辑','mdm'],['history','变更历史'],['distribute','分发','mdm'],['freeze','冻结','mdm']],
  fields:[['物料编码','ERP 统一生成，PLM 只持临时码','仅 ERP/MDM 写入'],['供应商编码','SRM 生成，ERP 订阅','仅 SRM 写入'],['客户编码','B2B 取 ERP、B2C 取 CRM/CDP','按渠道二选一'],['仓库编码','ERP 生成并下发 WMS','ERP 唯一写入'],['库位编码','WMS 生成并回传映射','WMS 唯一写入'],['分发机制','实时增量 + 每日全量核对','系统自动']]});

P('iam',{mod:'公共能力',type:'list',roles:['admin','audit','sre'],title:'身份与权限',desc:'统一认证、单点登录、用户、角色与菜单权限管理，支持 RBAC + 数据权限（ABAC）。',
  jump:[['组织与岗位','org'],['审计日志','audit'],['多租户与菜单','tenant-menu']],
  kpis:[['用户数','1,286','活跃 986'],['角色数','24','内置 8'],['接入应用','14','SSO 覆盖 100%'],['异常登录','3','已拦截']],
  tabs:[{name:'用户管理',cols:[['account','账号',120,'mono'],['name','姓名',90],['dept','部门',120],['role','角色',110],['status','状态',80,'tag',{'启用':'success','锁定':'danger','停用':'muted'}],['last','最近登录',140]],sample:n=>({account:'zhang.{nn}',name:'张工',dept:'研发中心',role:'研发工程师',status:'启用',last:'2026-11-11 09:2{n}'})},
    {name:'角色权限',cols:[['code','角色编码',120,'mono'],['name','角色名称',110],['menus','菜单权限',90],['data','数据权限',120],['users','用户数',80],['status','状态',80,'tag',{'启用':'success','停用':'muted'}]],sample:n=>({code:'R-0{nn}',name:'采购员',menus:12+n,data:'本组织',users:20+n,status:'启用'})},
    {name:'SSO 应用',cols:[['code','应用编码',120,'mono'],['name','应用名称'],['protocol','协议',90],['sso','SSO 状态',90,'tag',{'已接入':'success','未接入':'warning'}],['owner','负责人',90],['updated','更新时间',140]],sample:n=>({code:'APP-0{nn}',name:'采购协同',protocol:'OIDC',sso:'已接入',owner:'李管理员',updated:'2026-11-0{n}'})}],
  actions:[['create','新建用户','admin'],['role','角色配置','admin'],['sync','同步组织','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['reset','重置密码','admin'],['lock','锁定','admin']]});

P('bpm',{mod:'公共能力',type:'list',roles:[ALL],title:'流程中心',desc:'BPMN 流程定义、版本发布、流程实例与我的审批；业务系统统一接入，不再各自实现审批。',
  jump:[['待办中心','todo'],['身份与权限','iam'],['规则引擎','rule']],
  flow:{steps:['流程设计','测试验证','发布生效','运行监控','版本下线'],current:2},
  tabs:[{name:'流程定义',cols:[['code','流程编码',130,'mono'],['name','流程名称'],['biz','业务域',100],['ver','版本',70,'mono'],['status','状态',80,'tag',{'草稿':'muted','已发布':'success','已下线':'muted'}],['owner','负责人',90],['updated','更新时间',140]],sample:n=>({code:'WF-0{nn}',name:'采购订单审批',biz:'采购',ver:'V1.{n}',status:'已发布',owner:'李管理员',updated:'2026-11-0{n}'})},
    {name:'流程实例',cols:[['code','实例编号',140,'mono'],['def','流程名称'],['starter','发起人',90],['node','当前节点',110],['status','状态',90,'tag',{'运行中':'info','已完成':'success','已终止':'danger','挂起':'warning'}],['time','开始时间',140]],sample:n=>({code:'INS-0{nn}',def:'采购订单审批',starter:'刘采购',node:'财务审批',status:'运行中',time:'2026-11-0{n} 10:2{n}'})},
    {name:'我的审批',cols:[['code','实例编号',140,'mono'],['def','流程名称'],['title','标题'],['starter','发起人',90],['arrive','到达时间',140],['status','状态',90,'tag',ST.wait]],sample:n=>({code:'INS-1{nn}',def:'ECN 变更审批',title:'ECN-2026-00{nn} 轴承规格变更',starter:'张工',arrive:'2026-11-11 09:2{n}',status:'待审批'})}],
  actions:[['design','新建流程','admin'],['deploy','发布','admin']],rowActions:[['detail','查看'],['model','流程设计','admin'],['approve','审批'],['terminate','终止','admin']]});

P('file',{mod:'公共能力',type:'list',roles:[ALL],title:'文件中心',desc:'统一文件与图纸存储、版本、水印、预览、分享与审计，替代共享盘与 FTP。',
  jump:[['图纸中心','drawing'],['审计日志','audit'],['通知中心','notify']],
  filters:['文件名','上传人',{l:'文件类型',o:['全部','图纸','合同','对账单','质检报告','其他']},{l:'密级',o:['全部','公开','内部','机密']}],
  cols:[['name','文件名'],['type','类型',90],['size','大小',90],['ver','版本',70,'mono'],['owner','上传人',90],['secret','密级',80,'tag',{'公开':'success','内部':'info','机密':'danger'}],['time','上传时间',140]],
  sample:n=>({name:'总装图 {n} 版本说明.pdf',type:'图纸',size:(2.4+n*0.3).toFixed(1)+' MB',ver:'V1.{n}',owner:'李工',secret:'内部',time:'2026-11-0{n} 16:2{n}'}),
  actions:[['upload','上传文件'],['folder','新建目录','admin']],rowActions:[['preview','预览'],['download','下载'],['version','版本'],['share','分享'],['delete','删除','admin']]});

P('coding',{mod:'公共能力',type:'list',roles:['mdm','admin','data'],title:'编码规则',desc:'物料、供应商、客户、仓库、单据号统一编码规则与号段管理，规则变更有版本与生效日期。',
  jump:[['主数据管理','mdm'],['物料申请','material-apply'],['集成与接口台账','integration']],
  filters:['规则编码','对象类型',{l:'状态',o:['全部','草稿','启用','停用']}],
  cols:[['code','规则编码',130,'mono'],['name','规则名称'],['object','对象',110],['pattern','规则表达式',200,'mono'],['seq','当前号段',100],['ver','版本',70,'mono'],['status','状态',80,'tag',{'草稿':'muted','启用':'success','停用':'muted'}],['updated','更新时间',140]],
  sample:n=>({code:'CR-0{nn}',name:'物料编码规则',object:'物料',pattern:'M-{类别}-{6位流水}',seq:'M-882-000{nn}',ver:'V1.{n}',status:'启用',updated:'2026-11-0{n}'}),
  actions:[['create','新建规则','mdm'],['test','规则测试','mdm']],rowActions:[['detail','查看'],['edit','编辑','mdm'],['publish','发布','mdm'],['history','版本历史']]});

P('notify',{mod:'公共能力',type:'list',roles:['admin','audit'],title:'通知中心',desc:'消息模板、渠道（站内信/邮件/短信/企业 IM）、发送策略与回执统计。',
  jump:[['消息中心','message'],['文件中心','file'],['审计日志','audit']],
  tabs:[{name:'消息模板',cols:[['code','模板编码',130,'mono'],['name','模板名称'],['scene','场景',120],['channel','渠道',100],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['updated','更新时间',140]],sample:n=>({code:'NT-0{nn}',name:'采购订单待审批提醒',scene:'采购审批',channel:'站内信+IM',status:'启用',updated:'2026-11-0{n}'})},
    {name:'渠道配置',cols:[['code','渠道编码',120,'mono'],['name','渠道名称'],['provider','服务商',120],['limit','限流',90],['status','状态',80,'tag',{'正常':'success','异常':'danger'}],['updated','更新时间',140]],sample:n=>({code:'CH-0{nn}',name:'企业微信',provider:'企业微信开放平台',limit:'1000 条/分',status:'正常',updated:'2026-11-0{n}'})},
    {name:'发送记录',cols:[['code','消息编号',130,'mono'],['template','模板',130],['receiver','接收人',90],['channel','渠道',90],['result','结果',80,'tag',{'成功':'success','失败':'danger','重试中':'warning'}],['time','发送时间',140]],sample:n=>({code:'MSG-0{nn}',template:'采购订单待审批提醒',receiver:'刘采购',channel:'企业微信',result:'成功',time:'2026-11-11 09:2{n}'})}],
  actions:[['create','新建模板','admin'],['test','发送测试','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['resend','重发','admin']]});

P('audit',{mod:'公共能力',type:'list',roles:['audit','admin','sre'],title:'审计日志',desc:'登录、权限、主数据、业务单据与配置变更全量留痕，支持按人、单号、时间检索，留存 ≥180 天。',
  jump:[['身份与权限','iam'],['配置与密钥','config'],['数据质量与血缘','data-quality']],
  filters:['操作人','对象/单号',{l:'操作类型',o:['全部','登录','查询','新增','修改','删除','审批','导出']},{l:'结果',o:['全部','成功','失败']},'时间范围'],
  cols:[['id','日志编号',130,'mono'],['user','操作人',90],['action','操作类型',90,'tag',{'登录':'info','新增':'primary','修改':'warning','删除':'danger','审批':'success','导出':'muted'}],['object','对象',140],['detail','详情'],['ip','IP',120,'mono'],['result','结果',70,'tag',{'成功':'success','失败':'danger'}],['time','时间',150]],
  sample:n=>({id:'LOG-2026-0{nn}',user:'刘采购',action:'审批',object:'PO-2026-0{nn}',detail:'采购订单审批通过',ip:'10.20.3.{nn}',result:'成功',time:'2026-11-11 10:{nn}'}),
  actions:[['export','导出日志','audit'],['policy','留存策略','admin']],rowActions:[['detail','查看详情'],['trace','关联链路']]});

P('integration',{mod:'公共能力',type:'list',roles:['admin','sre','data','audit'],title:'集成与接口台账',desc:'接口台账、连接器、调用日志与失败告警；所有跨系统调用经网关统一治理。',
  jump:[['主数据管理','mdm'],['监控与 SLO','observability'],['审计日志','audit']],
  kpis:[['接口总数','86','主数据 12'],['今日调用','182 万','成功率 99.96%'],['失败告警','6','已恢复 4'],['平均延迟','86 ms','P95 240 ms']],
  tabs:[{name:'接口台账',cols:[['code','接口编号',150,'mono'],['name','接口名称'],['source','源系统',100],['target','目标系统',100],['mode','方式',80],['sla','SLA',90],['owner','责任人',90],['status','状态',80,'tag',{'启用':'success','停用':'muted','退役':'muted'}]],sample:n=>({code:'IF-WMS-ERP-0{nn}',name:'出库实绩回写',source:'WMS',target:'ERP',mode:'REST',sla:'P95 ≤500ms',owner:'李集成',status:'启用'})},
    {name:'连接器',cols:[['code','连接器编码',130,'mono'],['name','连接器名称'],['system','对接系统',120],['protocol','协议',90],['status','状态',80,'tag',{'正常':'success','异常':'danger','停用':'muted'}],['updated','更新时间',140]],sample:n=>({code:'CON-0{nn}',name:'ERP 适配器',system:'ERP',protocol:'REST/DB',status:'正常',updated:'2026-11-0{n}'})},
    {name:'调用日志',cols:[['code','调用编号',140,'mono'],['api','接口',150,'mono'],['caller','调用方',100],['cost','耗时',80],['result','结果',70,'tag',{'成功':'success','失败':'danger'}],['time','时间',150]],sample:n=>({code:'CALL-0{nn}',api:'IF-WMS-ERP-001',caller:'WMS',cost:(40+n*8)+' ms',result:'成功',time:'2026-11-11 10:{nn}'})}],
  actions:[['create','登记接口','admin'],['test','连通测试','sre']],rowActions:[['detail','查看'],['log','调用日志'],['test','测试','sre'],['offline','下线','admin']]});

P('gateway',{mod:'公共能力',type:'list',roles:['sre','data','admin'],title:'API 网关管理',desc:'统一南北向流量入口：路由、鉴权、限流、熔断、灰度与访问日志集中配置，跨系统调用不得绕过网关直连服务。',
  jump:[['集成与接口台账','integration'],['监控与 SLO','observability'],['身份与权限','iam']],
  kpis:[['路由总数','128','启用 121'],['今日请求','182 万','成功率 99.96%'],['限流触发','12','较昨日 -4'],['平均延迟','86 ms','P95 210 ms']],
  tabs:[{name:'路由配置',cols:[['code','路由 ID',130,'mono'],['path','路径',180,'mono'],['target','后端服务',140],['auth','鉴权方式',100,'tag',{'OIDC':'success','API Key':'info','免鉴权':'warning'}],['limit','限流阈值',100],['status','状态',80,'tag',{'启用':'success','停用':'muted','灰度':'warning'}],['owner','责任人',90]],sample:n=>({code:'RT-0{nn}',path:'/api/v1/warehouse/**',target:'warehouse-service',auth:'OIDC',limit:'200 QPS',status:'启用',owner:'李运维'})},
    {name:'限流与灰度',cols:[['code','策略 ID',130,'mono'],['route','绑定路由',170,'mono'],['type','类型',90,'tag',{'限流':'warning','熔断':'danger','灰度':'info'}],['rule','规则'],['hit','今日触发',90],['status','状态',80,'tag',{'生效':'success','停用':'muted'}]],sample:n=>({code:'PL-0{nn}',route:'/api/v1/order/**',type:'灰度',rule:'按租户 10% → 50% → 100% 分阶段放量',hit:(n*3)+' 次',status:'生效'})},
    {name:'访问日志',cols:[['code','请求 ID',160,'mono'],['path','路径',180,'mono'],['caller','调用方',100],['status','状态码',90],['cost','耗时',90],['time','时间',150]],sample:n=>({code:'REQ-0{nn}',path:'/api/v1/stock/available',caller:'OMS',status:n===5?'429':'200',cost:(40+n*8)+' ms',time:'2026-11-11 10:{nn}'})}],
  actions:[['create','新增路由','sre'],['publish','发布变更','sre'],['export','导出']],
  rowActions:[['detail','查看'],['edit','编辑','sre'],['canary','灰度','sre'],['offline','下线','admin']],
  fields:[['路由 ID','全局唯一，规则 RT-4 位流水，发布后不可修改','网关唯一写入'],['路径','支持通配，前缀匹配优先，冲突校验不通过不允许发布','网关配置中心'],['鉴权方式','OIDC / API Key / 免鉴权；免鉴权需安全审批','IAM 统一签发'],['限流阈值','按 QPS 与并发双维度，触发返回 429 并记录审计','网关执行'],['灰度规则','按租户/用户/比例放量，可一键回滚','发布流水线，审计留痕']]});

P('event-bus',{mod:'公共能力',type:'list',roles:['sre','data','admin'],title:'消息总线',desc:'事件主题、订阅关系、死信重试与积压监控；业务事件采用 Outbox 模式发布，保证至少一次投递与幂等消费。',
  jump:[['集成与接口台账','integration'],['监控与 SLO','observability'],['调度任务','scheduler']],
  kpis:[['主题总数','46','启用 44'],['今日事件','96 万','峰值 2.4 万/分'],['死信消息','3','待重放'],['消费积压','1.2 万','关注 2 组']],
  tabs:[{name:'主题与订阅',cols:[['code','主题',190,'mono'],['domain','所属域',90],['producer','生产方',100],['consumers','订阅方',130],['tps','峰值 TPS',90],['status','状态',80,'tag',{'正常':'success','积压':'warning','停用':'muted'}]],sample:n=>({code:'warehouse.stock.moved.v{n}',domain:'仓储',producer:'WMS',consumers:'ERP、指标平台',tps:(800+n*120),status:'正常'})},
    {name:'死信队列',cols:[['code','消息 ID',160,'mono'],['topic','主题',190,'mono'],['reason','失败原因'],['retry','重试次数',90],['time','入队时间',150],['status','状态',90,'tag',{'待重放':'warning','已重放':'success','已丢弃':'danger'}]],sample:n=>({code:'MSG-0{nn}',topic:'warehouse.stock.moved.v1',reason:'下游超时（ERP）',retry:n,time:'2026-11-11 09:{nn}',status:'待重放'})},
    {name:'消费监控',cols:[['group','消费组',140,'mono'],['topic','订阅主题',190,'mono'],['lag','积压量',90],['rate','消费速率',110],['owner','责任人',90],['status','状态',80,'tag',{'正常':'success','延迟':'warning','停止':'danger'}]],sample:n=>({group:'cg-erp-stock',topic:'warehouse.stock.moved.v1',lag:(n*1200).toLocaleString(),rate:(600+n*60)+' 条/秒',owner:'李集成',status:'正常'})}],
  actions:[['create','新建主题','sre'],['replay','死信重放','sre'],['export','导出']],
  rowActions:[['detail','查看'],['subscribe','订阅配置','sre'],['replay','重放','sre'],['pause','暂停','admin']],
  fields:[['主题名','命名规范 域.实体.动作.v版本，全局唯一','消息总线唯一写入'],['生产方','必须为已登记系统，禁止匿名发布','集成台账校验'],['订阅方','订阅关系确定消费语义，新增需评审','订阅配置，审计留痕'],['死信','重试上限 5 次，人工重放需二次确认','总线托管，运维执行'],['积压告警','消费组积压超过阈值触发告警并升级','可观测平台统一告警']]});

P('rule',{mod:'公共能力',type:'list',roles:['admin','planner','fin'],title:'规则引擎',desc:'价格、信用、分单、补货与预警规则的可配置化管理，支持灰度与版本回滚。',
  jump:[['订单审核与分单','order-review'],['流程中心','bpm'],['指标平台','indicator']],
  filters:['规则编码','规则名称',{l:'规则类型',o:['全部','价格','信用','分单','补货','预警']},{l:'状态',o:['全部','草稿','启用','停用']}],
  cols:[['code','规则编码',130,'mono'],['name','规则名称'],['type','类型',90],['ver','版本',70,'mono'],['hits','今日命中',90],['status','状态',80,'tag',{'草稿':'muted','启用':'success','停用':'muted'}],['owner','负责人',90],['updated','更新时间',140]],
  sample:n=>({code:'RULE-0{nn}',name:'华东仓优先分单',type:'分单',ver:'V1.{n}',hits:120+n*30,status:'启用',owner:'李管理员',updated:'2026-11-0{n}'}),
  actions:[['create','新建规则','admin'],['simulate','规则仿真','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['publish','发布','admin'],['offline','停用','admin']]});

P('scheduler',{mod:'公共能力',type:'list',roles:['admin','sre','data'],title:'调度任务',desc:'分布式定时任务编排、分片执行、失败重试与告警，替代散落的 crontab。',
  jump:[['集成与接口台账','integration'],['监控与 SLO','observability'],['数据质量与血缘','data-quality']],
  filters:['任务编码','任务名称',{l:'状态',o:['全部','运行中','成功','失败','暂停']},{l:'类型',o:['全部','接口','数据','报表','清理']}],
  cols:[['code','任务编码',130,'mono'],['name','任务名称'],['cron','调度表达式',130,'mono'],['last','上次执行',140],['cost','耗时',80],['result','结果',80,'tag',{'成功':'success','失败':'danger','运行中':'info'},],['status','状态',80,'tag',{'运行中':'info','成功':'success','失败':'danger','暂停':'muted'}],['owner','负责人',90]],
  sample:n=>({code:'JOB-0{nn}',name:'库存日终对账',cron:'0 30 2 * * ?',last:'2026-11-11 02:30',cost:'86 s',result:'成功',status:'成功',owner:'李集成'}),
  actions:[['create','新建任务','admin'],['pause','批量暂停','admin']],rowActions:[['detail','查看'],['run','立即执行','admin'],['log','执行日志'],['edit','编辑','admin']]});

/* ================= 运维管控 ================= */
P('cicd',{mod:'运维管控',type:'list',roles:['sre','admin'],title:'CI/CD 与发布',desc:'流水线、构建、制品、部署与回滚；生产变更只经 GitOps 与合并请求触发。',
  jump:[['监控与 SLO','observability'],['配置与密钥','config'],['资源与成本','resource']],
  tabs:[{name:'流水线',cols:[['code','流水线',130,'mono'],['service','服务',130],['stage','当前阶段',120],['duration','耗时',80],['result','结果',80,'tag',{'成功':'success','失败':'danger','运行中':'info'}],['trigger','触发人',90],['time','开始时间',140]],sample:n=>({code:'PL-0{nn}',service:'warehouse-service',stage:'镜像扫描',duration:(6+n)+' min',result:'成功',trigger:'李运维',time:'2026-11-11 10:{nn}'})},
    {name:'发布记录',cols:[['code','发布单号',140,'mono'],['service','服务',130],['env','环境',80,'tag',{'prod':'danger','staging':'warning','test':'info'}],['ver','版本',90,'mono'],['strategy','策略',90],['status','状态',90,'tag',{'已发布':'success','灰度中':'warning','已回滚':'danger','待审批':'warning'}],['time','发布时间',140]],sample:n=>({code:'REL-2026-0{nn}',service:'warehouse-service',env:'prod',ver:'v1.8.{n}',strategy:'金丝雀 25%',status:'灰度中',time:'2026-11-11 11:{nn}'})},
    {name:'环境管理',cols:[['code','环境编码',120,'mono'],['name','环境名称'],['cluster','集群',120],['namespace','命名空间',130,'mono'],['status','状态',80,'tag',{'正常':'success','维护中':'warning','异常':'danger'}],['owner','负责人',90]],sample:n=>({code:'ENV-0{nn}',name:'生产环境',cluster:'k8s-prod-01',namespace:'prod-warehouse',status:'正常',owner:'李运维'})}],
  actions:[['create','新建流水线','sre'],['release','发起发布','sre'],['rollback','回滚','sre']],rowActions:[['detail','查看'],['run','执行','sre'],['log','日志'],['approve','发布审批','admin'],['rollback','回滚','sre']]});

P('observability',{mod:'运维管控',type:'monitor',roles:['sre','admin','audit'],title:'监控与 SLO',desc:'指标、日志、链路与告警统一平台，按服务查看 SLO、错误预算与告警分级。',
  jump:[['集成与接口台账','integration'],['CI/CD 与发布','cicd'],['资源与成本','resource']],
  kpis:[['可用性','99.97%','目标 99.95%'],['P95 延迟','186 ms','目标 ≤300 ms'],['告警','6','P1 0 · P2 2'],['错误预算剩余','72%','本周期']],
  charts:[{type:'line',title:'核心接口 P95 延迟',sub:'近 24 小时（ms）',labels:['00','04','08','12','16','20','24'],series:[['查询',[120,110,140,180,210,190,160],'#2563eb'],['写入',[180,170,210,260,290,270,230],'#06b6d4']]},{type:'bar',title:'告警分布',sub:'按级别',labels:['P1','P2','P3','P4'],data:[0,2,9,14],color:'#ef4444'}],
  filters:[{l:'级别',o:['全部','P1','P2','P3','P4']},{l:'状态',o:['全部','触发中','已确认','已恢复']},{l:'服务',o:['全部','gateway','mdm','warehouse-service','order-service']}],
  cols:[['code','告警编号',130,'mono'],['level','级别',70,'tag',{'P1':'danger','P2':'danger','P3':'warning','P4':'muted'}],['service','服务',130],['title','告警内容'],['value','当前值',90],['status','状态',80,'tag',{'触发中':'danger','已确认':'warning','已恢复':'success'}],['time','时间',140]],
  sample:n=>({code:'AL-2026-0{nn}',level:'P3',service:'warehouse-service',title:'接口错误率超过 1%',value:'1.2%',status:'触发中',time:'2026-11-11 1{n}:2{n}'}),
  actions:[['silence','静默','sre'],['slo','SLO 配置','sre']],rowActions:[['detail','查看'],['ack','确认','sre'],['trace','链路'],['silence','静默','sre']]});

P('config',{mod:'运维管控',type:'list',roles:['sre','admin'],title:'配置与密钥',desc:'配置中心与密钥托管：普通配置按环境隔离、支持灰度；密钥集中托管、动态注入与轮换。',
  jump:[['CI/CD 与发布','cicd'],['身份与权限','iam'],['审计日志','audit']],
  tabs:[{name:'配置项',cols:[['key','配置键',200,'mono'],['app','应用',120],['env','环境',80],['value','当前值',120],['ver','版本',70,'mono'],['status','状态',80,'tag',{'已发布':'success','待发布':'warning','已回滚':'danger'}],['updated','更新时间',140]],sample:n=>({key:'warehouse.pick.batch.size',app:'warehouse-service',env:'prod',value:'50',ver:'v{n}',status:'已发布',updated:'2026-11-0{n}'})},
    {name:'密钥管理',cols:[['key','密钥名称',160,'mono'],['app','使用方',120],['type','类型',90],['rotate','轮换周期',90],['last','最近轮换',110],['status','状态',80,'tag',{'正常':'success','即将过期':'warning','已禁用':'muted'}],['owner','负责人',90]],sample:n=>({key:'db/password',app:'mdm',type:'数据库',rotate:'90 天',last:'2026-09-1{n}',status:'正常',owner:'李运维'})}],
  actions:[['create','新增配置','sre'],['rotate','轮换密钥','sre']],rowActions:[['detail','查看'],['edit','编辑','sre'],['publish','发布','sre'],['history','历史版本']]});

P('resource',{mod:'运维管控',type:'dashboard',roles:['sre','admin','exec'],title:'资源与成本',desc:'容器资源用量、配额、闲置识别与成本分摊，按域/环境查看 CPU、内存与费用。',
  jump:[['CI/CD 与发布','cicd'],['监控与 SLO','observability'],['配置与密钥','config']],
  kpis:[['集群节点','18','可用 17'],['CPU 使用率','58%','水位正常'],['内存使用率','64%','水位正常'],['月度成本','42.6 万','环比 -3.1%']],
  charts:[{type:'bar',title:'各域资源成本（万元）',sub:'2026 年 11 月',labels:['仓储','履约','采购','生产','数据','公共'],data:[8.6,7.2,5.4,6.8,9.2,5.4],color:'#2563eb'},{type:'donut',title:'资源类型占比',sub:'按成本',items:[['计算',52,'#2563eb'],['存储',24,'#06b6d4'],['数据库',16,'#f59e0b'],['网络',8,'#94a3b8']]}],
  cols:[['domain','业务域',120],['namespace','命名空间',150,'mono'],['cpu','CPU 请求/使用',130],['mem','内存请求/使用',130],['cost','月成本(元)',110,'num'],['status','状态',80,'tag',{'正常':'success','偏高':'warning','闲置':'muted'}]],
  sample:n=>({domain:'仓储',namespace:'prod-warehouse',cpu:'24C / 14C',mem:'48G / 31G',cost:(86000+n*3200).toLocaleString(),status:'正常'}),rows:6});

/* ================= 系统管理 ================= */
P('org',{mod:'系统管理',type:'list',roles:['admin','mdm','audit'],title:'组织与岗位',desc:'公司、事业部、工厂、部门与岗位主数据；无统一身份平台时以 ERP 为源，有平台则以平台为源。',
  jump:[['身份与权限','iam'],['主数据管理','mdm'],['多租户与菜单','tenant-menu']],
  filters:['组织编码','组织名称',{l:'组织类型',o:['全部','集团','事业部','工厂','部门','班组']},{l:'状态',o:['全部','启用','停用']}],
  cols:[['code','组织编码',120,'mono'],['name','组织名称'],['parent','上级组织',130],['type','类型',90],['leader','负责人',90],['users','人数',70],['source','权威源',110],['status','状态',80,'tag',{'启用':'success','停用':'muted'}]],
  sample:n=>({code:'ORG-0{nn}',name:'生产中心 {n}',parent:'制造事业部',type:'部门',leader:'王主管',users:20+n*5,source:'统一身份平台',status:'启用'}),
  actions:[['create','新增组织','admin'],['sync','同步组织','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['add','新增下级','admin'],['disable','停用','admin']]});

P('dict-param',{mod:'系统管理',type:'list',roles:['admin','data'],title:'字典与参数',desc:'业务字典、枚举与系统参数统一维护，变更需审批并通知订阅系统。',
  jump:[['主数据管理','mdm'],['配置与密钥','config'],['审计日志','audit']],
  tabs:[{name:'业务字典',cols:[['code','字典编码',130,'mono'],['name','字典名称'],['items','字典项数',80],['owner','维护人',90],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['updated','更新时间',140]],sample:n=>({code:'DICT-0{nn}',name:'订单状态',items:8+n,owner:'李管理员',status:'启用',updated:'2026-11-0{n}'})},
    {name:'系统参数',cols:[['key','参数键',180,'mono'],['name','参数名称'],['value','参数值',110],['scope','作用域',90],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['updated','更新时间',140]],sample:n=>({key:'order.auto.audit.enabled',name:'订单自动审核开关',value:'true',scope:'全局',status:'启用',updated:'2026-11-0{n}'})}],
  actions:[['create','新增字典','admin'],['publish','发布','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['items','字典项'],['disable','停用','admin']]});

P('tenant-menu',{mod:'系统管理',type:'list',roles:['admin','sre'],title:'租户与菜单',desc:'多租户、菜单、按钮与接口权限配置，支撑多工厂复制与外部门户隔离。',
  jump:[['身份与权限','iam'],['组织与岗位','org'],['审计日志','audit']],
  tabs:[{name:'租户管理',cols:[['code','租户编码',120,'mono'],['name','租户名称'],['type','类型',90],['users','用户数',80],['status','状态',80,'tag',{'启用':'success','停用':'muted'}],['created','创建时间',120]],sample:n=>({code:'T-0{nn}',name:'华东制造基地',type:'工厂',users:120+n*10,status:'启用',created:'2026-0{n}-01'})},
    {name:'菜单管理',cols:[['code','菜单编码',120,'mono'],['name','菜单名称'],['type','类型',80,'tag',{'目录':'muted','菜单':'info','按钮':'primary'}],['path','路由',160,'mono'],['roles','可见角色',120],['order','排序',70],['status','状态',80,'tag',{'启用':'success','停用':'muted'}]],sample:n=>({code:'MENU-0{nn}',name:'库存管理',type:'菜单',path:'/warehouse/inventory',roles:'仓管员/计划员',order:10+n,status:'启用'})}],
  actions:[['create','新增租户','admin'],['menu','新增菜单','admin']],rowActions:[['detail','查看'],['edit','编辑','admin'],['disable','停用','admin']]});

/* ================= 帮助与异常 ================= */
P('search',{mod:'帮助与异常',type:'search',roles:[ALL],title:'全局搜索',desc:'跨页面、单据与主数据的统一搜索入口，按域分组展示，支持快捷键 Ctrl+K。',
  jump:[['采购订单','purchase-order'],['库存管理','inventory'],['BOM 管理','bom']],
  kpis:[['可搜索对象','12 类','单据/主数据/页面'],['索引延迟','< 5s','实时同步'],['今日搜索','1,286','次']]});

P('profile',{mod:'帮助与异常',type:'profile',roles:[ALL],title:'个人中心',desc:'个人资料、安全设置、通知偏好与登录设备管理，账号由统一 IAM 管理。',
  jump:[['消息中心','message'],['身份与权限','iam'],['待办中心','todo']]});

P('error',{mod:'帮助与异常',type:'error',roles:[ALL],title:'异常提示页',desc:'统一异常状态设计规范，覆盖无权限、页面不存在、服务异常、系统维护、网络中断与空数据。',
  jump:[['我的工作台','workbench'],['消息中心','message']],
  states:[['403','无访问权限','当前角色无权访问该功能，请联系管理员申请权限或切换角色。'],['404','页面不存在','地址可能已变更或页面已下线，请返回工作台重新进入。'],['500','服务暂时不可用','服务异常已自动上报，请稍后重试或联系运维。'],['维护','系统维护中','系统正在进行例行维护，预计 30 分钟后恢复。'],['网络','网络连接中断','请检查网络或 VPN 连接，恢复后页面会自动重连。'],['空','暂无数据','当前筛选条件下没有数据，可调整筛选条件或新建记录。']]});

/* ================= 能力覆盖映射（架构方案附录 A） ================= */
const CAPABILITIES = [
  ['统一门户',['workbench'],'专属',''],
  ['移动端',['workbench'],'借用','仅 PC 工作台承接，移动审批/报工/扫码视图未纳入本期 Demo'],
  ['供应商/客户门户',['supplier-portal','customer-portal'],'专属',''],
  ['API 网关',['gateway','integration'],'专属',''],
  ['BFF',['integration'],'N/A','由网关聚合层实现，无独立管理界面'],
  ['IAM 身份权限',['iam'],'专属',''],
  ['MDM 主数据',['mdm'],'专属',''],
  ['编码服务',['coding'],'专属',''],
  ['BPM 流程',['bpm','todo'],'专属',''],
  ['消息总线',['event-bus','integration'],'专属',''],
  ['文件与图纸',['file','drawing'],'专属',''],
  ['通知中心',['notify','message'],'专属',''],
  ['规则引擎',['rule'],'专属',''],
  ['分布式调度',['scheduler'],'专属',''],
  ['集成连接器',['integration'],'专属',''],
  ['研发协同',['material-apply','bom','routing','ecn','drawing'],'专属',''],
  ['计划',['forecast','sop','mps','replenish','capacity'],'专属',''],
  ['采购',['supplier','supplier-portal','sourcing','purchase-req','purchase-order','asn','reconciliation'],'专属',''],
  ['生产',['work-order','report-work','quality','trace','andon','equipment'],'专属',''],
  ['仓储',['inbound','outbound','stocktake','inventory'],'专属',''],
  ['履约',['order-pool','order-review','shipment','rma'],'专属',''],
  ['物流',['transport-task','carrier','tracking','freight'],'专属',''],
  ['客户',['customer','customer-portal','sales-order'],'专属',''],
  ['财务协同',['receivable-payable','invoice-settlement','cost'],'专属',''],
  ['数据采集',['data-quality','integration'],'借用','采集任务由调度与接口台账间接呈现，无独立采集配置页'],
  ['数仓分层',['data-quality','bi'],'借用','以血缘与报表承接，无 ODS/DWD/DWS/ADS 分层表管理页'],
  ['指标平台',['indicator'],'专属',''],
  ['数据质量',['data-quality'],'专属',''],
  ['数据服务',['data-quality'],'借用','以“数据服务”页签承接，无统一查询 API 独立管理页'],
  ['CI/CD',['cicd'],'专属',''],
  ['容器平台',['resource','cicd'],'借用','仅有资源与命名空间概览，无配额/弹性策略管理页'],
  ['可观测',['observability'],'专属',''],
  ['配置与密钥',['config'],'专属',''],
  ['安全扫描',['cicd'],'借用','仅流水线扫描阶段，无漏洞与许可证处置页'],
  ['成本管理',['resource'],'借用','由资源成本看板承接，无预算编制与审批页']
];

if (typeof window!=='undefined') window.PMP={ROLES,MENU,PAGES,CAPABILITIES};
if (typeof module!=='undefined') module.exports={ROLES,MENU,PAGES,CAPABILITIES};
