import * as React from 'react'

import clsx from 'clsx'

import { IconChevronDown } from '~/components/icons'

export function Label({
  className,
  ...labelProps
}: JSX.IntrinsicElements['label']) {
  return (
    <label
      {...labelProps}
      className={clsx('text-primary inline-block text-lg', className)}
    />
  )
}

type InputProps = JSX.IntrinsicElements['input']

export const inputClassName = clsx(
  'py-3 px-5 w-full border border-gray-broken border-b-gray-overcast shadow',
  'focus:border-b-blue-afternoon focus:shadow-xl focus:outline-none transition',
  'placeholder-gray-400 text-primary disabled:text-gray-400 text-lg',
)

export function Input({ className, ...rest }: InputProps) {
  return <input {...rest} className={clsx(inputClassName, className)} />
}

interface InputErrorProps {
  id: string
  children?: string | null
}

export function InputError({ children, id }: InputErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p role="alert" id={id} className="text-sm text-red">
      {children}
    </p>
  )
}

type FieldContainerRenderProp = (props: {
  inputProps: {
    id: string
    'aria-describedby'?: string
  }
}) => React.ReactNode

type FieldContainerProps = {
  id?: string
  label: string
  className?: string
  error?: string | null
  children: FieldContainerRenderProp
}

export function FieldContainer({
  error,
  label,
  className,
  id,
  children,
}: FieldContainerProps) {
  const defaultId = React.useId()
  const inputId = id ?? defaultId
  const errorId = `${inputId}-error`

  return (
    <div className={className}>
      <Label htmlFor={inputId} className="sr-only">
        {label}
      </Label>

      {children({
        inputProps: {
          id: inputId,
          'aria-describedby': error ? errorId : undefined,
        },
      })}

      {error ? (
        <div className="mt-5">
          <InputError id={errorId}>{error}</InputError>
        </div>
      ) : null}
    </div>
  )
}

type FieldProps = {
  name: string
  label: string
  className?: string
  defaultValue?: string | null
  error?: string | null
} & InputProps

export function Field({
  defaultValue,
  error,
  name,
  label,
  className,
  id,
  ...props
}: FieldProps) {
  return (
    <FieldContainer id={id} label={label} className={className} error={error}>
      {({ inputProps }) => (
        <Input
          required
          {...props}
          {...inputProps}
          name={name}
          autoComplete={name}
          defaultValue={defaultValue}
        />
      )}
    </FieldContainer>
  )
}

type SelectProps = React.PropsWithRef<
  JSX.IntrinsicElements['select'] & FieldProps
>

export function Select({
  className,
  id,
  label,
  name,
  error,
  children,
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <FieldContainer id={id} label={label} className={className} error={error}>
      {({ inputProps }) => (
        <div className="relative">
          <select
            className={`${inputClassName} appearance-none`}
            {...props}
            {...inputProps}
            name={name}
            defaultValue={defaultValue}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute top-0 right-4 bottom-0 m-auto h-6 w-6 text-blue-afternoon">
            <IconChevronDown />
          </div>
        </div>
      )}
    </FieldContainer>
  )
}

export function ErrorPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div role="alert" className={clsx('relative mt-8 px-10 py-8', className)}>
      <div className="absolute inset-0 bg-red opacity-50" />
      <div className="relative text-lg font-medium text-white">{children}</div>
    </div>
  )
}
