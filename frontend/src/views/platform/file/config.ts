/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "file",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "文件中心",
  "desc": "统一文件与图纸存储、版本、水印、预览、分享与审计，替代共享盘与 FTP。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "图纸中心",
      "id": "drawing"
    },
    {
      "label": "审计日志",
      "id": "audit"
    },
    {
      "label": "通知中心",
      "id": "notify"
    }
  ],
  "columns": [
    {
      "key": "name",
      "label": "文件名",
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
      "key": "size",
      "label": "大小",
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
      "key": "owner",
      "label": "上传人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "secret",
      "label": "密级",
      "width": 80,
      "kind": "tag",
      "options": {
        "公开": "success",
        "内部": "info",
        "机密": "danger"
      }
    },
    {
      "key": "time",
      "label": "上传时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "文件名",
      "key": "name"
    },
    {
      "type": "text",
      "label": "上传人",
      "key": "owner"
    },
    {
      "type": "select",
      "label": "文件类型",
      "options": [
        "全部",
        "图纸",
        "合同",
        "对账单",
        "质检报告",
        "其他"
      ]
    },
    {
      "type": "select",
      "label": "密级",
      "options": [
        "全部",
        "公开",
        "内部",
        "机密"
      ],
      "key": "secret"
    }
  ],
  "formFields": [
    {
      "key": "name",
      "label": "文件名",
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
      "key": "size",
      "label": "大小",
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
      "key": "owner",
      "label": "上传人",
      "type": "input",
      "required": false
    },
    {
      "key": "secret",
      "label": "密级",
      "type": "select",
      "options": [
        "公开",
        "内部",
        "机密"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "上传时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "upload",
      "label": "上传文件"
    },
    {
      "key": "folder",
      "label": "新建目录",
      "perm": "admin"
    }
  ],
  "rowActions": [
    {
      "key": "preview",
      "label": "预览"
    },
    {
      "key": "download",
      "label": "下载"
    },
    {
      "key": "version",
      "label": "版本"
    },
    {
      "key": "share",
      "label": "分享"
    },
    {
      "key": "delete",
      "label": "删除",
      "perm": "admin"
    }
  ]
} as any
