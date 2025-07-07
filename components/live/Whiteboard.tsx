"use client"

import { useRef, useState, useEffect } from "react"

export default function Whiteboard({ projectSlug }: { projectSlug: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#facc15" // yellow

    const startDrawing = (e: MouseEvent) => {
      ctx.beginPath()
      ctx.moveTo(e.offsetX, e.offsetY)
      setDrawing(true)
    }

    const draw = (e: MouseEvent) => {
      if (!drawing) return
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    }

    const stopDrawing = () => {
      ctx.closePath()
      setDrawing(false)
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)

    return () => {
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stopDrawing)
      canvas.removeEventListener("mouseout", stopDrawing)
    }
  }, [drawing])

  return (
    <div className="rounded-lg shadow border bg-white dark:bg-gray-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={1000}
        height={500}
        className="w-full h-[500px] touch-none cursor-crosshair"
      />
    </div>
  )
}
