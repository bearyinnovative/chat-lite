import React, { useEffect, useState } from 'react';
import { fetchSrc } from '@dididc/file-sdk';
import type { FileEntity } from '@dididc/chat-lib/dist/entity';
import { Image as AntdImage } from 'antd';

const MAX_WIDTH = 200;

function Image(props: { className?: string; file: FileEntity }) {
  const { file, className } = props;
  const [realSrc, setRealSrc] = useState('');
  const fileKey = file.key;

  useEffect(() => {
    (async () => {
      const src = await fetchSrc(fileKey);
      setRealSrc(src);
    })();
  }, [fileKey]);

  if (!realSrc) {
    return <span>loading</span>
  }

  return (
    <AntdImage
      width={Math.min(file.width, MAX_WIDTH)}
      src={realSrc}
    />
  );
}

export default Image;
