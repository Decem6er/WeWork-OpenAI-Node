import MarkdownIt from 'markdown-it';
import * as htmlToTextModule from 'html-to-text'; //The html-to-text library may not exported by default in the ESM (ECMAScript Module) environment; the library itself does not support ESM, and the export is accessed via .default

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

  // Convert Markdown content to HTML and then conver to plain text
  const htmlContent = md.render(content);
  const plainTextContent = htmlToTextModule.convert(htmlContent);

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
