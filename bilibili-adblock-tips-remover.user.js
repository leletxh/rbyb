// ==UserScript==
// @name         移除B站“插件影响”提示（智能休眠版）
// @namespace    https://github.com/leletxh/rbyb/
// @version      2.0
// @description  删除B站的该死的黄色横幅！！！智能休眠监听，删除成功后彻底停止。
// @author       Leletxh
// @match        *://*.bilibili.com/*
// @grant        none
// @run-at       document-body
// @inject-into  content
// @license      MIT
// ==/UserScript==

/*
MIT License

Copyright (c) 2025 Leletxh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {
    'use strict';

    let observer;
    let hasRemoved = false; // 标记是否已删除，避免重复操作

    function removeNotice() {
        if (hasRemoved) return; // 已删除，直接跳过

        // 第一优先级：直接删除已知容器（最安全高效）
        const tipsContainer = document.querySelector('.adblock-tips');
        if (tipsContainer) {
            tipsContainer.remove();
            console.log('[B站提示移除器] ✅ 已删除 .adblock-tips 容器');
            cleanup();
            return;
        }

        // 第二优先级：文本匹配，但排除危险元素
        const txt = "检测到您的页面展示可能受到浏览器插件影响";
        const elements = [...document.querySelectorAll('p, div')].filter(el => {
            if (
                el.id === 'i_cecream' ||
                el.tagName === 'BODY' ||
                el.tagName === 'HTML' ||
                el.closest('#i_cecream') === null
            ) {
                return false;
            }
            return el.innerText?.includes?.(txt);
        });

        if (elements.length > 0) {
            elements.forEach(el => {
                el.remove();
                console.log('[B站提示移除器] ✅ 文本匹配删除:', el);
            });
            console.log(`[B站提示移除器] 🎉 成功删除 ${elements.length} 个提示元素`);
            cleanup();
        }
    }

    function cleanup() {
        hasRemoved = true;
        if (observer) {
            observer.disconnect();
            console.log('[B站提示移除器] 🛑 监听已断开，脚本进入休眠状态。');
        }
    }

    // 等待 body 可用（因为 @run-at document-body，通常不需要，但加固一下）
    if (!document.body) {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // 首次检查
        removeNotice();

        // 如果还没删掉，启动智能监听（休眠等待模式）
        if (!hasRemoved) {
            observer = new MutationObserver(() => {
                removeNotice();
            });
            observer.observe(document.body, { childList: true, subtree: true });
            console.log('[B站提示移除器] 🌙 进入休眠监听模式，等待 DOM 变化...');
        }
    }
})();
