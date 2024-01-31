import { Loader } from "lucide-react"

export default function LoaderWrapper({
  children = null,
  loading = false,
}: {
  children?: React.ReactNode
  loading?: boolean
}) {
  return (
    <div className="flex flex-col justify-center items-center relative">
      {loading && (
        <div className="text-center">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      )}
      <div
        style={{
          opacity: loading ? 0 : 1,
        }}
        className="w-full"
      >
        {children}
      </div>
    </div>
  )
}
