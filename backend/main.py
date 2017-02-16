from sys import path
from json import loads

from sanic import Sanic
from sanic.response import json, html, HTTPResponse
from sanic_cors import CORS

from utils.api.models import get_model_data, update_model_data

import settings

from universe import models

path.append(settings.PROJECT_PATH)

app = Sanic()
CORS(app)

app .static('/static', 'static')

@app.route('/api/models/<model_type>/<model_name>/', methods=['GET', 'POST'])
async def provide_to_model(request, model_type, model_name):
    print(request.method)
    if request.method == 'GET':
        response = json(get_model_data(model_type, model_name, request.args))
        response.content_type = 'application/json; charset=utf-8;'
    elif request.method == 'POST':
        update_model_data(model_type, model_name, loads(request.json))
        response = HTTPResponse(status=200, body='OK')
    return response

@app.route('/', methods=['GET',])
async def index(request):
    with open('static/index.html') as html_file:
        response = html(html_file.read())
    return response

if __name__ == '__main__':
    app.run(host=settings.HOST['address'], port=settings.HOST['port'])
