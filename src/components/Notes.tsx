import type { FC } from 'react';
import React, { useState } from 'react';
import { ButtonClose } from '@components/ButtonClose.tsx';
import type { INote } from '../utils/interfaces';
import useAccessContext from '../hooks/useAccessContext';
import GatewayService from '../services/ContractService.ts';
import { ModalStyle } from '../utils/constants.ts';

interface Props {
  notes: INote[];
  contractId: number;
}

export const Notes: FC<Props> = ({ notes, contractId }) => {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAccessContext();

  function onAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const _title = title.trim();

    if (!_title) {
      alert('Tittle is required');
      return;
    }

    if (!user) {
      alert('You need to login');
      return;
    }

    GatewayService.addNote({
      content,
      contractId,
      title: _title,
      userId: user.id,
    })
      .then((note: INote) => {
        notes.push(note);
        setTitle('');
        setContent('');
        setIsAddNoteModalOpen(false);
      })
      .catch(console.error);
  }

  function onDeleteNote(noteId: number) {
    GatewayService.deleteNote(noteId)
      .then(() => {
        const index = notes.findIndex((note) => note.id === noteId);
        notes.splice(index, 1);
        setTitle(' ');
      })
      .catch(console.error);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {isNotesModalOpen ? (
        <div style={ModalStyle as {}}>
          <ButtonClose callback={() => setIsNotesModalOpen(false)} />

          <div className="note-container">
            {notes.length > 0
              ? notes.map((note: INote) => (
                  <div className="note" key={note.id}>
                    <button
                      style={{
                        alignSelf: 'flex-end',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'rgb(255 255 255 / 87%)',
                        fontSize: 20,
                        marginRight: 10,
                        padding: 0,
                        position: 'relative',
                        right: 0,
                      }}
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                    >
                      ✗
                    </button>

                    <p
                      style={{
                        fontSize: 28,
                      }}
                    >
                      {note.title}
                    </p>

                    <p
                      style={{
                        fontSize: 18,
                        marginBottom: 20,
                      }}
                    >
                      {note.content}
                    </p>

                    <p
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {note.user?.username} -{' '}
                      {new Date(note.updatedAt).toLocaleString('en-US', {
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                ))
              : 'There is nothing yet'}
          </div>

          <button style={{ alignSelf: 'center', width: 'max-content' }} onClick={() => setIsAddNoteModalOpen(true)}>
            Add note
          </button>
        </div>
      ) : (
        <div>
          <a onClick={() => setIsNotesModalOpen(true)}>Notes</a>
        </div>
      )}

      {isAddNoteModalOpen ? (
        <div style={ModalStyle as {}}>
          <form onSubmit={onAddNote}>
            <div className="field">
              <label className="label" style={{ color: 'rgb(255 255 255 / 87%)' }}>
                Title
              </label>
              <div className="control">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" type="text" placeholder="Title" />
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: 'rgb(255 255 255 / 87%)' }}>
                Content
              </label>
              <div className="control">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="textarea" placeholder="Content" />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Add</button>
              </div>
              <div className="control">
                <button onClick={() => setIsAddNoteModalOpen(false)} className="button is-link is-light">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {notes.length > 0 ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            justifyContent: 'center',
            marginLeft: 80,
            position: 'absolute',
          }}
        >
          <span>
            <b style={{ fontSize: 12 }}>Last: </b>
          </span>
          <span style={{ minWidth: 'max-content' }}>{notes[notes.length - 1].title}</span>
        </div>
      ) : null}
    </div>
  );
};
