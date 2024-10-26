document.getElementById('convertButton').addEventListener('click', function () {
    var fileInput = document.getElementById('heicFileInput');
    var progressBar = document.getElementById('progressBar');
    var previewImage = document.getElementById('previewImage');
    var downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        alert('Por favor, selecciona un archivo HEIC.');
        return;
    }

    var file = fileInput.files[0];

    // Mostrar la barra de progreso
    progressBar.style.display = 'block';
    progressBar.value = 0;

    // Ocultar elementos previos
    previewImage.style.display = 'none';
    downloadLink.style.display = 'none';

    // Simular progreso (ya que heic2any no proporciona eventos de progreso)
    var progressInterval = setInterval(function() {
        if (progressBar.value < 90) {
            progressBar.value += 10;
        }
    }, 200);

    heic2any({
        blob: file,
        toType: "image/jpeg",
    }).then(function (result) {
        clearInterval(progressInterval);
        progressBar.value = 100;

        var jpgBlob;
        if (Array.isArray(result)) {
            // Si hay múltiples imágenes, toma la primera
            jpgBlob = result[0];
        } else {
            jpgBlob = result;
        }
        var url = URL.createObjectURL(jpgBlob);
        downloadLink.href = url;
        downloadLink.download = 'imagen.jpg';
        downloadLink.style.display = 'inline-block';
        downloadLink.textContent = 'Descargar JPG';

        // Mostrar la imagen de vista previa
        previewImage.src = url;
        previewImage.style.display = 'block';

        // Ocultar la barra de progreso después de un breve tiempo
        setTimeout(function() {
            progressBar.style.display = 'none';
            progressBar.value = 0;
        }, 500);
    }).catch(function (e) {
        clearInterval(progressInterval);
        progressBar.style.display = 'none';
        progressBar.value = 0;
        console.error(e);
        alert('Error al convertir la imagen.');
    });
});
