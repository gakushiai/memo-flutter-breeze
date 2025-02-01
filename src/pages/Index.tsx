import { useState } from "react";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { Note } from "@/types/note";
import { NotepadText } from "lucide-react";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setSelectedNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNote(null);
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
              notes={notes}
              onNoteSelect={setSelectedNote}
              onNoteDelete={deleteNote}
              selectedNote={selectedNote}
            />
          </div>
          <div className="md:col-span-2">
            <NoteEditor
              onSave={selectedNote ? updateNote : addNote}
              initialNote={selectedNote}
              key={selectedNote?.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;