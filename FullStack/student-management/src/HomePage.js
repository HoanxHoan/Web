import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Input tìm kiếm
  const [sortAsc, setSortAsc] = useState(true); //  Trạng thái sắp xếp
  const navigate = useNavigate();

  // Lấy danh sách học sinh
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Lọc danh sách theo tên
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Sắp xếp danh sách đã lọc
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase())
      return sortAsc ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase())
      return sortAsc ? 1 : -1;
    return 0;
  });
  // Hàm xóa học sinh
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;

    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        // Xóa khỏi state
        setStudents((prev) => prev.filter((stu) => stu._id !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách học sinh</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: "50%" }}
      />

      <br />
      {/* Nút sắp xếp */}
      <button onClick={() => setSortAsc((prev) => !prev)}>
        Sắp xếp theo tên: {sortAsc ? "A → Z" : "Z → A"}
      </button>
      &nbsp;
      <button onClick={() => navigate("/add")}>Thêm học sinh</button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {sortedStudents.map((stu) => (
            <tr key={stu._id}>
              <td>{stu.name}</td>
              <td>{stu.age}</td>
              <td>{stu.class}</td>
              <td>
                <button onClick={() => navigate(`/edit/${stu._id}`)}>Sửa</button>
                &nbsp;
                <button onClick={() => handleDelete(stu._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
