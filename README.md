## poker-mahjong-calculation
[jphacks](https://jphacks.com/)に向け学生3人で開発中のwebアプリケーションです。

私たちはチームでの開発経験を積み、クオリティの高いアプリケーションを作成したことがあるという成功体験を作りたいという思いでこの大会に応募しました。<br>
私たちはポーカーをする上で面倒で億劫なディーラーの業務を軽減する、チップのやり取りを自動で計算し、リアルタイムでチップの移動結果を反映するwebアプリケーションを作成します。<br>
ポーカーはプレイ人口が海外中心であるため、UIの高級感を演出するために海外のハイブランドサイトを調べ、UI構成を考えました。加えて、全文英語で作成することで、海外の方の利用を促しています。<br>
パブリックベータとして、海外の方向けにリリースしたのち、日本語ローカライズ版を含む全世界向けを本リリースしようと考えております。<br>

アプリケーションは、Frontend・Backend共にDockerを用いて開発をしているため、可搬性が確保されております。<br>
FrontendはNext+TS、BackendはGin by Goを用いて開発しており、リアルタイムな通信の実現のため、REST APIに加えWebSocketを用いたAPIを構築・使用予定です。<br>

このように、アプリ構成や技術構成を考え抜き、細部にまでこだわりを持ち、アプリケーションの将来性まで考えました。<br>
**私達は入賞を熱望しており、チーム一丸となってクオリティの高いアプリケーション開発に努めていくつもりです。**

## 概要
- ポーカーをプレイする人たちのうち1人がルームを作成し、他の人達がそれに参加してゲームをスタートします。
- スマホ上で自分のアクション(レイズ、チェックなど)を行うことで、pokerでのチップのやり取りを自動で計算し、リアルタイムでチップの移動結果を反映するwebアプリケーションです。<br>
- 特に海外で使用することを想定し、英語表記となっています。 *日本で実際のお金などを賭けplayすることは違法です。本アプリはあくまでチップのやりとりのみです。
- [デザインカンプ](https://www.figma.com/community/file/1161906310434396378)

## 使用技術
- Frontend: TypeScript, Next.js, Docker, jest
  - Author: [長谷川祥士](https://github.com/Hasegawa-Akito)
  - Document: [README](https://github.com/tokyo-azisai-paradise/poker-mahjong-calculation/blob/develop/frontend/README.md)
- Backend:  Go, Gin, Docker
  - Author: [藤田恭輔](https://github.com/Techondorius)
  - Document: [README](https://github.com/tokyo-azisai-paradise/poker-mahjong-calculation/blob/develop/backend/readme.md)
- Other:    websocket, Azure(予定)
