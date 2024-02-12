import * as ort from 'onnxruntime-web';

document.getElementById('coverImg').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: coverImage,
  });
});

async function coverImage() {
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
      console.log('this is happening')
      // try {
      const options = {
        executionProviders: ['wasm'], 
        graphOptimizationLevel: 'all'
      };
      const session = ort.InferenceSession.create('./mobilenetv2-10.onnx', options);
      console.log('model loaded')
      const dims = [1, 3, 224, 224];
      console.log('dims loaded')
      const size = dims[0] * dims[1] * dims[2] * dims[3];
      console.log('size loaded')
      const inputData = Float32Array.from({ length: size }, () => Math.random());
      console.log('inputData loaded')
      const feeds = { input1: new ort.Tensor('float32', inputData, dims) };
      console.log('feeds loaded')
      // feed inputs and run
      const results = await session.run(feeds);
      console.log(results.output1.data);
  }
}






