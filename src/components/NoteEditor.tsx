import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NoteEditorProps {
  onSave: (note: Note) => void;
  initialNote: Note | null;
}

export const NoteEditor = ({ onSave, initialNote }: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const note: Note = {
      id: initialNote?.id || crypto.randomUUID(),
      title,
      content,
      createdAt: initialNote?.createdAt || new Date(),
    };
    onSave(note);
    if (!initialNote) {
      setTitle("");
      setContent("");
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
        <Button type="submit">
          {initialNote ? "更新" : "保存"}
        </Button>
      </div>
    </form>
  );
};