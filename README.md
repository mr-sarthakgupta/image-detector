This is the attempted code for a chrome extension which passes all images on a given web page through a machine learning model to get an output, in this case the model is mobilenetv2-10.onnx present in this directory

The issues start whenever I start using the onnx things, in this case, it is in popup.js line 44. Maybe this is because I'm not importing or maybe building the package properly, but that's kinda my blind guess.

files in use:

manifest.json -> contains info about the files etc
mobilenetv2-10.onnx -> the ML model file
onnx.min.js, ort.min.js -> honestly, idk but ig that's how you get packages in js?
popup.html -> basic button
popup.js -> main stuff, first the code collects all the the images, covers them with red colour(just to visually see that they have been taken account of), then each image should passed through the ML model and covered with blue colour, to visually confirm that it has been processed.

have annotated the popup.js file hopefully it helps
