(function () {
  const icons = {
    success: 'OK',
    error: '!',
    info: 'i',
  }

  function getContainer() {
    let container = document.getElementById('toast-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'toast-container'
      container.setAttribute('aria-live', 'polite')
      container.setAttribute('aria-atomic', 'true')
      document.body.appendChild(container)
    }
    return container
  }

  function showToast(message, type = 'info', options = {}) {
    const container = getContainer()
    const toast = document.createElement('div')
    const safeType = ['success', 'error', 'info'].includes(type) ? type : 'info'
    const duration = Number(options.duration || 4200)

    toast.className = `toast toast-${safeType}`
    toast.setAttribute('role', safeType === 'error' ? 'alert' : 'status')
    toast.innerHTML = `
      <span class="toast-icon">${icons[safeType]}</span>
      <span class="toast-message"></span>
      <button class="toast-close" type="button" aria-label="Fechar notificacao">x</button>
    `
    toast.querySelector('.toast-message').textContent = message || 'Acao concluida.'

    const removeToast = () => {
      toast.classList.add('toast-exit')
      setTimeout(() => toast.remove(), 180)
    }

    toast.querySelector('.toast-close').addEventListener('click', removeToast)
    container.appendChild(toast)

    if (duration > 0) {
      setTimeout(removeToast, duration)
    }

    return toast
  }

  window.showToast = showToast

  window.addEventListener('error', (event) => {
    showToast(event.message || 'Ocorreu um erro inesperado.', 'error')
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    const message = reason?.message || reason || 'Nao foi possivel concluir a acao.'
    showToast(String(message), 'error')
  })

  const originalFetch = window.fetch
  if (originalFetch) {
    window.fetch = async function (...args) {
      try {
        const response = await originalFetch.apply(this, args)
        const method = String(args[1]?.method || 'GET').toUpperCase()

        if (!response.ok) {
          let message = `Erro ${response.status}`
          try {
            const clone = response.clone()
            const data = await clone.json()
            message = data.error || data.message || message
          } catch (_) {
            message = response.statusText || message
          }
          showToast(message, 'error')
        } else if (method !== 'GET') {
          showToast('Acao concluida com sucesso.', 'success')
        }

        return response
      } catch (error) {
        showToast('Nao foi possivel comunicar com o servidor.', 'error')
        throw error
      }
    }
  }
})()
