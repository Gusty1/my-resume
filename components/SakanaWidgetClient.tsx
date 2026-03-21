'use client';

import { useEffect, useRef } from 'react';
import SakanaWidget from 'sakana-widget';

import 'sakana-widget/lib/index.css';

/**
 * Sakana Widget 的 React 包裝元件，
 * 透過 useEffect 在客戶端掛載 DOM widget，
 * 並在元件卸載時自動清理。
 */
export default function SakanaWidgetClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<SakanaWidget | null>(null);

  useEffect(() => {
    if (!containerRef.current || widgetRef.current) {
      return;
    }

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
    widget.mount(containerRef.current);
    widgetRef.current = widget;

    return () => {
      widget.unmount();
      widgetRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        width: 200,
        height: 220,
        zIndex: 999,
      }}
    />
  );
}
