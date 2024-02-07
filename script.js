document.addEventListener('DOMContentLoaded', function () {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const qrCodeDiv = document.getElementById('qrCode');
    const message = document.getElementById('message');
  
    urlForm.addEventListener('submit', async function (event) {
      event.preventDefault(); 
  
      const url = urlInput.value.trim();
      if (!url) {
        message.textContent = 'Please enter a valid URL';
        return;
      }
  
      try {
        const response = await fetch('https://qr-backend-tau.vercel.app/generate-qr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate QR code');
        }
  
        const blob = await response.blob();
  
        const qrImg = new Image();
        qrImg.src = URL.createObjectURL(blob);
        console.log(qrImg.src)
        qrCodeDiv.innerHTML = ''; 
        qrCodeDiv.appendChild(qrImg); 
  
        saveURLToFile(url);
      } catch (error) {
        message.textContent = error.message;
      }
    });
  });
  
  function saveURLToFile(url) {
    fetch('https://qr-backend-tau.vercel.app/save-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save URL to file');
        }
        console.log('URL saved successfully');
      })
      .catch(error => {
        console.error('Error saving URL:', error);
      });
  }
  
