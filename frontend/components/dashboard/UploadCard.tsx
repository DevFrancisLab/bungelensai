"use client"

import React, { useCallback, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function UploadCard({ onFiles }: { onFiles: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files)
    onFiles(arr)
  }, [onFiles])

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  function onSelect() {
    const el = inputRef.current
    if (el) el.click()
  }

  return (
    <Card className={`transition-shadow duration-150 ${dragOver ? 'ring-2 ring-accent/40' : 'shadow-sm'}`}>
      <CardHeader className="px-4 py-3">
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`w-full rounded-md border border-dashed p-6 text-center ${dragOver ? 'bg-accent/5' : 'bg-transparent'}`}
        >
          <input ref={inputRef} type="file" className="hidden" multiple onChange={(e) => handleFiles(e.target.files)} accept=".pdf,application/pdf" />

          <div className="flex items-center justify-center gap-3">
            {uploading ? <Spinner /> : <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 0-8 5 5 0 0 0-9.9-1A4 4 0 0 0 3 15z"/></svg>}
            <div className="text-left">
              <div className="font-medium">Drag & drop PDFs or click to upload</div>
              <div className="text-sm text-muted-foreground">Parliamentary reports, policy documents (PDF)</div>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" onClick={onSelect} disabled={uploading}>Select files</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
