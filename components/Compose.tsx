import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { namespace } from '@dididc/chat-lib/dist/redux';
import { User, VChannel, VChannelType } from '@dididc/chat-lib/dist/entity';
import { im } from '../im';
import styles from './Compose.module.css';
import { Mentions, Button } from 'antd';
import cx from 'classnames';
import Uploader from './Uploader';
import { useMediaQuery } from 'react-responsive';

const { Option } = Mentions;

function Compose(props: {
  vchannelId: string;
  className?: string;
  setCurrenteVid: (vid: string) => void;
}) {
  const { vchannelId, className, setCurrenteVid } = props;
  const [text, setText] = useState('');
  const vc: VChannel = useSelector((state) => {
    return state[namespace]?.conversation?.vchannels.get(vchannelId);
  });
  const users: User = useSelector((state) => {
    if (vc?.vchannel_type !== VChannelType.CHANNEL) return [];
    const imState = state[namespace];
    const uids = imState.channels.channelUsers.get(vc?.channel_id);
    return Array.from(uids).map((uid) => imState.users.get(uid));
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const sendMessage = useCallback(() => {
    im.core.message.sendText(text, vchannelId);
    setText('');
  }, [text, vchannelId]);
  const handleBack = useCallback(() => {
    setCurrenteVid('');
  }, [setCurrenteVid]);
  useEffect(() => {
    if (vc?.vchannel_type === VChannelType.CHANNEL) {
      im.stateful.channel.getChannelUsers(vc?.channel_id);
    }
  }, [vc]);

  return (
    <div
      className={cx(
        className,
        isDesktopOrLaptop ? styles.container : styles.containerMobile
      )}
    >
      {!isDesktopOrLaptop && (
        <span className={styles.back} onClick={handleBack}>
          {'<返回'}
        </span>
      )}
      <Mentions
        value={text}
        onChange={setText}
        className={isDesktopOrLaptop ? styles.mention : styles.mentionMobile}
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
      <Uploader
        className={isDesktopOrLaptop ? styles.upload : styles.uploadMobile}
        vchannelId={vchannelId}
      />
      <Button
        className={isDesktopOrLaptop ? styles.send : styles.uploadMobile}
        type="primary"
        onClick={sendMessage}
      >
        发送
      </Button>
    </div>
  );
}

export default Compose;
