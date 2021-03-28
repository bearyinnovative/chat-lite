import React from "react";
import { useSelector } from "react-redux";
import { namespace } from "@didi/chat-lib/dist/redux";

function Chat() {
  const convs = useSelector((state) => {
    return state[namespace].conversation.vchannels;
  });
  return (
    <div>
      <div>Chat</div>
      <table>
        <tr>
          <th>会话名</th>
          <th>未读数</th>
        </tr>
        {convs &&
          convs.size > 0 &&
          Array.from(convs.values()).map((conv) => {
            return (
              <tr>
                <td>{conv.name}</td>
                <td>{conv.unread_count}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default Chat;
