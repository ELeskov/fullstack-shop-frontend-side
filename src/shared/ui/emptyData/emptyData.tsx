import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/components/ui/empty'
import { CustomButton } from '@/shared/ui/customButton'
import { ChevronRight, Inbox } from 'lucide-react'
import { Link } from 'react-router'
interface EmptyDataProps {
  title: string
  description?: string
  linkTo?: string
  linkText?: string
}
export function EmptyData({
  title,
  description = '',
  linkTo,
  linkText,
}: EmptyDataProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        {linkTo && linkText && (
          <EmptyContent>
            <CustomButton variant={'default'}>
              <Link to={linkTo}>{linkText}</Link>
              <ChevronRight />
            </CustomButton>
          </EmptyContent>
        )}
      </EmptyHeader>
    </Empty>
  )
}
