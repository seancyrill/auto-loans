type LoadingSpinnerParams = {
  loadingText?: string
}

export default function LoadingSpinner({ loadingText }: LoadingSpinnerParams) {
  return (
    <div className="bg-background fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="relative">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        {loadingText?.length ? (
          <p className="absolute top-full left-1/2 mt-2 -translate-x-1/2 transform whitespace-nowrap text-gray-600">
            {loadingText}
          </p>
        ) : null}
      </div>
    </div>
  )
}
