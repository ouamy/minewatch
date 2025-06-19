const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 3100
const CORRECT_PASSWORD = 'Yahyatamer0'

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.post('/command', (req, res) => {
  const { action, password } = req.body
  if (password !== CORRECT_PASSWORD) {
    return res.json({ message: 'Access denied: wrong password.' })
  }

  const command = action === 'start' ? './start.sh' : './stop.sh'

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ message: `Error: ${stderr || error.message}` })
    }
    res.json({ message: stdout.trim() || `${action} command executed successfully.` })
  })
})

app.listen(PORT, () => {
  console.log(`MineWatch server running on http://localhost:${PORT}`)
})

