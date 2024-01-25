document.getElementById('coverImg').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: coverImage,
    });
  });



async function coverImage() {
    const sess = new onnx.InferenceSession();
    const modelPath = "model.onnx";
    await sess.loadModel(modelPath);  `

    let images = document.getElementsByTagName('img');
    for (let img of images) {
                let rect = img.getBoundingClientRect();
                let div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.top = rect.top + 'px';
                div.style.left = rect.left + 'px';
                div.style.width = rect.width + 'px';
                div.style.height = rect.height + 'px';
                div.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                div.style.zIndex = 1000;

                document.body.appendChild(div);
    }

    // await sess.loadModel("./model.onnx");
            
    for (let img of images) {
        let rect = img.getBoundingClientRect();
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = rect.top + 'px';
        div.style.left = rect.left + 'px';
        div.style.width = rect.width + 'px';
        div.style.height = rect.height + 'px';
        div.style.backgroundColor = 'rgba(0, 0, 255, 1)';
        div.style.zIndex = 1000;
        document.body.appendChild(div);
    
        // Load the pre-processor image using HTML5 Canvas
        let imgCanvas = document.createElement('canvas');
        imgCanvas.width = img.width;
        imgCanvas.height = img.height;

        let ctx = imgCanvas.getContext('2d');
        // ctx.drawImage(img, 0, 0, img.width, img.height);

        // Input data preprocessing, depending on your model's requirement. assuming grayscale and normalize
        let pixels = ctx.getImageData(0, 0, img.width, img.height);
        // let inputData = new Float32Array(pixels.data.length / 4);
        // for (let i = 0; i < pixels.data.length; i += 4) {
        //     inputData[i / 4] = (pixels.data[i] * 0.299 + pixels.data[i + 1] * 0.587 + pixels.data[i + 2] * 0.114) / 255;
        // }
        const input = new onnx.Tensor(new Float32Array(pixels.data), "float32");

        // ONNX model execution
        const outputMap = sess.run([input]);
        const outputData = outputMap.values().next().value.data;  // Use your model's output
        const predictions = outputData.data;
        const maxPrediction = Math.max(...predictions);
    }
}
