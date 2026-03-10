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
    video: 'https://media.niftygateway.com/video/upload/v1609275397/ThankYouX/AvenueoftheStars_l2pbjb.mp4',
  },
  {
    title: 'Thank You Miami',
    platform: 'Nifty Gateway',
    date: 'March 2021',
    description: 'Second collaboration with ThankYouX, celebrating all things Miami.',
    link: 'https://opensea.io/item/ethereum/0xea70a9e62057dd7629e7c9ca7500290544d13e56/14200020029',
    video: 'https://media.niftygateway.com/video/upload/v1614875643/Ashley/ThankYouxSilva2/Suspension_of_Disbelief_-_ThankYouX_nq75my.mp4',
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
    video: 'https://artifex-project.storage.googleapis.com/2021/06/22132652/Wave-2-J.N.-Silva-%40jnsilva_.mp4',
  },
];

export type NftCollection = typeof nftCollections[number];
