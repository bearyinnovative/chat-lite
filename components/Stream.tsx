import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { namespace } from '@dididc/chat-lib/dist/redux';
import { List, Avatar, Spin } from 'antd';
import { Stream, Message, MessageHandle } from '@dididc/chat-lib/dist/entity';
import { im } from '../im';
import styles from './Stream.module.css';
import cx from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import MessageText from './MessageText';
import Image from './Image';

export const previewAbleMimeTypes = new Set([
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/svg+xml',
]);

function StreamComp(props: { vchannelId: string; className: string }) {
  const { vchannelId, className } = props;
  const list = useRef(null);
  const stream: Stream = useSelector((state) => {
    return state[namespace]?.message?.vchannel_streams.get(vchannelId);
  });
  const messages: Map<string, Message> = useSelector((state) => {
    return state[namespace]?.message?.message_records;
  });
  const currentUserId = useMemo(() => im.session.getUserId(), []);
  useEffect(() => {
    im.stateful.message.pullLatest({ vchannelId, count: 32 });
    im.stateful.conversation.markRead(vchannelId);
    if (list.current) {
      list.current.scrollTop = list.current.scrollHeight;
    }
  }, [vchannelId]);

  return (
    <div className={cx(styles.container, className)} ref={list}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={() => {
          im.stateful.message.query({
            vchannelId,
            backward: 20,
            key: stream.messages[0].key,
            queryMode: 'since',
          });
        }}
        hasMore={stream?.hasMoreBefore}
        useWindow={false}
        isReverse
        loader={
          <div key={-1} className={styles.loaderContainer}>
            <Spin />
          </div>
        }
      >
        <List
          className={styles.stream}
          itemLayout="horizontal"
          dataSource={stream?.messages ?? []}
          renderItem={(item: MessageHandle) => {
            const message = messages.get(item.key);
            const isByMe = message.content?.author?.id === currentUserId;
            const isPreviewableImage =
              message.isPreviewableImage(previewAbleMimeTypes);
            return (
              <List.Item className={styles.item} key={message.key}>
                <List.Item.Meta
                  className={cx(isByMe && styles.metaMine)}
                  avatar={
                    <div className={cx(isByMe && styles.avatarMine)}>
                      <Avatar src={message.content.author.avatar_url} />
                    </div>
                  }
                  title={
                    <div className={cx(isByMe && styles.textMine)}>
                      {message.content?.author?.fullname}
                    </div>
                  }
                  description={
                    isPreviewableImage ? (
                      <Image file={message?.content?.file} />
                    ) : (
                      <MessageText
                        text={message.text}
                        className={isByMe && styles.textMine}
                      />
                    )
                  }
                />
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
}

export default StreamComp;
