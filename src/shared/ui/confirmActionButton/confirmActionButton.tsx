import { useState } from 'react'

import { LoaderCircle } from 'lucide-react'

import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'

interface ConfirmActionButtonProps {
  triggerText: string
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
  isLoading?: boolean
  onConfirm: () => Promise<void> | void
  triggerClassName?: string
}

export function ConfirmActionButton({
  triggerText,
  title,
  description,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  isDanger = false,
  isLoading = false,
  onConfirm,
  triggerClassName,
}: ConfirmActionButtonProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={isDanger ? 'destructive' : 'outline'}
          className={triggerClassName}
          disabled={isLoading}
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-2xl!">{title}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 hover:text-white"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={isDanger ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : null}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
