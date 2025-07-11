"use client"

import Editor from "@monaco-editor/react"
import { useState, useEffect, useRef } from "react"
import { editor } from "monaco-editor"
import { createClient } from "@liveblocks/client"
import { LiveblocksProvider, RoomProvider, useRoom } from "@liveblocks/react/suspense"
import { AiChat } from "@liveblocks/react-ui"
import { RegisterAiKnowledge, RegisterAiTool } from "@liveblocks/react"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import * as Y from "yjs"
import { MonacoBinding } from "y-monaco"
import { Awareness } from "y-protocols/awareness"

console.log("Liveblocks Key:", process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY);

// Create Liveblocks client
const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || "pk_dev_L3xASDX7FInUD3kr9J06G-INH10IivMAWYPqHmx8DZplrIO0QpN--5K_Wa-SQLWa",
})

// Define AI tool helper function
function defineAiTool() {
  return (config: any) => config
}

function CodeEditor({ projectSlug }: { projectSlug: string }) {
  const [code, setCode] = useState("// Start coding...")
  const [activeUsers, setActiveUsers] = useState<any[]>([])
  const [showAiChat, setShowAiChat] = useState(false)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const providerRef = useRef<LiveblocksYjsProvider | null>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)
  
  const room = useRoom()

  useEffect(() => {
    let yDoc: Y.Doc
    let yText: Y.Text
    let yProvider: LiveblocksYjsProvider
    let binding: MonacoBinding

    const setupCollaboration = async () => {
      if (!editorRef.current || !room) return

      yDoc = new Y.Doc()
      yText = yDoc.getText("monaco")
      
      yProvider = new LiveblocksYjsProvider(room, yDoc)
      providerRef.current = yProvider

      const userColors = ['#00ff00', '#ff00ff', '#00ffff', '#ffff00', '#ff9f00', '#ff0040']
      const randomColor = userColors[Math.floor(Math.random() * userColors.length)]
      
      yProvider.awareness.setLocalStateField('user', {
        name: `User ${Math.floor(Math.random() * 100)}`,
        color: randomColor,
      })

      const model = editorRef.current.getModel()
      if (model) {
        binding = new MonacoBinding(
          yText,
          model,
          new Set([editorRef.current]),
          yProvider.awareness as Awareness
        )
        bindingRef.current = binding
      }

      const awarenessChangeHandler = () => {
        const states = Array.from(yProvider.awareness.getStates().entries())
        const users = states
          .filter(([clientId]) => clientId !== (yProvider.awareness as any).clientID)
          .map(([clientId, state]: [number, any]) => ({
            clientId,
            user: state.user,
            cursor: state.cursor,
          }))
        setActiveUsers(users)
      }

      yProvider.awareness.on('change', awarenessChangeHandler)

      yProvider.on('sync', (isSynced: boolean) => {
        if (isSynced && yText.toString()) {
          setCode(yText.toString())
        }
      })
    }

    setupCollaboration()

    return () => {
      if (binding) binding.destroy()
      if (yProvider) yProvider.destroy()
      if (yDoc) yDoc.destroy()
    }
  }, [room])

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('neon-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'ff00ff', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ffff00' },
        { token: 'string', foreground: '00ffff' },
        { token: 'number', foreground: 'ff00ff' },
        { token: 'regexp', foreground: 'ff9f00' },
        { token: 'operator', foreground: 'ff0040' },
        { token: 'namespace', foreground: '00ff00' },
        { token: 'type', foreground: '00ffff' },
        { token: 'struct', foreground: '00ffff' },
        { token: 'class', foreground: '00ff00' },
        { token: 'interface', foreground: '00ff00' },
        { token: 'enum', foreground: '00ff00' },
        { token: 'typeParameter', foreground: '00ff00' },
        { token: 'function', foreground: '00ff00' },
        { token: 'member', foreground: '00ffff' },
        { token: 'macro', foreground: 'ff00ff' },
        { token: 'variable', foreground: '00ff00' },
        { token: 'parameter', foreground: 'ff9f00' },
        { token: 'property', foreground: '00ffff' },
        { token: 'label', foreground: 'ffff00' },
        { token: 'constant', foreground: 'ff00ff' },
        { token: 'tag', foreground: 'ffff00' },
        { token: 'attribute', foreground: '00ff00' },
      ],
      colors: {
        'editor.background': '#000000',
        'editor.foreground': '#00ff00',
        'editorLineNumber.foreground': '#00ff00',
        'editorLineNumber.activeForeground': '#ffff00',
        'editorCursor.foreground': '#00ff00',
        'editor.selectionBackground': '#00ff0033',
        'editor.inactiveSelectionBackground': '#00ff0022',
        'editor.selectionHighlightBackground': '#00ff0022',
        'editor.wordHighlightBackground': '#00ff0022',
        'editor.wordHighlightStrongBackground': '#00ff0044',
        'editor.findMatchBackground': '#ff00ff44',
        'editor.findMatchHighlightBackground': '#ff00ff22',
        'editor.lineHighlightBackground': '#111111',
        'editor.lineHighlightBorder': '#222222',
        'editorBracketMatch.background': '#00ff0044',
        'editorBracketMatch.border': '#00ff00',
        'editorGutter.background': '#000000',
        'editorIndentGuide.background': '#222222',
        'editorIndentGuide.activeBackground': '#444444',
        'editorRuler.foreground': '#222222',
        'editorCodeLens.foreground': '#00ff00',
        'scrollbar.shadow': '#000000',
        'scrollbarSlider.background': '#00ff0033',
        'scrollbarSlider.hoverBackground': '#00ff0055',
        'scrollbarSlider.activeBackground': '#00ff0077',
      }
    });
  }

  // Progress Bar Component for AI tools
  const ProgressBar = ({ value }: { value: number }) => (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-green-500 to-cyan-500 h-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )

  // Extract inline styles to objects
  const editorContainerStyle = {
    boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)'
  }

  return (
    <div className="flex h-[70vh] gap-4">
      {/* Editor Section */}
      <div className={`relative flex-1 transition-all duration-300 ${showAiChat ? 'w-2/3' : 'w-full'}`}>
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setShowAiChat(!showAiChat)}
            className="bg-purple-500/20 border border-purple-500 rounded-full px-3 py-1 text-xs text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
          >
            <span>🤖</span>
            <span>AI Assistant</span>
          </button>
          
          <div className="bg-green-500/20 border border-green-500 rounded-full px-3 py-1 text-xs text-green-400 flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>Live</span>
            {activeUsers.length > 0 && (
              <span className="text-green-300">
                {activeUsers.length + 1} active
              </span>
            )}
          </div>
          
          <div className="flex -space-x-2">
            {activeUsers.slice(0, 3).map((user) => {
              const userStyle = {
                backgroundColor: user.user?.color || '#00ff00',
                color: '#000000'
              }
              return (
                <div
                  key={user.clientId}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold"
                  style={userStyle}
                  title={user.user?.name || 'Anonymous'}
                >
                  {(user.user?.name || 'A')[0].toUpperCase()}
                </div>
              )
            })}
            {activeUsers.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-gray-300">
                +{activeUsers.length - 3}
              </div>
            )}
          </div>
        </div>

        <div 
          className="border border-green-500/50 rounded-lg overflow-hidden h-full bg-black"
          style={editorContainerStyle}
        >
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="neon-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Fira Code', monospace",
              fontLigatures: true,
              cursorBlinking: 'phase',
              cursorStyle: 'line-thin',
              renderLineHighlight: 'all',
              smoothScrolling: true,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </div>

      {/* AI Chat Section */}
      {showAiChat && (
        <div className="w-1/3 border border-purple-500/50 rounded-lg overflow-hidden bg-black/90 backdrop-blur">
          <AiChat 
            chatId={`project-${projectSlug}-chat`}
            layout="compact"
            copilotId={process.env.NEXT_PUBLIC_LIVEBLOCKS_COPILOT_ID || "co_g7Aj3kF9hQs9xL"}
          />

          {/* Register current code as knowledge */}
          <RegisterAiKnowledge
            description="Current code in the editor"
            value={code}
          />

          {/* Register project information */}
          <RegisterAiKnowledge
            description="Project information"
            value={{
              projectSlug,
              language: "javascript",
              activeUsers: activeUsers.length + 1,
              timestamp: new Date().toISOString()
            }}
          />

          {/* Register the current date - Fixed: Convert Date to string */}
          <RegisterAiKnowledge 
            description="The current date" 
            value={new Date().toISOString()} 
          />

          {/* Revenue/Progress tool (example from Liveblocks) */}
          <RegisterAiTool
            name="revenue-bar"
            tool={defineAiTool()({
              description: "Display revenue performance bar",
              parameters: {
                type: "object",
                properties: {
                  quarter: { type: "string" },
                  amount: { type: "number" },
                  growth: { type: "number" },
                },
              },
              execute: () => {},
              render: ({ args }: { args: any }) => args ? (
                <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <h4 className="text-green-400 text-sm font-semibold mb-2">
                    {args.quarter} revenue performance
                  </h4>
                  <ProgressBar value={args.growth} />
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-green-300">${args.amount}</span>
                    <span className="text-green-400">+{args.growth}%</span>
                  </div>
                </div>
              ) : null
            })}
          />

          {/* Team progress tool */}
          <RegisterAiTool
            name="team-progress"
            tool={defineAiTool()({
              description: "Display team progress",
              parameters: {
                type: "object",
                properties: {
                  members: {
                    type: "array", 
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        performance: { type: "number" },  
                      }
                    }
                  }
                },
              },
              execute: () => {},
              render: ({ args }: { args: any }) => args ? (
                <div className="p-3 bg-purple-500/10 border border-purple-500/50 rounded-lg">
                  <h4 className="text-purple-400 text-sm font-semibold mb-2">Team progress</h4>
                  {args.members.map((member: any) => (
                    <div key={member.name} className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-300">{member.name}</span>
                        <span className="text-purple-400">{member.performance}%</span>
                      </div>
                      <ProgressBar value={member.performance} />
                    </div>
                  ))}
                </div>
              ) : null
            })}
          />

          {/* Code snippet tool */}
          <RegisterAiTool
            name="code-snippet"
            tool={defineAiTool()({
              description: "Display code snippet with syntax highlighting",
              parameters: {
                type: "object",
                properties: {
                  code: { type: "string" },
                  language: { type: "string" },
                  description: { type: "string" }
                },
              },
              execute: () => {},
              render: ({ args }: { args: any }) => args ? (
                <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <h4 className="text-green-400 text-sm font-semibold mb-2">{args.description}</h4>
                  <pre className="text-green-300 text-xs overflow-x-auto bg-black/50 p-2 rounded">
                    <code>{args.code}</code>
                  </pre>
                </div>
              ) : null
            })}
          />
        </div>
      )}
    </div>
  )
}

// Main component wrapped with providers - Fixed LiveblocksProvider props
export default function MonacoEditor({ projectSlug }: { projectSlug: string }) {
  return (
    <LiveblocksProvider 
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || "pk_dev_L3xASDX7FInUD3kr9J06G-INH10IivMAWYPqHmx8DZplrIO0QpN--5K_Wa-SQLWa"}
    >
      <RoomProvider
        id={`project-${projectSlug}`}
        initialPresence={{
          cursor: null,
          user: {
            name: `User ${Math.floor(Math.random() * 100)}`,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          }
        }}
      >
        <CodeEditor projectSlug={projectSlug} />
      </RoomProvider>
    </LiveblocksProvider>
  )
}