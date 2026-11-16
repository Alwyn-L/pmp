/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "tenant-menu",
  "mod": "系统管理",
  "slug": "system",
  "type": "list",
  "title": "租户与菜单",
  "desc": "多租户、菜单、按钮与接口权限配置，支撑多工厂复制与外部门户隔离。",
  "roles": [
    "admin",
    "sre"
  ],
  "jump": [
    {
      "label": "身份与权限",
      "id": "iam"
    },
    {
      "label": "组织与岗位",
      "id": "org"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "租户编码",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "租户名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
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
    },
    {
      "key": "created",
      "label": "创建时间",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "path",
      "label": "路由",
      "width": 160,
      "kind": "mono"
    },
    {
      "key": "roles",
      "label": "可见角色",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "order",
      "label": "排序",
      "width": 70,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "租户管理",
      "columns": [
        {
          "key": "code",
          "label": "租户编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "租户名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
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
        },
        {
          "key": "created",
          "label": "创建时间",
          "width": 120,
          "kind": "text"
        }
      ]
    },
    {
      "name": "菜单管理",
      "columns": [
        {
          "key": "code",
          "label": "菜单编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "菜单名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 80,
          "kind": "tag",
          "options": {
            "目录": "muted",
            "菜单": "info",
            "按钮": "primary"
          }
        },
        {
          "key": "path",
          "label": "路由",
          "width": 160,
          "kind": "mono"
        },
        {
          "key": "roles",
          "label": "可见角色",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "order",
          "label": "排序",
          "width": 70,
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
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "租户编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "租户名称",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": true
    },
    {
      "key": "users",
      "label": "用户数",
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
    },
    {
      "key": "created",
      "label": "创建时间",
      "type": "input",
      "required": false
    },
    {
      "key": "path",
      "label": "路由",
      "type": "input",
      "required": false
    },
    {
      "key": "roles",
      "label": "可见角色",
      "type": "input",
      "required": false
    },
    {
      "key": "order",
      "label": "排序",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增租户",
      "perm": "admin"
    },
    {
      "key": "menu",
      "label": "新增菜单",
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
      "key": "disable",
      "label": "停用",
      "perm": "admin"
    }
  ]
} as any
