import { motion } from 'framer-motion'

const Layout = ({ children }: { children: JSX.Element }) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      exit='exit' // Exit state (used later) to variants.exit
      transition={{
        default: { duration: 0.5 },
      }}
    >
      {children}
    </motion.main>
  )
}

export default Layout
