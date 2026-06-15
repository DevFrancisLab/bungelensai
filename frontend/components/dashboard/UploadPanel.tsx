"use client"

import React from 'react'
import UploadCard from './UploadCard'
import DocumentCard from './DocumentCard'

export default function UploadPanel({
  documents,
  handleFiles,
}: {
  documents: Array<{ id: string; name: string; date: string; status: string; topics: string[] }>
  handleFiles: (files: File[]) => void
}) {
  return (
    <div className="space-y-4">
      <UploadCard onFiles={handleFiles} />

      {/* Documents list or empty state (unified) */}
      <div className="grid grid-cols-1 gap-3">
        {documents.length === 0 ? (
          <div className="rounded-md border border-border bg-card p-6 text-center">
            <div className="text-lg font-medium">No documents uploaded yet</div>
            <div className="text-sm text-muted-foreground mt-2">Upload PDFs or drag-and-drop files to try the AI document analysis demo.</div>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
