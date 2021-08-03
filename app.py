from flask import Flask, render_template, url_for, send_from_directory, jsonify, request
from flask_bootstrap import Bootstrap
import json
import pandas as pd

app = Flask(__name__)
bootstrap = Bootstrap(app)


if __name__ == '__main__':
    app.run (debug=True, use_reloader=True, host="0.0.0.0")