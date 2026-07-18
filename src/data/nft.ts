export const nftCollections = [
  {
    title: 'Kinesthesia',
    platform: "Sotheby's",
    date: 'March 2022',
    description: 'Fractal study projected onto dancers, inspired by Latin American kinetic artists. First Venezuelan NFT artist to exhibit and sell at Sotheby\'s.',
    price: '£90,000',
    link: 'https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia',
    highlight: true,
  },
  {
    title: 'Thank You New York',
    platform: 'Nifty Gateway',
    date: 'December 2020',
    description: 'Collaboration with ThankYouX. The first drop on Nifty Gateway to include photography.',
    link: 'https://opensea.io/item/ethereum/0xf2129ea3cf8f356da9dbaa276773fbf8259d6690/3800010192',
    // Self-hosted: Nifty Gateway CDN went dark when the platform shut down (April 2026)
    video: '/videos/thank-you-ny.mp4',
    image: '/images/nft/thank-you-ny-poster.jpg',
  },
  {
    title: 'Thank You Miami',
    platform: 'Nifty Gateway',
    date: 'March 2021',
    description: 'Second collaboration with ThankYouX, celebrating all things Miami.',
    link: 'https://opensea.io/item/ethereum/0xea70a9e62057dd7629e7c9ca7500290544d13e56/14200020029',
    video: '/videos/thank-you-miami.mp4',
    image: '/images/nft/thank-you-miami-poster.jpg',
  },
  {
    title: 'Infinitum',
    platform: 'Nifty Gateway',
    date: 'May 2022',
    description: 'Solo collection exploring infinite recursion, sacred patterns, and fractal imagery.',
    link: 'https://x.com/JNSilva_/status/1522671827461496832',
    image: '/images/fractals/infinitum/infinitumhero.JPG',
  },
  {
    title: 'Visión y Razón',
    platform: 'Artifex',
    date: 'October 2021',
    description: 'A 1/1 video NFT — 47 photographs set to an original audio track. Part of the Artifex Digital Icons collection celebrating early NFT movement pioneers.',
    link: 'https://artifex.art/waves/digital-icons/vision-y-razon/vision-y-razon',
    // 32s preview loop (full 2:12 piece lives on Artifex); source was a 51MB file unusable on mobile
    video: '/videos/vision-y-razon.mp4',
    image: '/images/nft/vision-y-razon-poster.png',
  },
];

export type NftCollection = typeof nftCollections[number];
