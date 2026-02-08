import React from 'react'

import { Loader2 } from 'lucide-react'

import { cn } from '@/app/lib/utils'

import { Button } from '../components/ui/button' // твой shadcn button

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean
}

export function CustomButton({
  className,
  children,
  isLoading = false,
  disabled,
  variant,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant ? variant : 'secondary'}
      className={cn(className)}
      disabled={isLoading || disabled}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
    </Button>
  )
}
