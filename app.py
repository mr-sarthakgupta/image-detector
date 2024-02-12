from flask import Flask, request, jsonify, render_template, json 
import pickle
import numpy as np
from flask_cors import CORS
import timm
import base64
import requests

app = Flask(__name__)
CORS(app)

model = timm.create_model('mobilenetv3_large_100.ra_in1k', pretrained=True)
model = model.eval()
data_config = timm.data.resolve_model_data_config(model)
transforms = timm.data.create_transform(**data_config, is_training=False)

@app.route('/predict', methods=['POST'])
def predict():
    img = request.form.get('image')
    if img is not None:
        print('meow')
        prediction = model(transforms(img).unsqueeze(0))
        return jsonify({'prediction': int(prediction)})
    else:
        print('woof')
        return jsonify({'error': 'bruski.'})

if __name__ == '__main__':
    app.run(debug=True)