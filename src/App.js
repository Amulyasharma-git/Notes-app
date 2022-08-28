import { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid'; 
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import Home from './components/Home';

export const AddNoteContext = createContext();
const App = () => {

	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'My first note!',
			date: '23/01/2022',
		},
		{
			id: nanoid(),
			text: 'Search your notes in search bar',
			date: '20/03/2022',
		},
		{
			id: nanoid(),
			text: 'You can delete the notes by clicking on the delete icon.',
			date: '14/04/2022',
		},
	]);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<AddNoteContext.Provider value={addNote}>
			<div className='container'>
				<Header/>
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText.toLowerCase())
					)}
					handleDeleteNote={deleteNote}
				/>			
			</div>
		</AddNoteContext.Provider>
	);
};

export default App;