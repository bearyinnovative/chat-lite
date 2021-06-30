import { List, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { namespace } from '@didi/chat-lib/dist/redux';
import styles from './Inbox.module.css';
import cx from 'classnames';

function Inbox(props: { setCurrentVid: (vid: string) => void, className?: string }) {
  const { setCurrentVid, className } = props;
  const convs = useSelector((state) => {
    return state[namespace]?.conversation?.vchannels;
  });
  const messages = useSelector((state) => {
    return state[namespace]?.message?.message_records;
  });

  return (
    <div className={cx(styles.listContainer, className)}>
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
  );
}

export default Inbox;
