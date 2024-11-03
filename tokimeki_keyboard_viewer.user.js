// ==UserScript==
// @name         Tokimeki Keyboard Viewer
// @namespace    http://tampermonkey.net/
// @version      0.0.5
// @description  TOKIMEKIの画像閲覧ページに矢印キーによる遷移機能を追加(画像表示一覧の表示時のみ)
// @author       @heavy8.bsky.social
// @match        https://tokimeki.blue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tokimeki.blue
// @grant        none
// ==/UserScript==

(function() {

    const css = `
        /* ボタンの無効化表示が見にくいので灰色にするぐらいなら非表示にする */
        button.embla__prev[disabled], button.embla__next[disabled]{
            visibility: hidden;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    // 現在のメディアアイテムのインデックスを追跡
    let currentIndex = null;
    // 現在のスライドインデックスを追跡
    let currentSlideIndex = 0;

    function clickSelector(contentWrap, selector){
        const element = contentWrap.querySelector(selector);
        if (element){
            element.click();
        }else{
            console.log(`${selector}が見つからない`);
        }
    }


    function elementDisabled(query, value){
        if (value){
            document.querySelector(query).setAttribute('disabled', 'true');
        }else{
            document.querySelector(query).removeAttribute('disabled');
        }
    }


    document.addEventListener('click', function(event) {
        // スライドが表示された際に最初にembla__prevを非表示にする
        const contentWrap = document.querySelector('.media-content-wrap');
        if (contentWrap) {
            elementDisabled('.embla__prev', true);
            elementDisabled('.embla__next', false);
        }
        const currentImg = event.target;
        // console.log(currentImg);
        // クリック対象が画像サムネイルであることを確認
        if (currentImg.classList.contains('media-thumbnail__image')) {
            // .media-itemがクリックされたときに現在のインデックスを更新
            const mediaItems = Array.from(document.querySelectorAll('.media-item'));
            const currentMediaItem = currentImg.parentNode.parentNode.parentNode;
            currentIndex = mediaItems.indexOf(currentMediaItem);
            // スライドインデックスをリセット
            currentSlideIndex = 0;
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
        const slides = Array.from(contentWrap.querySelectorAll('.embla__slide'));
        const closeButton = contentWrap.querySelector('.media-content-close');
        const prevButton = contentWrap.querySelector('.embla__prev');
        const nextButton = contentWrap.querySelector('.embla__next');

        // メディアビューアダイアログ表示中のみ有効
        if ((event.key === 'ArrowUp' || event.key === 'k') && currentIndex > 0) {
            // 上矢印キーが押された場合、前のメディアアイテムに移動
            event.preventDefault();
            currentIndex--;
            currentSlideIndex = 0;
        } else if ((event.key === 'ArrowDown' || event.key === 'j') && currentIndex < mediaItems.length - 1) {
            // 下矢印キーが押された場合、次のメディアアイテムに移動
            event.preventDefault();
            currentIndex++;
            currentSlideIndex = 0;
        } else if ((event.key === 'ArrowLeft' || event.key === 'h') && currentSlideIndex > 0) {
            // 同ポストの前画像を表示
            event.preventDefault();
            currentSlideIndex--;
            prevButton.click();
            // 無限ループ抑制に合わせてUIも無効化
            if (currentSlideIndex === 0) {
                elementDisabled(prevButton, true);
            }
            elementDisabled('.embla__next', false);
            return;
        } else if ((event.key === 'ArrowRight' || event.key === 'l') && currentSlideIndex < slides.length - 1) {
            // 同ポストの次画像を表示
            event.preventDefault();
            currentSlideIndex++;
            nextButton.click();
            // 無限ループ抑制に合わせてUIも無効化
            if (currentSlideIndex === slides.length - 1) {
                elementDisabled('.embla__next', true);
            }
            elementDisabled('.embla__prev', false);
            return;
        } else if (event.key === 'r') {
            // リポスト
            event.preventDefault();
            clickSelector(contentWrap, '.timeline-reaction__item--repost');
            return;
        } else if (event.key === 'f' || event.key === ' ') {
            // いいね
            event.preventDefault();
            clickSelector(contentWrap, '.timeline-reaction__item--like');
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
