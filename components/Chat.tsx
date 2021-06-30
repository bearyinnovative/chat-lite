import React, { useState } from 'react';
import styles from './Chat.module.css';
import Stream from './Stream';
import Compose from './Compose';
import Inbox from './Inbox';
import { useMediaQuery } from 'react-responsive';
import cx from 'classnames';

function Chat() {
  const [currentVid, setCurrentVid] = useState('');
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const showInbox = isDesktopOrLaptop || (!isDesktopOrLaptop && !currentVid);
  const showMain = isDesktopOrLaptop || !!currentVid;

  return (
    <div className={isDesktopOrLaptop ? styles.container : styles.containerMobile}>
      {showInbox && (
        <Inbox
          setCurrentVid={setCurrentVid}
          className={cx(!isDesktopOrLaptop && styles.inboxMobile)}
        />
      )}
      {showMain && (
        <div className={styles.main}>
          <Stream vchannelId={currentVid} className={styles.stream} />
          <Compose
            setCurrenteVid={setCurrentVid}
            vchannelId={currentVid}
            className={
              isDesktopOrLaptop ? styles.compose : styles.composeMobile
            }
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
