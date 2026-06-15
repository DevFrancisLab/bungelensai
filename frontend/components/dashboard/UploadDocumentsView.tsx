"use client"

import React from 'react'
import UploadCard from './UploadCard'
import DocumentCard from './DocumentCard'

export default function UploadDocumentsView({ documents, handleFiles }: { documents: Array<{ id: string; name: string; date: string; status: string; topics: string[] }>; handleFiles: (files: File[]) => void }) {
  return (
    <section className="space-y-4 transition-transform duration-200 opacity-100 translate-y-0">
      <UploadCard onFiles={handleFiles} />

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
    </section>
  )
}
