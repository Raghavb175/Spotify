
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const artistCardContainer = document.querySelector('.artist-cardContainer');

    let scrollAmount = 0;

    rightBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.artist-card').offsetWidth + 10; // 10 is the gap
        if (scrollAmount < (artistCardContainer.scrollWidth - artistCardContainer.clientWidth)) {
            scrollAmount += cardWidth;
            artistCardContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    leftBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.artist-card').offsetWidth + 10; // 10 is the gap
        if (scrollAmount > 0) {
            scrollAmount -= cardWidth;
            artistCardContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

