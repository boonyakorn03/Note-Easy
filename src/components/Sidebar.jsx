import React from 'react'

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) {

  // ทำการเรียงโน้ตโดยเอาโน้ตที่แก้ไขล่าสุดขึ้นมาอยู่บนสุด
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className='app-sidebar'>
      {/* ส่วนหัวของ Sidebar */}
      <div className='app-sidebar-header'>
        <h1>Note Easy</h1>
        <button className='add-note-button' onClick={onAddNote}>Add</button>
      </div>

      {/* แสดงรายการโน้ต */}
      <div className='app-sidebar-notes'>
        {sortedNotes.map((note) => (
          <div
            key={note.id} // ใช้ key เพื่อช่วย React ในการจัดการการเรนเดอร์รายการ
            className={`app-sidebar-note ${note.id === activeNote ? "active" : ""}`} // เพิ่มคลาส active ถ้าเป็นโน้ตที่ถูกเลือก
            onClick={() => setActiveNote(note.id)} // เมื่อคลิกที่โน้ตนี้ ให้ตั้งเป็นโน้ตที่ถูกเลือก
          >
            <div className='sidebar-note-title'>
              <strong>{note.title}</strong>
              {/* ปุ่มลบโน้ต */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันไม่ให้ event ของการคลิกโน้ตถูกเรียก
                  onDeleteNote(note.id);
                }}
              >
                Delete
              </button>
            </div>

            {/* แสดงตัวอย่างข้อความของโน้ต โดยตัดที่ 100 ตัวอักษร */}
            <p>{note.body && note.body.substr(0, 100) + "..."}</p>

            {/* แสดงวันที่และเวลาที่แก้ไขล่าสุด */}
            <small className='note-meta'>
              Last modified {new Date(note.lastModified).toLocaleDateString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
