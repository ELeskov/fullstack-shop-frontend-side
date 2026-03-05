import { motion } from 'framer-motion'

interface FullScreenLoaderProps {
  text?: string
}

export function FullScreenLoader({
  text = 'Загрузка...',
}: FullScreenLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/70 backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {text && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0.4, 1, 0.4], y: 0 }}
            transition={{
              y: { duration: 0.4, ease: 'easeOut' },
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              },
            }}
            className="mt-8 text-xs font-medium tracking-[0.2em] text-primary/80 uppercase"
          >
            {text}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
