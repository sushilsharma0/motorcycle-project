
'use client';

import { Carousel } from 'flowbite-react';
import  bikePick from './bike.jpg'

 export default function  Crousel() {
  return (
    <div className="h-56 sm:h-80 xl:h-80 2xl:h-[60vh]">
      <Carousel>
        <img src={bikePick} alt="..." />
        <img src={bikePick} alt="..." />
        <img src={bikePick} alt="..." />
        <img src={bikePick} alt="..." />
        <img src={bikePick} alt="..." />
        <img src={bikePick} alt="bike" />
      </Carousel>
    </div>
  );
}
