import { HexColorPicker } from 'react-colorful'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateColorMutation } from '@/shared/api'
import { loadSelectedShopId } from '@/shared/helpers'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { CustomButton } from '@/shared/ui/customButton'

const hexSchema = z
  .string()
  .trim()
  .transform((v) => v.toUpperCase())
  .refine((v) => /^#([0-9A-F]{6})$/.test(v), 'Нужен HEX в формате #RRGGBB')

const schema = z.object({
  title: z.string().trim().min(1, 'Название обязательно'),
  value: hexSchema,
})

type ColorFormSchema = z.infer<typeof schema>

export function CreateNewColorForm() {
  const { mutateAsync, isPending } = useCreateColorMutation()

  const form = useForm<ColorFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      value: '#FFFFFF',
    },
    mode: 'onTouched',
  })

  const isBusy = form.formState.isSubmitting || isPending

  const onSubmit: SubmitHandler<ColorFormSchema> = async (data) => {
    const shopId = loadSelectedShopId()
    if (!shopId) {
      toast.error('Сначала выбери магазин')
      return
    }

    await mutateAsync({
      shopId,
      title: data.title.trim(),
      value: data.value.toUpperCase(),
    })

    toast.success('Цвет создан')
    form.reset({ title: '', value: '#FFFFFF' })
  }

  // превью без useState — берём прямо из формы
  const previewHex = form.watch('value')?.toUpperCase() || '#FFFFFF'

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Новый цвет</CardTitle>
          <p className="text-sm text-muted-foreground">
            Укажи название и выбери оттенок.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="h-10 w-10 rounded-full border"
            style={{ background: previewHex }}
            aria-hidden="true"
          />
          <span className="text-sm font-medium tabular-nums">{previewHex}</span>
        </div>
      </CardHeader>

      <CardContent>
        <form id="create-color-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 gap-5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="color-title">Название</FieldLabel>
                  <Input
                    {...field}
                    id="color-title"
                    placeholder="Белый"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    disabled={isBusy}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="color-value">Значение</FieldLabel>

                  <div className="flex items-center gap-3">
                    <Input
                      {...field}
                      id="color-value"
                      placeholder="#FFFFFF"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      disabled={isBusy}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />

                    <span
                      className="h-9 w-9 rounded-full border"
                      style={{ background: field.value }}
                      aria-hidden="true"
                    />
                  </div>

                  <FieldDescription>
                    HEX в формате <span className="font-medium">#RRGGBB</span>
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  {/* ВАЖНО: пикер управляется тем же field.value */}
                  <div className="mt-3 rounded-xl border bg-muted/20 p-3">
                    <HexColorPicker
                      color={field.value}
                      onChange={(v) => field.onChange(v.toUpperCase())}
                    />
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex gap-2">
        <CustomButton
          type="button"
          variant="destructive"
          onClick={() => form.reset()}
          disabled={isBusy}
          className="rich-btn rich-btn--danger"
        >
          Сбросить
        </CustomButton>

        <CustomButton
          type="submit"
          form="create-color-form"
          disabled={isBusy || !form.formState.isValid}
          className="rich-btn"
        >
          Создать
        </CustomButton>
      </CardFooter>
    </Card>
  )
}
