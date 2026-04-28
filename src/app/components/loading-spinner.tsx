type LoadingSpinnerParams = {
  loadingText?: string
  block?: boolean
}

const Spinner = ({ text }: { text?: string }) => {
  return (
    <>
      <div className="border-accent h-8 w-8 animate-spin rounded-full border-b-2" />
      {text?.length ? (
        <p className="text-accent absolute top-full left-1/2 mt-2 -translate-x-1/2 transform whitespace-nowrap">
          {text}
        </p>
      ) : null}
    </>
  )
}

export default function LoadingSpinner({ loadingText, block }: LoadingSpinnerParams) {
  return block ? (
    <div className="p-4">
      <Spinner text={loadingText} />
    </div>
  ) : (
    <div className="bg-primary fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="relative">
        <Spinner text={loadingText} />
      </div>
    </div>
  )
}
