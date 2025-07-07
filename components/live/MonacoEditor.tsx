"use client"

import Editor from "@monaco-editor/react"
import { useState } from "react"

export default function MonacoEditor({ projectSlug }: { projectSlug: string }) {
  const [code, setCode] = useState("// Start coding...")

  return (
    <div className="border rounded-lg overflow-hidden h-[70vh] bg-white dark:bg-black">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  )
}
