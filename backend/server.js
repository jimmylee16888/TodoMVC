const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'myuser',
  password: 'mypassword', // 確保跟MySQL設定一致！
  database: 'todoapp'
});

// 根路徑確認連線
app.get('/', (req, res) => {
  res.json({ message: "歡迎使用 Todo App API!" });
});

// 查詢所有待辦事項
app.get('/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      console.error('🔥 查詢錯誤:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// 新增待辦事項
app.post('/todos', (req, res) => {
  const { status, Thing, Editing } = req.body;
  pool.query(
    'INSERT INTO todos (status, Thing, Editing) VALUES (?, ?, ?)',
    [status, Thing, Editing],
    (error, results) => {
      if (error) {
        console.error('新增錯誤:', error);
        return res.status(500).json({ error: error.message });
      }
      pool.query('SELECT * FROM todos WHERE id = ?', [results.insertId], (err, rows) => {
        if (err) return res.status(500).json({ err });
        res.status(201).json(rows[0]);
      });
    }
  );
});

// 修改待辦事項
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { status, Thing, Editing } = req.body;
  pool.query(
    'UPDATE todos SET status = ?, Thing = ?, Editing = ? WHERE id = ?',
    [status, Thing, Editing, id],
    (error) => {
      if (error) {
        console.error('更新錯誤:', error);
        return res.status(500).json({ error });
      }
      pool.query('SELECT * FROM todos WHERE id = ?', [id], (err, rows) => {
        if (err) {
          console.error('查詢更新後資料錯誤:', err);
          return res.status(500).json({ err });
        }
        res.json(rows[0]);
      });
    }
  );
});

// 刪除待辦事項
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('刪除錯誤:', error);
      return res.status(500).json({ error });
    }
    res.status(204).end();
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
