/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "drawing",
  "mod": "研发协同",
  "slug": "rd",
  "type": "list",
  "title": "图纸中心",
  "desc": "图纸上传、版本管理、水印预览与按工单发放，确保车间使用正确版本。",
  "roles": [
    "rd",
    "prod",
    "qc",
    "admin"
  ],
  "jump": [
    {
      "label": "BOM 管理",
      "id": "bom"
    },
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "文件中心",
      "id": "file"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "图纸编号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "图纸名称",
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
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    },
    {
      "key": "material",
      "label": "关联物料",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "owner",
      "label": "上传人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "已发布": "success",
        "已作废": "muted"
      }
    },
    {
      "key": "time",
      "label": "更新时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "图纸编号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "图纸名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "零件图",
        "装配图",
        "工艺图"
      ],
      "key": "type"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "已发布",
        "已作废"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "图纸编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "图纸名称",
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
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    },
    {
      "key": "material",
      "label": "关联物料",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "上传人",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "已发布",
        "已作废"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "更新时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "upload",
      "label": "上传图纸",
      "perm": "rd"
    },
    {
      "key": "batch",
      "label": "批量发放",
      "perm": "rd"
    }
  ],
  "rowActions": [
    {
      "key": "preview",
      "label": "预览"
    },
    {
      "key": "version",
      "label": "版本历史"
    },
    {
      "key": "download",
      "label": "下载"
    },
    {
      "key": "void",
      "label": "作废",
      "perm": "rd"
    }
  ]
} as any
