import React, { useState } from 'react';
import axios from 'axios';

function AddStudentForm({ onAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // client-side simple validation
    if (!name || !age || !stuClass) {
      setError('Vui lòng nhập đủ thông tin');
      return;
    }
    const newStu = { name: name.trim(), age: Number(age), class: stuClass.trim() };

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/students', newStu);
      setSuccessMsg('Thêm học sinh thành công!');
      setName(''); setAge(''); setStuClass('');
      if (onAdded) onAdded(res.data); // notify parent to update list
      // clear message after 2s
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Lỗi khi thêm học sinh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Thêm học sinh</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMsg && <div style={{ color: 'green' }}>{successMsg}</div>}
      <div>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
          min={0}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={e => setStuClass(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Đang thêm...' : 'Thêm học sinh'}</button>
    </form>
  );
}

export default AddStudentForm;
