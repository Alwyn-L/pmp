/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "org",
  "mod": "系统管理",
  "slug": "system",
  "type": "list",
  "title": "组织与岗位",
  "desc": "公司、事业部、工厂、部门与岗位主数据；无统一身份平台时以 ERP 为源，有平台则以平台为源。",
  "roles": [
    "admin",
    "mdm",
    "audit"
  ],
  "jump": [
    {
      "label": "身份与权限",
      "id": "iam"
    },
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "多租户与菜单",
      "id": "tenant-menu"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "组织编码",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "组织名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "parent",
      "label": "上级组织",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "leader",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "users",
      "label": "人数",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "权威源",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "启用": "success",
        "停用": "muted"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "组织编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "组织名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "组织类型",
      "options": [
        "全部",
        "集团",
        "事业部",
        "工厂",
        "部门",
        "班组"
      ]
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "启用",
        "停用"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "组织编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "组织名称",
      "type": "input",
      "required": true
    },
    {
      "key": "parent",
      "label": "上级组织",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": false
    },
    {
      "key": "leader",
      "label": "负责人",
      "type": "input",
      "required": false
    },
    {
      "key": "users",
      "label": "人数",
      "type": "input",
      "required": false
    },
    {
      "key": "source",
      "label": "权威源",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
        "停用"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增组织",
      "perm": "admin"
    },
    {
      "key": "sync",
      "label": "同步组织",
      "perm": "admin"
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
      "perm": "admin"
    },
    {
      "key": "add",
      "label": "新增下级",
      "perm": "admin"
    },
    {
      "key": "disable",
      "label": "停用",
      "perm": "admin"
    }
  ]
} as any
