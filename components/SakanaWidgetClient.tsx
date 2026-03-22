'use client';

import { useEffect, useRef } from 'react';
import SakanaWidget from 'sakana-widget';

import 'sakana-widget/lib/index.css';

import classes from './SakanaWidgetClient.module.css';

/**
 * Sakana Widget 的 React 包裝元件。
 * container div 由 useEffect 手動建立並直接附加到 document.body，
 * 完全脫離 React 的渲染樹，避免語言切換時 re-render 造成的
 * DOM removeChild 時序衝突。
 */
export default function SakanaWidgetClient() {
  const widgetRef = useRef<SakanaWidget | null>(null);

  useEffect(() => {
    // 手動建立 container 並附加到 body，不透過 React 渲染
    const container = document.createElement('div');
    container.className = classes.container;
    document.body.appendChild(container);

    // 修改所有內建角色的 initialState，讓切換角色後也維持慢速永續
    const slowState = { i: 0.001, d: 1 };
    for (const name of ['chisato', 'takina']) {
      const char = SakanaWidget.getCharacter(name);
      if (char) {
        char.initialState = { ...char.initialState, ...slowState };
        SakanaWidget.registerCharacter(name, char);
      }
    }

    // 註冊自訂角色 musashi，以 takina（橫向擺動）為基底
    const takina = SakanaWidget.getCharacter('takina');
    if (takina) {
      SakanaWidget.registerCharacter('musashi', {
        ...takina,
        image: '/images/musashi.png',
        initialState: { ...takina.initialState, ...slowState },
      });
    }

    const widget = new SakanaWidget({ character: 'musashi', autoFit: true });
    widget.mount(container);
    widgetRef.current = widget;

    return () => {
      widget.unmount();
      widgetRef.current = null;
      // 安全移除 container，確認還在 body 內才移除
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // 不渲染任何 React DOM，container 由 useEffect 自行管理
  return null;
}
