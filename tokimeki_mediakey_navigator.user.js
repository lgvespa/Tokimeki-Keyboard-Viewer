// ==UserScript==
// @name         Tokimeki Media Key Navaigator
// @namespace    http://tampermonkey.net/
// @version      2024-10-24
// @description  TOKIMEKI�̉摜�{���y�[�W�ɖ��L�[�ɂ��J�ڋ@�\��ǉ�(�摜�\���ꗗ�̕\�����̂�)
// @author       @heavy8.bsky.social
// @match        https://tokimeki.blue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tokimeki.blue
// @grant        none
// ==/UserScript==

(function() {
    // ���݂̃��f�B�A�A�C�e���̃C���f�b�N�X��ǐ�
    let currentIndex = null;

    document.addEventListener('click', function(event) {
        const currentImg = event.target;

        // console.log(currentImg);
        // �N���b�N�Ώۂ��摜�T���l�C���ł��邱�Ƃ��m�F
        if (currentImg.classList.contains('media-thumbnail__image')) {
            // .media-item���N���b�N���ꂽ�Ƃ��Ɍ��݂̃C���f�b�N�X���X�V
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
            // ����L�[�������ꂽ�ꍇ�A�O�̃��f�B�A�A�C�e���Ɉړ�
            event.preventDefault();
            currentIndex--;
        } else if (event.key === 'ArrowDown' && currentIndex < mediaItems.length - 1) {
            // �����L�[�������ꂽ�ꍇ�A���̃��f�B�A�A�C�e���Ɉړ�
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
            // .media-content-close���N���b�N���ĕ���
            closeButton.click();
            // �J�ڐ��.media-item���N���b�N���ĊJ��
            setTimeout(() => {
                mediaItems[currentIndex].querySelector('img').click();
            }, 300); // �A�j���[�V������J�ڂ̒x���ɑΉ����邽�߂̑ҋ@����
        }
    });
})();