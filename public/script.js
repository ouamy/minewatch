const playButton = document.getElementById('play')
const stopButton = document.getElementById('stop')
const statusBox = document.getElementById('status-box')

async function sendCommand(action) {
  const password = prompt('Enter password:')
  if (!password) return

  const response = await fetch('/command', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, password })
  })

  const result = await response.json()
  statusBox.textContent = `$ ${action}ing server...\n$ ${result.message}`
}

playButton.addEventListener('click', () => sendCommand('start'))
stopButton.addEventListener('click', () => sendCommand('stop'))
