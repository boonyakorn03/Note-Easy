import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);

  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // ฟังก์ชันสำหรับเพิ่มโน้ตใหม่
  const onAddNote = () => {
    const newNote = {
      id: uuid(), // สร้างidที่ไม่ซ้ำกันด้วยuuid
      title: 'Untitled Note', // ตั้งชื่อโน้ตเริ่มต้นเป็น'Untitled Note'
      body: '',  //เนื้อหาเริ่มต้นเป็นค่าว่าง
      lastModified: Date.now(), //เวลาที่ถูกแก้ไขล่าสุด
    };
    setNotes([newNote, ...notes]); // เพิ่มโน้ตใหม่ไปยังอาร์เรย์ของโน้ต
    setActiveNote(newNote.id); // ตั้งค่าโน้ตใหม่เป็นโน้ตที่ถูกเลือก
  };

 
  const onUpdateNote = (updatedNote) => {
   
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote; 
      }
      return note; 
    });

    setNotes(updatedNotesArray); 
  };

  
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete)); 
    if (activeNote === idToDelete) {
      setActiveNote(false); 
    }
  };

  
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote); 
  };

  return (
    <>
    <div className="App">
      {/* ส่ง props ไปยัง Sidebar เพื่อให้สามารถเพิ่ม, ลบ และเลือกโน้ตได้ */}
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      {/* ส่ง props ไปยัง Main เพื่อแสดงหรืออัพเดตโน้ตที่ถูกเลือก */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
    </>
  );
}

export default App;