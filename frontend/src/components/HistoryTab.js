import React from 'react';
import { Tabs } from 'antd';

export const HistoryTab= () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Tabs defaultActiveKey="2">
      {['Current Order', 'Previous Order'].map((label, i) => {
        const id = String(i + 1);
        return {
          key: id,
          label: label,
          children: `Content for ${label}`,
        };
      }).map(tab => (
        <Tabs.TabPane key={tab.key} tab={tab.label}>
          {tab.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  </div>
);

