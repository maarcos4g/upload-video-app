import { useState, useTransition, type FormEvent } from 'react' // Adicionado 'type' aqui

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      try {
        const state = await action(data)

        if (state.success && onSuccess) {
          await onSuccess()
        }

        setFormState(state)
        
        if (state.success) {
          form.reset()
        }
      } catch (error) {
        setFormState({
          success: false,
          message: 'Erro inesperado',
          errors: null,
        })
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}