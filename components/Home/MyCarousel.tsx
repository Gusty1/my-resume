'use client';

import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { Carousel } from '@mantine/carousel';
import { Box } from '@mantine/core';

import '@mantine/carousel/styles.css';

import imageJson from '@/data/home/image.json';
import classes from './MyCarousel.module.css';

export default function MyCarousel() {
  const t = useTranslations('home');

  return (
    <Carousel
      mt="sm"
      slideSize="42%"
      slideGap="md"
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: 'center',
      }}
    >
      {imageJson.map((item) => {
        return (
          <Carousel.Slide key={item.src}>
            {/* 使用 Next.js Image：自動 WebP 轉換、lazy load、尺寸最佳化 */}
            <Box className={classes.imageBox}>
              <NextImage
                src={item.src}
                alt={t(item.altKey as Parameters<typeof t>[0])}
                fill
                sizes="(max-width: 640px) 90vw, 42vw"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
