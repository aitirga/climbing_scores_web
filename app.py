from flask import Flask, render_template, url_for, send_from_directory, jsonify, request
from flask_bootstrap import Bootstrap
import json
import pandas as pd
import os

app = Flask(__name__)
bootstrap = Bootstrap(app)


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    # app.run(debug=True, use_reloader=True)

    app.run (debug=True, use_reloader=True,
             port=4445)
