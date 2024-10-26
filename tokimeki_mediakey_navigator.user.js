// ==UserScript==
// @name         Tokimeki Media Key Navaigator
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  TOKIMEKIの画像閲覧ページに矢印キーによる遷移機能を追加(画像表示一覧の表示時のみ)
// @author       lgvspa
// @match        https://tokimeki.blue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tokimeki.blue
// @grant        none
// ==/UserScript==

(function() {
    // ボタンの無効化表示が見にくいので灰色にするぐらいなら非表示にする
    const css = `
        button.splide__arrow[disabled]{
            visibility: hidden;
        }
        `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);


    // 現在のメディアアイテムのインデックスを追跡
    let currentIndex = null;

    function clickSelector(contentWrap, selector){
        const element = contentWrap.querySelector(selector);
        if (element){
            element.click();
        }else{
            console.log(`${selector}が見つからない`);
        }
    }

    document.addEventListener('click', function(event) {
        const currentImg = event.target;

        // console.log(currentImg);
        // クリック対象が画像サムネイルであることを確認
        if (currentImg.classList.contains('media-thumbnail__image')) {
            // .media-itemがクリックされたときに現在のインデックスを更新
            const mediaItems = Array.from(document.querySelectorAll('.media-item'));
            const currentMediaItem = currentImg.parentNode.parentNode.parentNode;
            currentIndex = mediaItems.indexOf(currentMediaItem);
            // console.log(currentIndex);
        }
    });

    document.addEventListener('keydown', function(event) {
        console.log(event);
        // メディアビューアダイアログ(仮称)
        const contentWrap = document.querySelector('.media-content-wrap');
        if (contentWrap === null) return;
        if (currentIndex === null) return;

        const mediaItems = Array.from(document.querySelectorAll('.media-item'));
        const closeButton = contentWrap ? contentWrap.querySelector('.media-content-close') : null;


        // メディアビューアダイアログ表示中のみ有効
        if (event.key === 'ArrowUp' || event.key === 'k' && currentIndex > 0) {
            // 上矢印キーが押された場合、前のメディアアイテムに移動
            event.preventDefault();
            currentIndex--;
        } else if (event.key === 'ArrowDown' || event.key === 'j'&& currentIndex < mediaItems.length - 1) {
            // 下矢印キーが押された場合、次のメディアアイテムに移動
            event.preventDefault();
            currentIndex++;
        } else if (event.key === 'ArrowLeft' || event.key === 'h') {
            event.preventDefault();
            clickSelector(contentWrap, '.splide__arrow--prev');
            return;
        } else if (event.key === 'ArrowRight' || event.key === 'l') {
            event.preventDefault();
            clickSelector(contentWrap, '.splide__arrow--next');
            return;
        } else if (event.key === 'r') {
            event.preventDefault();
            clickSelector(contentWrap, '.timeline-reaction__item--repost');
            currentIndex++;
            return;
        } else if (event.key === 'f' || event.key === ' ') {
            event.preventDefault();
            clickSelector(contentWrap, '.timeline-reaction__item--like');
            currentIndex++;
            return;
        } else {
            return;
        }

        // console.log(`currentIndex: ${currentIndex}`);
        // ダイアログを閉じたあと次の画像を表示
        if (closeButton) {
            closeButton.click();
            mediaItems[currentIndex].querySelector('img').click();
        }
    });
})();
