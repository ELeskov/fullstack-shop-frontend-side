import { Link } from 'react-router'

import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'

export function SwipeButton() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', translateY: 10 }}
      animate={{ opacity: 1, filter: 'blur(0px)', translateY: 0 }}
      transition={{
        duration: 0.6,
        delay: 1,
      }}
    >
      <Button
        type="button"
        className="flex self-start text-base font-thin"
        asChild
      >
        <Link to={ROUTES.catalog}>
          Перейти к покупкам
          <ChevronRight aria-hidden="true" />
        </Link>
      </Button>
    </motion.div>
  )
}
