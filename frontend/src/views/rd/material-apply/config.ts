/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "material-apply",
  "mod": "研发协同",
  "slug": "rd",
  "type": "list",
  "title": "物料申请",
  "desc": "研发阶段创建物料临时码并提交正式建档申请，正式编码由 ERP 生成后回写 PLM。",
  "roles": [
    "rd",
    "planner",
    "mdm",
    "admin"
  ],
  "jump": [
    {
      "label": "BOM 管理",
      "id": "bom"
    },
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "编码规则",
      "id": "coding"
    }
  ],
  "kpis": [
    {
      "label": "本月申请",
      "value": "48",
      "sub": "待审核 6"
    },
    {
      "label": "已建档",
      "value": "36",
      "sub": "转正式码"
    },
    {
      "label": "驳回",
      "value": "4",
      "sub": "资料不全"
    },
    {
      "label": "平均处理",
      "value": "1.8 天",
      "sub": "目标 ≤2 天"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "临时码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "物料类型",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "spec",
      "label": "规格型号",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "applicant",
      "label": "申请人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "待审核": "warning",
        "已建档": "success",
        "驳回": "danger"
      }
    },
    {
      "key": "time",
      "label": "申请时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "临时码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "物料名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审核",
        "已建档",
        "驳回"
      ],
      "key": "status"
    },
    {
      "type": "select",
      "label": "物料类型",
      "options": [
        "全部",
        "原材料",
        "半成品",
        "成品",
        "包装"
      ],
      "key": "type"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "临时码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "系统生成，规则 TMP-年份-流水号",
      "rule": "研发创建，只读"
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true,
      "tip": "必填，≤60 字符",
      "rule": "研发/主数据可编辑"
    },
    {
      "key": "type",
      "label": "物料类型",
      "type": "input",
      "required": true,
      "tip": "必填，枚举：原材料/半成品/成品/包装",
      "rule": "研发可编辑"
    },
    {
      "key": "spec",
      "label": "规格型号",
      "type": "input",
      "required": false,
      "tip": "必填，≤120 字符",
      "rule": "研发可编辑"
    },
    {
      "key": "applicant",
      "label": "申请人",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "待审核",
        "已建档",
        "驳回"
      ],
      "required": false,
      "tip": "草稿/待审核/已建档/驳回",
      "rule": "按流程流转"
    },
    {
      "key": "time",
      "label": "申请时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建物料申请",
      "perm": "rd"
    },
    {
      "key": "import",
      "label": "批量导入",
      "perm": "rd"
    },
    {
      "key": "export",
      "label": "导出"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "edit",
      "label": "编辑",
      "perm": "rd"
    },
    {
      "key": "submit",
      "label": "提交审核",
      "perm": "rd"
    },
    {
      "key": "approve",
      "label": "审核",
      "perm": "mdm"
    }
  ],
  "fields": [
    [
      "临时码",
      "系统生成，规则 TMP-年份-流水号",
      "研发创建，只读"
    ],
    [
      "物料名称",
      "必填，≤60 字符",
      "研发/主数据可编辑"
    ],
    [
      "物料类型",
      "必填，枚举：原材料/半成品/成品/包装",
      "研发可编辑"
    ],
    [
      "规格型号",
      "必填，≤120 字符",
      "研发可编辑"
    ],
    [
      "正式物料编码",
      "ERP 建档后回写，只读",
      "仅系统写入"
    ],
    [
      "状态",
      "草稿/待审核/已建档/驳回",
      "按流程流转"
    ]
  ]
} as any
