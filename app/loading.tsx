import { Building2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
        <p className="mt-4 text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}
