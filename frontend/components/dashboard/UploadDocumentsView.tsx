"use client"

import React from 'react'
import UploadPanel from './UploadPanel'

export default function UploadDocumentsView({ documents, handleFiles }: { documents: Array<{ id: string; name: string; date: string; status: string; topics: string[] }>; handleFiles: (files: File[]) => void }) {
  return (
    <section className="space-y-4 transition-transform duration-200 opacity-100 translate-y-0">
      <UploadPanel documents={documents} handleFiles={handleFiles} />
    </section>
  )
}
