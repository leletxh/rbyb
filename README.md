# 🚫 rbyb-移除B站“插件影响”黄色提示横幅

> ✅ 专治 Bilibili 弹出的 “检测到您的页面展示可能受到浏览器插件影响” 黄色提示  
> ✅ 智能监听 + 成功即休眠，不占资源、不删错元素、绝不白屏  
> ✅ MIT 协议开源，自由使用、修改、分发 —— 为清爽浏览而生！

---

> 实际效果：黄色提示条瞬间消失，页面结构完好无损，无任何副作用。

---

## 📦 安装方式

### 方法一：Tampermonkey 一键安装（推荐）

👉 [**Greasy Fork 安装页面（尚未发布）**](https://greasyfork.org/zh-CN/scripts/xxxxx)（发布后替换链接）

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)（支持 Chrome / Edge / Firefox）
2. 点击上面链接 → “安装此脚本”
3. 刷新 Bilibili 页面，享受清净！

### 方法二：手动安装

1. 在 Tampermonkey 中点击 “创建新脚本”
2. 全选删除默认内容，粘贴本仓库中的 `bilibili-adblock-tips-remover.user.js`
3. 保存 → 刷新 B 站页面

---

## ⚙️ 脚本特性

| 特性 | 说明 |
|------|------|
| 🎯 **精准删除** | 只删 `.adblock-tips` 容器或包含提示文字的 `<p>/<div>`，绝不碰 `#i_cecream`、`<body>` 等关键元素 |
| 🌙 **智能休眠** | 无轮询！仅靠 `MutationObserver` 监听 DOM 变化，有活才醒，省电省资源 |
| 🛑 **删完即停** | 成功删除后自动断开监听，脚本彻底休眠，零后台负担 |
| 🛡️ **防白屏** | 多重保护机制，确保不会误删导致页面崩溃 |
| 📜 **MIT开源** | 自由使用、修改、商用，只需保留原作者和许可声明 |

---

## 🧠 技术原理

```js
// 1. 优先通过 CSS 类名直接定位删除
document.querySelector('.adblock-tips')?.remove();

// 2. 兜底方案：文本匹配 + 安全过滤
[...document.querySelectorAll('p, div')].filter(el => {
    // 排除危险元素
    if (el.id === 'i_cecream' || el.tagName === 'BODY') return false;
    // 匹配提示文字
    return el.innerText?.includes("检测到您的页面展示可能受到浏览器插件影响");
}).forEach(el => el.remove());
```

→ 删完立即 `observer.disconnect()` + 标记 `hasRemoved = true`，脚本进入“永久休眠”。

---

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request！

- 💡 发现新版本 B 站提示没删掉？→ 请贴出 `outerHTML`
- 🐛 遇到白屏/报错？→ 请提供控制台日志和复现步骤
- ✨ 想加新功能？→ 欢迎讨论！

---

## 📜 开源许可

```
MIT License

Copyright (c) 2025 Leletxh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software [...] 
（完整许可证见脚本头部或 LICENSE 文件）
```

---

## ❤️ 致谢

- 感谢 [Tampermonkey](https://www.tampermonkey.net/) 提供强大平台
- 感谢所有为开源社区贡献的开发者
- 感谢你选择本脚本 —— 你的每一次使用，都是对清净浏览体验的投票！

---

> 🐬 “像海獭一样优雅地解决问题 —— 快、准、稳，然后躺平休眠。”  
> —— Leletxh, 2025

---

✅ **现在就去安装，还你一个清净的 Bilibili！**

---

