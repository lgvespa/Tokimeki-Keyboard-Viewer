// ==UserScript==
// @name         Tokimeki Media Key Navaigator
// @namespace    http://tampermonkey.net/
// @version      2024-10-24
// @description  TOKIMEKIの画像閲覧ページに矢印キーによる遷移機能を追加(画像表示一覧の表示時のみ)
// @author       @heavy8.bsky.social
// @match        https://tokimeki.blue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tokimeki.blue
// @grant        none
// ==/UserScript==

(function() {
    // 現在のメディアアイテムのインデックスを追跡
    let currentIndex = null;

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
        const contentWrap = document.querySelector('.media-content-wrap');
        if (contentWrap === null) return;
        if (currentIndex === null) return;

        const mediaItems = Array.from(document.querySelectorAll('.media-item'));
        const closeButton = contentWrap ? contentWrap.querySelector('.media-content-close') : null;

        if (event.key === 'ArrowUp' && currentIndex > 0) {
            // 上矢印キーが押された場合、前のメディアアイテムに移動
            event.preventDefault();
            currentIndex--;
        } else if (event.key === 'ArrowDown' && currentIndex < mediaItems.length - 1) {
            // 下矢印キーが押された場合、次のメディアアイテムに移動
            event.preventDefault();
            currentIndex++;
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevArrow = contentWrap.querySelector('.splide__arrow--prev');
            if (prevArrow) prevArrow.click();
            return;
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextArrow = contentWrap.querySelector('.splide__arrow--next');
            if (nextArrow.click()) nextArrow.click();
            return;
        } else {
            return;
        }

        // console.log(`currentIndex: ${currentIndex}`);
        if (closeButton) {
            // .media-content-closeをクリックして閉じる
            closeButton.click();
            // 遷移先の.media-itemをクリックして開く
            mediaItems[currentIndex].querySelector('img').click();
        }
    });
})();
