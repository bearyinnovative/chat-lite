import React, { useRef, useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import upload from '@didi/dc-file-sdk';
import cx from 'classnames';
import styles from './Uploader.module.css';
import { Progress } from 'antd';
import { im } from '../im';
import { v4 } from 'uuid';

function Uploader(props: { vchannelId: string; className: string }) {
  const { vchannelId, className } = props;
  const [progress, setProgress] = useState(0);
  const uploading = progress > 0 && progress < 100;
  const input = useRef(null);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const handleUploadChange = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;
    upload({
      name: file.name,
      file,
      data: { isPublic: false },
      onProgress: (e) => {
        setProgress(e.percent);
      },
      onSuccess: (e) => {
        setProgress(100);
        im.stateful.files.requestToCreate({
          file,
          info: {
            title: file.name,
            origin: true,
            url: e.url,
            source: e.source,
            resource_key: v4(),
            vchannel_id: vchannelId,
          },
        });
        console.log('success: ', e);
      },
      onError: (e) => {
        console.error(e);
      },
    });
  }, []);

  return (
    <div className={cx(styles.container, className)}>
      {uploading && <Progress type="circle" percent={progress} width={36} />}
      <input
        className={styles.input}
        disabled={uploading}
        ref={input}
        type="file"
        onChange={handleUploadChange}
        id="file_uploader"
      />
      <label
        htmlFor="file_uploader"
        className={cx(
          isDesktopOrLaptop ? styles.label : styles.labelMobile,
          uploading && styles.uploaderDisabled
        )}
      >
        {isDesktopOrLaptop ? '上传文件' : '+'}
      </label>
    </div>
  );
}

export default Uploader;
