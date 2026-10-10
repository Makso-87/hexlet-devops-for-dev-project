(async () => {
  const loadPageText = async () => {
    const div = document.createElement('div');

    try {
      const response = await fetch('/api/config');

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const config = await response.json();
      div.textContent = config.text;

    } catch (error) {
      console.error('Не удалось загрузить текст:', error);
      div.textContent = 'Не удалось загрузить текст';
    }

    document.body.appendChild(div);
  };

  await loadPageText();
})();