import MarkdownIt from 'markdown-it'; // 首先确保已安装markdown-it库
export function MDUserMsg(toUser, agentid, content) {

  const markdown = JSON.stringify({ "content": content });
  return `{
    "touser": "${toUser}",
    "msgtype": "markdown",
    "agentid": ${agentid},
    "markdown": ${markdown},
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800
  }`;
};

export function TextUserMsg(toUser, agentid, content) {

  const md = new MarkdownIt();
  // 将Markdown内容转换为纯文本
  const plainTextContent = md.render(content).replace(/<\/?[^>]+(>|$)/g, "");

  const text = JSON.stringify({ "content": plainTextContent  });
  return `{
    "touser": "${toUser}",
    "msgtype": "text",
    "agentid": ${agentid},
    "text": ${text},
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800
  }`;
};

export function XMLUserMsg(toUser, fromUser, timeStamp, content) {

  return `<xml>
            <ToUserName><![CDATA[${toUser}]]></ToUserName>
            <FromUserName><![CDATA[${fromUser}]]></FromUserName>
            <CreateTime>${timeStamp}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${content}]]></Content>
          </xml>`;
};
