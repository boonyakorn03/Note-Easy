import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Main({ activeNote, onUpdateNote }) {
    const [isEditing, setIsEditing] = useState(false); // สถานะสำหรับติดตามโหมดการแก้ไข

    // ฟังก์ชันนี้ใช้สำหรับอัพเดตฟิลด์ที่แก้ไข โดยจะอัพเดตค่าที่ถูกแก้ไขใน state
    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote, // สำเนาข้อมูลของโน้ตที่ถูกเลือก (activeNote)
            [key]: value, // อัพเดตฟิลด์ตาม key ที่ได้รับ ('title' หรือ 'body')
            lastModified: Date.now(), // อัพเดตเวลาการแก้ไขล่าสุด
        });
    };

    // ฟังก์ชันสำหรับสลับโหมดการแก้ไข
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // ถ้าไม่มีโน้ตที่ถูกเลือก ให้แสดงข้อความ "No Active Note"
    if (!activeNote) return <div className="no-active-note">No Active Note</div>;

    return (
        <div className='app-main'>
            {isEditing ? (
                <div className='app-main-note-edit'>
                    {/* ฟิลด์สำหรับแก้ไขชื่อโน้ต */}
                    <input
                        type='text'
                        id='title'
                        value={activeNote.title} // ผูกค่า title ของโน้ตที่ถูกเลือก
                        onChange={(e) => onEditField("title", e.target.value)} // เมื่อมีการเปลี่ยนแปลง ให้เรียก onEditField เพื่ออัพเดตค่า
                        autoFocus // ให้โฟกัสที่ช่องนี้เมื่อเปิดหน้า
                    />
                    
                    {/* ฟิลด์สำหรับแก้ไขเนื้อหาของโน้ต */}
                    <textarea
                        id='body'
                        placeholder='Write your note here...' // ข้อความที่จะแสดงเมื่อยังไม่มีเนื้อหาในโน้ต
                        value={activeNote.body} // ผูกค่า body ของโน้ตที่ถูกเลือก
                        onChange={(e) => onEditField("body", e.target.value)} // เมื่อมีการเปลี่ยนแปลง ให้เรียก onEditField เพื่ออัพเดตค่า
                    />
                    {/* ปุ่มบันทึก */}
                    <button onClick={toggleEditMode}>Save</button>
                </div>
            ) : (
                <div className='app-main-note-preview'>
                    {/* แสดงชื่อโน้ต */}
                    <h1 className='preview-title'>{activeNote.title}</h1>
                    {/* แสดงเนื้อหาของโน้ตในรูปแบบ Markdown */}
                    <div className='markdown-preview'>
                        <ReactMarkdown>{activeNote.body}</ReactMarkdown>
                    </div>
                    {/* ปุ่มแก้ไข */}
                    <button onClick={toggleEditMode}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default Main;
