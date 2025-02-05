import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote, updateNote } from "@/services/noteService";

interface NoteEditorProps {
  onSave: (note: Note) => void;
  initialNote: Note | null;
  onNoteUpdated?: () => void;
}

export const NoteEditor = ({ onSave, initialNote, onNoteUpdated }: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let savedNote: Note;
      if (initialNote) {
        savedNote = await updateNote({
          ...initialNote,
          title,
          content,
        });
      } else {
        savedNote = await createNote({
          title,
          content,
          createdAt: new Date(),
        });
        setTitle("");
        setContent("");
      }
      onSave(savedNote);
      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (error) {
      console.error('メモの保存に失敗しました:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <Input
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />
      </div>
      <div>
        <Textarea
          placeholder="メモを入力"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] resize-none"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "保存中..." : initialNote ? "更新" : "保存"}
        </Button>
      </div>
    </form>
  );
};