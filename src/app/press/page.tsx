import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press coverage and features in Sotheby\'s, TIME Magazine, NY Times, The Hollywood Reporter, NBC, Deadline, and Entrepreneur. NEA premiered at Tribeca 2024.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press & Media — J.N. Silva',
    description: 'Press coverage and features in Sotheby\'s, TIME, NY Times, The Hollywood Reporter, NBC, Deadline, and Entrepreneur.',
    url: '/press',
  },
};

export default function PressPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Press & Media — J.N. Silva',
        description: 'Press coverage and features in major publications.',
        url: 'https://jnsilva.com/press',
        numberOfItems: 23,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Adorama — Through The Lens: Back in the USA', url: 'https://www.adorama.com/alc/through-the-lens-back-in-the-usa-photographer-jose-silva-jnsilva/' },
          { '@type': 'ListItem', position: 2, name: 'Sotheby\'s — Kinesthesia: Natively Digital NFT Sale', url: 'https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia' },
          { '@type': 'ListItem', position: 3, name: 'TIME Magazine — TIMEPieces Genesis Collection', url: 'https://nft.time.com/collection/jn-silva/' },
          { '@type': 'ListItem', position: 4, name: 'Sony Alpha Universe — JN Silva\'s Kinesthesia Sells at Sotheby\'s', url: 'https://alphauniverse.com/stories/nft-artist-jn-silvas-kinesthesia-sells-at-sothebys-auction/' },
          { '@type': 'ListItem', position: 5, name: 'The New York Times — Sharing Cultural Jewels via Instagram', url: 'https://www.nytimes.com/2014/06/18/arts/design/sharing-cultural-jewels-via-instagram.html' },
          { '@type': 'ListItem', position: 6, name: 'Entrepreneur — 3 Tips for Creatives Breaking Into the NFT Industry', url: 'https://www.entrepreneur.com/money-finance/3-tips-for-creatives-looking-to-break-into-the-nft-industry/366540' },
          { '@type': 'ListItem', position: 7, name: 'Yahoo Finance — JN Silva and ThankYouX Digital Art Drop', url: 'https://finance.yahoo.com/news/photographer-jn-silva-artist-thankyoux-164724490.html' },
          { '@type': 'ListItem', position: 8, name: 'Yahoo Finance — JN Silva and ThankYouX Second NFT Drop', url: 'https://finance.yahoo.com/news/jn-silva-thankyoux-return-second-170007905.html' },
          { '@type': 'ListItem', position: 9, name: 'NFT Now — Redefining Photography Through NFTs with JN Silva', url: 'https://nftnow.com/podcasts/jn-silva-photography-nfts-interview/' },
          { '@type': 'ListItem', position: 10, name: 'Modern Luxury — ThankYouX & JN Silva Miami-Inspired NFT', url: 'https://www.modernluxury.com/jn-silva-thankyoux-miami-nft/' },
          { '@type': 'ListItem', position: 11, name: 'Caracas Chronicles — Talking NFTs with JN Silva', url: 'https://www.caracaschronicles.com/2021/10/04/talking-nfts-with-jn-silva/' },
          { '@type': 'ListItem', position: 12, name: 'The Source — DJ Premier and Animus Golden Era Future NFT', url: 'https://thesource.com/2021/04/28/dj-premier-and-animus-exclusive-golden-era-future-nft-drop-available-for-public-auction-today/' },
          { '@type': 'ListItem', position: 13, name: 'HotNewHipHop — DJ Premier Golden Era Future NFT Auction', url: 'https://www.hotnewhiphop.com/362611-dj-premier-details-golden-era-future-nft-auction-news' },
          { '@type': 'ListItem', position: 14, name: 'NFT Now — The JN Silva Interview, Wicked Craniums & More', url: 'https://nftnow.substack.com/p/jn-silva-wicked-craniums' },
          { '@type': 'ListItem', position: 15, name: 'NFT Now Podcast — Redefining Photography Through NFTs', url: 'https://nftnow.com/podcasts/jn-silva-photography-nfts-interview/' },
          { '@type': 'ListItem', position: 16, name: 'Venezuela Diaspora Project — NFTs Explained by JN Silva', url: 'https://podcasts.apple.com/us/podcast/nfts-explained-by-jn-silva-artist-and-photographer/id1553654543?i=1000537411468' },
          { '@type': 'ListItem', position: 17, name: 'Sony Alpha Universe — Hunters of Light: JN Silva', url: 'https://youtu.be/4vTWf0LYoDM' },
          { '@type': 'ListItem', position: 18, name: 'That Creative Life — Making a Living on Instagram with JN Silva & Dave Krugman', url: 'https://podcasts.apple.com/us/podcast/making-a-living-on-instagram-with-j-n-silva-and-dave-krugman/id1341109677?i=1000466507912' },
        ],
      }} />
      <PageContent />
    </>
  );
}
