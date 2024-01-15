import type { FC } from 'react';
import { useState } from 'react';
import useAccessContext from '../hooks/useAccessContext.ts';
import GatewayService from '../services/GatewayService.ts';

interface Props {
  contractId: number;
}

export const AddNotes: FC<Props> = ({ contractId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAccessContext();

  function onAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title || !content) {
      alert('Tittle and content are required');
      return;
    }

    if (!user) {
      alert('You must be logged in to add a note');
      return;
    }

    GatewayService.addNote({
      content,
      contractId,
      title,
      userId: user.id,
    })
      .then(() => {
        setTitle('');
        setContent('');
      })
      .catch(console.error);
  }

  return (
    <div>
      <form onSubmit={onAddNote}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>

        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};
