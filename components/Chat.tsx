import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { namespace } from '@didi/chat-lib/dist/redux';
import { Layout } from 'antd';
import { List, Avatar } from 'antd';
import styles from './Chat.module.css';
import Stream from './Stream';
import Compose from './Compose';

const { Content, Sider } = Layout;

function Chat() {
  const [currentVid, setCurrentVid] = useState('');
  const convs = useSelector((state) => {
    return state[namespace]?.conversation?.vchannels;
  });
  const messages = useSelector((state) => {
    return state[namespace]?.message?.message_records;
  });

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={260}>
          <div className={styles.listContainer}>
            <List
              itemLayout="horizontal"
              dataSource={convs}
              renderItem={([vid, item]) => (
                <List.Item
                  className={styles.item}
                  onClick={setCurrentVid.bind(null, vid)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar_url} />}
                    title={<span className={styles.itemName}>{item.name}</span>}
                    description={
                      <span className={styles.itemPreview}>
                        {messages.get(item.latest_message_key)?.text}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </Sider>
        <Layout className="site-layout">
          <Content className={styles.main}>
            {currentVid && (
              <Stream vchannelId={currentVid} className={styles.stream} />
            )}
            {currentVid && (
              <Compose vchannelId={currentVid} className={styles.compose} />
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Chat;
