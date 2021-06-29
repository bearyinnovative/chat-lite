import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { namespace } from '@didi/chat-lib/dist/redux';
import { User, VChannel, VChannelType } from '@didi/chat-lib/dist/entity';
import { im } from '../im';
import styles from './Compose.module.css';
import { Mentions, Button } from 'antd';
import cx from 'classnames';

const { Option } = Mentions;

function Compose(props: { vchannelId: string; className?: string }) {
  const [text, setText] = useState('');
  const { vchannelId, className } = props;
  const vc: VChannel = useSelector((state) => {
    return state[namespace]?.conversation?.vchannels.get(vchannelId);
  });
  const users: User = useSelector((state) => {
    if (vc.vchannel_type !== VChannelType.CHANNEL) return [];
    const imState = state[namespace];
    const uids = imState.channels.channelUsers.get(vc.channel_id);
    return Array.from(uids).map((uid) => imState.users.get(uid));
  });
  const sendMessage = useCallback(() => {
    im.core.message.sendText(text, vchannelId);
    setText('');
  }, [text, vchannelId]);
  useEffect(() => {
    if (vc.vchannel_type === VChannelType.CHANNEL) {
      im.stateful.channel.getChannelUsers(vc.channel_id);
    }
  }, [vc]);

  return (
    <div className={cx(className, styles.container)}>
      <Mentions
        value={text}
        onChange={setText}
        className={styles.mention}
        notFoundContent={<span>Not Implemented</span>}
      >
        {users.map(({ login, avatar_url: avatar }) => (
          <Option
            key={login}
            value={login}
            className="antd-demo-dynamic-option"
          >
            <img src={avatar} alt={login} />
            <span>{login}</span>
          </Option>
        ))}
      </Mentions>
      <Button className={styles.send} type="primary" onClick={sendMessage}>
        发送
      </Button>
    </div>
  );
}

export default Compose;
