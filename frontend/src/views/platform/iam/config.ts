/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "iam",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "身份与权限",
  "desc": "统一认证、单点登录、用户、角色与菜单权限管理，支持 RBAC + 数据权限（ABAC）。",
  "roles": [
    "admin",
    "audit",
    "sre"
  ],
  "jump": [
    {
      "label": "组织与岗位",
      "id": "org"
    },
    {
      "label": "审计日志",
      "id": "audit"
    },
    {
      "label": "多租户与菜单",
      "id": "tenant-menu"
    }
  ],
  "kpis": [
    {
      "label": "用户数",
      "value": "1,286",
      "sub": "活跃 986"
    },
    {
      "label": "角色数",
      "value": "24",
      "sub": "内置 8"
    },
    {
      "label": "接入应用",
      "value": "14",
      "sub": "SSO 覆盖 100%"
    },
    {
      "label": "异常登录",
      "value": "3",
      "sub": "已拦截"
    }
  ],
  "columns": [
    {
      "key": "account",
      "label": "账号",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "姓名",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "dept",
      "label": "部门",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "role",
      "label": "角色",
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
        "锁定": "danger",
        "停用": "muted"
      }
    },
    {
      "key": "last",
      "label": "最近登录",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "code",
      "label": "角色编码",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "menus",
      "label": "菜单权限",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "data",
      "label": "数据权限",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "users",
      "label": "用户数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "protocol",
      "label": "协议",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "sso",
      "label": "SSO 状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "已接入": "success",
        "未接入": "warning"
      }
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "用户管理",
      "columns": [
        {
          "key": "account",
          "label": "账号",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "姓名",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "dept",
          "label": "部门",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "role",
          "label": "角色",
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
            "锁定": "danger",
            "停用": "muted"
          }
        },
        {
          "key": "last",
          "label": "最近登录",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "角色权限",
      "columns": [
        {
          "key": "code",
          "label": "角色编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "角色名称",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "menus",
          "label": "菜单权限",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "data",
          "label": "数据权限",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "users",
          "label": "用户数",
          "width": 80,
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
      ]
    },
    {
      "name": "SSO 应用",
      "columns": [
        {
          "key": "code",
          "label": "应用编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "应用名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "protocol",
          "label": "协议",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "sso",
          "label": "SSO 状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "已接入": "success",
            "未接入": "warning"
          }
        },
        {
          "key": "owner",
          "label": "负责人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "updated",
          "label": "更新时间",
          "width": 140,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "account",
      "label": "账号",
      "type": "input",
      "required": true
    },
    {
      "key": "name",
      "label": "姓名",
      "type": "input",
      "required": true
    },
    {
      "key": "dept",
      "label": "部门",
      "type": "input",
      "required": true
    },
    {
      "key": "role",
      "label": "角色",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
        "锁定",
        "停用"
      ],
      "required": false
    },
    {
      "key": "last",
      "label": "最近登录",
      "type": "input",
      "required": false
    },
    {
      "key": "code",
      "label": "角色编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "menus",
      "label": "菜单权限",
      "type": "input",
      "required": false
    },
    {
      "key": "data",
      "label": "数据权限",
      "type": "input",
      "required": false
    },
    {
      "key": "users",
      "label": "用户数",
      "type": "input",
      "required": false
    },
    {
      "key": "protocol",
      "label": "协议",
      "type": "input",
      "required": false
    },
    {
      "key": "sso",
      "label": "SSO 状态",
      "type": "select",
      "options": [
        "已接入",
        "未接入"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
      "type": "input",
      "required": false
    },
    {
      "key": "updated",
      "label": "更新时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建用户",
      "perm": "admin"
    },
    {
      "key": "role",
      "label": "角色配置",
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
      "key": "reset",
      "label": "重置密码",
      "perm": "admin"
    },
    {
      "key": "lock",
      "label": "锁定",
      "perm": "admin"
    }
  ]
} as any
