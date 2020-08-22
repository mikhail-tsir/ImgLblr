from flask import Flask, flash, request, redirect, url_for, render_template
import json

app = Flask(__name__)
@app.route('/')
def hello():
    return render_template("login.html")

@app.route('/demo', methods=['GET', 'POST'])
def demo():
    return render_template("demo.html")

@app.route('/images', methods = ['GET', 'POST'])
def get_imgdata():
    tokenid = request.args.get(tokenid)
    return json.dumps({'hello':'world',
            'user': tokenid})

app.run(port=8080)
