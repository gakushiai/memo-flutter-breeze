import { Note } from "@/types/note";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getNotes, deleteNote } from "@/services/noteService";

interface NoteListProps {
  onNoteSelect: (note: Note) => void;
  selectedNote: Note | null;
  onNoteDeleted: () => void;
}

export interface NoteListRef {
  loadNotes: () => Promise<void>;
}

const NoteListComponent = forwardRef<NoteListRef, NoteListProps>(
  ({ onNoteSelect, selectedNote, onNoteDeleted }, ref) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const loadNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('メモの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      loadNotes
    }));

    useEffect(() => {
      loadNotes();
    }, []);

    const handleDelete = async (id: string) => {
      try {
        await deleteNote(id);
        await loadNotes();
        onNoteDeleted();
      } catch (error) {
        console.error('メモの削除に失敗しました:', error);
      }
    };

    if (loading) {
      return <div className="p-4 text-center">読み込み中...</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">メモ一覧</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {notes.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              メモがありません
            </div>
          ) : (
            <div className="divide-y">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-start ${
                    selectedNote?.id === note.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onNoteSelect(note)}
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {note.title || "無題のメモ"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 truncate">{note.content}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(note.createdAt).toLocaleString("ja-JP")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    );
  }
);

NoteListComponent.displayName = 'NoteList';

export const NoteList = NoteListComponent;