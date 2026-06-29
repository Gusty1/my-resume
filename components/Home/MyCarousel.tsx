'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { Carousel } from '@mantine/carousel';
import { Box } from '@mantine/core';

import '@mantine/carousel/styles.css';
import 'yet-another-react-lightbox/styles.css';

import imageJson from '@/data/home/image.json';
import classes from './MyCarousel.module.css';

export default function MyCarousel() {
  const t = useTranslations('home');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <Carousel
        mt="sm"
        slideSize="100%"
        withIndicators
        emblaOptions={{
          loop: true,
          dragFree: false,
        }}
      >
        {imageJson.map((item, index) => (
          <Carousel.Slide key={item.src}>
            {/* 使用 Next.js Image：自動 WebP 轉換、lazy load、尺寸最佳化 */}
            <Box
              className={classes.imageBox}
              onClick={() => setLightboxIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              <NextImage
                src={item.src}
                alt={t(item.altKey as Parameters<typeof t>[0])}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* ponytail: slides 用 index 對應，不另外建 state 存 src */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={imageJson.map((item) => ({ src: item.src }))}
        plugins={[Zoom]}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
