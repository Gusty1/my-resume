'use client';

import { Carousel } from '@mantine/carousel';
import { Box, Image } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import imageJson from '../../data/home/image.json';
import classes from './MyCarousel.module.css';

export default function MyCarousel() {
  return (
    <Carousel
      mt="sm"
      slideSize="42%"
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: 'center',
      }}
    >
      {imageJson.map((item) => {
        return (
          <Carousel.Slide key={item.src}>
            <Box className={classes.imageBox}>
              <Image h={300} w="auto" fit="contain" radius="md" src={item.src} alt={item.alt} />
            </Box>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
