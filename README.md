# Tokimeki Keyboard Viewer

TOKIMEKIでカラムスタイルを**メディアのみ**にしたとき、拡大画像表示画面においてキーボードでの操作を可能にするスクリプト。

## 操作内容

|キー1|キー2|操作内容|
----|----|----
|←|H|ポスト内の前の画像を表示  （※1つのポストに複数の画像がある場合のみ有効)|
|→|Lキー|ポスト内の次の画像を表示  （※1つのポストに複数の画像がある場合のみ有効）|
|↓|Jキー|次のポストの投稿画像を表示|
|↑|Kキー|前のポストの投稿画像を表示|
|Rキー| |リポスト|
|Space|Nキー|いいね|

## インストール手順
### 1. TamperMonkeyをインストール
以下のリンクから、使用しているブラウザに対応したTamperMonkeyをインストールしてください。

- **Firefox**: [TamperMonkey for Firefox](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)  
- **Chrome**: [TamperMonkey for Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)

---

### 2. スクリプトをインストール
以下のリンクをクリックし、**Tokimeki Keyboard Viewer** スクリプトをインストールします。  
TamperMonkeyのインストールが完了していれば、スクリプトのページが開かれ、「インストール」ボタンが表示されます。

🔗 **[Tokimeki Keyboard Viewer スクリプト](https://github.com/lgvespa/Tokimeki-Keyboard-Viewer/raw/refs/heads/main/tokimeki_keyboard_viewer.user.js)**

---

### 3. メディア一覧表示状態にする
以下の画像のように、メディア一覧が表示される状態にしてください。

![メディア一覧表示の例](https://github.com/user-attachments/assets/e0039952-d74f-458a-a0a4-092c93a03a95)  
_図1: メディア一覧表示状態_

---

### 4. 適当な画像をクリックしてキー操作を確認
画像をクリックすると、以下の画面で**キー操作**ができるようになります。

![キー操作画面](https://github.com/user-attachments/assets/29af3c0c-e3a9-4b09-b6ce-273181da405f)  
_図2: キー操作が可能な画面_

---

## ヒント・注意事項
- **TamperMonkeyが有効化されているか確認**してください。ブラウザ拡張が無効化されているとスクリプトが機能しません。
- スクリプトの動作に問題がある場合は、ブラウザのキャッシュをクリアして再起動してみてください。
