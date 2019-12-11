import os
from json import load, dump
from gui.js_functions import js

path = os.path.join(os.getcwd(), 'datasets', 'mnist_train_100.csv')

def getAnnotationsBlock(data):
    with open(os.path.join(os.getcwd(), 'datasets', 'blocks.json'), 'r') as read_file:
        data = load(read_file)
    js.annotations(data)

def saveAnnotationsBlock(data):
    with open(os.path.join(os.getcwd(), 'datasets', 'blocks.json'), "w") as write_file:
        dump(data, write_file)
