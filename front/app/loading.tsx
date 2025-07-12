import { Loader2 } from "lucide-react";


const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
    <Loader2 className="h-24 w-24 animate-spin text-primary text-blue-300" />
    <p className="text-xl text-muted-foreground">Loading…</p>
  </div>
  )
}

export default Loading