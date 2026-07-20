# VicastCam invitation page

Static invitation page integrated with OpenInstall Global.

## Behavior

- Known in-app browsers such as WeChat, QQ, Weibo, Alipay, DingTalk, Feishu, Douyin, Instagram, and LINE show a custom HTML/CSS guide for opening the link in a browser.
- Desktop browsers show the PC invitation page. Clicking the primary button redirects to `https://www.vicastcam.com/download`.
- Normal mobile browsers open the VicastCam invitation page and initialize OpenInstall.
- Language: Chinese browser languages (`zh-*`) use Chinese copy. Every other language uses English copy.
- All URL query parameters are forwarded to OpenInstall. The preferred invitation parameter is `inviteCode`.
- Invitation info is displayed only when both `nickname` and `inviteCode` are present and non-empty.

## Local test URLs

```text
http://localhost:4174/?nickname=Alex&inviteCode=TEST-001
http://localhost:4174/?wechat=1&lang=zh-CN&nickname=Alex&inviteCode=TEST-001
http://localhost:4174/?wechat=1&lang=en&nickname=Alex&inviteCode=TEST-001
http://localhost:4174/?browser=1&lang=zh-CN&nickname=Alex&inviteCode=TEST-001
http://localhost:4174/?desktop=1&nickname=Alex&inviteCode=TEST-001
http://localhost:4174/?nickname=Alex
http://localhost:4174/?inviteCode=TEST-001
```

`wechat=1` forces the guide page for local QA. `browser=1` forces the normal mobile-browser flow. `desktop=1` forces the PC invitation page. `mobile=1` skips the PC flow. `nickname=...` plus `inviteCode=...` shows the invite info. `lang=...` previews a language. Real WeChat/QQ-style in-app visits and browser language are detected automatically.

## Production requirements

- Deploy over HTTPS.
- Add the production host to OpenInstall Web domain verification.
- Load the OpenInstall SDK from `https://res.opoinstalljs.com/opo-uimft3.js` only after the page confirms it is running in a normal browser.
- The iOS app must include `applinks:uimft3.opwakeup.com` in Associated Domains.
- The app must handle OpenInstall wake-up and install-parameter callbacks.
