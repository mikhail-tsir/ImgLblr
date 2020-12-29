from flask import Flask, flash, request, redirect, url_for, render_template
import json
import boto3
from botocore.exceptions import ClientError
import logging

s3 = boto3.resource('s3')
bucket_name = "imglabeler"

app = Flask(__name__)
@app.route('/')
def hello():
    return render_template("login.html")

@app.route('/demo', methods=['GET', 'POST'])
def demo():
    return render_template("demo.html")

@app.route('/images', methods = ['GET', 'POST'])
def get_imgdata():
    tokenId = request.args.get("tokenId")
    return json.dumps({'hello':'world',
            'user': tokenId})

@app.route('/generateurl', methods=['GET', 'POST'])
def create_presigned_post():
    s3_client = boto3.client('s3')
    object_name = request.args.get("name")

    try:
        response = s3_client.generate_presigned_post(bucket_name, object_name)
    except ClientError as e:
        print(e)
        return None

    return response

if (__name__ == "__main__"):
    app.run(host='0.0.0.0', port=5000)
