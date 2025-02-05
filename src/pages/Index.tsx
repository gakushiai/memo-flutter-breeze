import { useState, useEffect, useRef } from "react";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { Note } from "@/types/note";
import { NotepadText } from "lucide-react";
import { getNotes } from "@/services/noteService";

export default function Index() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const noteListRef = useRef<{ loadNotes: () => Promise<void> } | null>(null);

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteDeleted = () => {
    setSelectedNote(null);
  };

  const handleNoteUpdated = async () => {
    setSelectedNote(null);
    if (noteListRef.current) {
      await noteListRef.current.loadNotes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <NotepadText className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900">Breeze Note</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <NoteList
              ref={noteListRef}
              onNoteSelect={handleNoteSelect}
              selectedNote={selectedNote}
              onNoteDeleted={handleNoteDeleted}
            />
          </div>
          <div className="md:col-span-2">
            <NoteEditor
              onSave={(note) => {
                setSelectedNote(null);
              }}
              initialNote={selectedNote}
              key={selectedNote?.id}
              onNoteUpdated={handleNoteUpdated}
            />
          </div>
        </div>
      </main>
    </div>
  );
}