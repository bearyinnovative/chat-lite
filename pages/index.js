import React, { useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { im } from "../im";
import { replaceIMState } from "@didi/chat-lib/dist/redux";

export default function Home() {
  const usernameRef = useRef();
  const passRef = useRef();
  const router = useRouter();

  const [webBase, setWebBase] = useState("http://poc.saas.bearychat.com");
  const [haloReg, setHaloReg] = useState(
    "http://haloreg.saas.bearychat.com/get_halo_info"
  );

  const handleLogin = useCallback(async () => {
    const username = usernameRef.current.value;
    const pass = passRef?.current.value;
    const response = await fetch(`${webBase}/api/sso/external-mock`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: pass,
      }),
    });

    const ticket = (await response.json()).result.ticket;

    im.setup({
      ticket,
      apiBase: webBase,
    });
    im.socket.setup({
      registry: haloReg,
    });
    im.connect();
    router.push("/chat");
  }, [usernameRef, passRef]);

  return (
    <div className={styles.container}>
      <label>Web Base</label>
      <input
        className={styles.input}
        value={webBase}
        onChange={(e) => {
          setWebBase(e.target.value);
        }}
      />
      <label>Halo Registry</label>
      <input
        className={styles.input}
        value={haloReg}
        onChange={(e) => {
          setHaloReg(e.target.value);
        }}
      />
      <label>用户名</label>
      <input className={styles.input} ref={usernameRef} />
      <label>密码</label>
      <input type="password" className={styles.input} ref={passRef} />
      <button className={styles.input} onClick={handleLogin}>
        登录
      </button>
    </div>
  );
}
