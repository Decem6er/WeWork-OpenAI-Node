import MarkdownIt from 'markdown-it'; // 首先确保已安装markdown-it库
import * as htmlToTextModule from 'html-to-text'; //ESM（ECMAScript模块）环境下，html-to-text库并没有默认导出，库本身不支持ESM，通过.default访问导出的内容

const htmlToText = htmlToTextModule.default;
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

  // 使用html-to-text库将Markdown内容转换为纯文本
  const htmlContent = md.render(content);
  const plainTextContent = htmlToText.fromString(htmlContent);

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
