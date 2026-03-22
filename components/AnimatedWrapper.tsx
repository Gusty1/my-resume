'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '@/common/animeSetting';

interface AnimatedWrapperProps {
  children: ReactNode;
}

/**
 * 將 framer-motion 的淡入動畫封裝為 Client Component，
 * 讓父頁面得以保持 Server Component，減少客戶端 JS bundle。
 */
export default function AnimatedWrapper({ children }: Readonly<AnimatedWrapperProps>) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
