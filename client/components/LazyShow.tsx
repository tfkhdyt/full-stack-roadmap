import { motion } from 'framer-motion'
import { ReactNode } from 'react'

import useWindowDimensions from '../hooks/useWindowDimensions'

type ILazyShow = {
  children: ReactNode | ReactNode
  className?: string
  align?: string
}

const LazyShow = ({ children, className, align = 'left' }: ILazyShow) => {
  const { width } = useWindowDimensions()
  const variants = {
    hidden: {
      opacity: 0,
      x: align == 'top' ? 0 : width < 768 ? 10 : align == 'left' ? -10 : 10,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='enter'
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        type: 'tween',
        ease: 'backInOut',
      }}
      className={className}
      /*variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
       }}*/
    >
      {children}
    </motion.div>
  )
}

export default LazyShow
