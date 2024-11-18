import React from 'react';
import { Tabs } from 'antd';

<<<<<<< HEAD
export const HistoryTab = () => (
=======
export const HistoryTab= () => (
>>>>>>> e3a4ed85d4028f6357f89aa5f7c3c888f5ef72f2
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

