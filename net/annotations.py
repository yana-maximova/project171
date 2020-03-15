import os
import pickle
from gui.js_functions import js
from PIL import Image, ImageDraw

path = os.path.join(os.getcwd(), 'datasets', 'mnist_train_100.csv')

def getBlocks(data):
    name = data['name']
    try:
        with open(os.path.join(os.getcwd(), 'datasets', name + '.dat'), 'rb') as read_file:
            try:
                data = pickle.load(read_file)
                js.annotations(name, data)
            except EOFError:
                js.annotations(name)
    except FileNotFoundError:
        js.annotations(name)
            
def saveBlocks(data):
    with open(os.path.join(os.getcwd(), 'datasets', data['name'] + '.dat'), "wb") as write_file:
        pickle.dump(data, write_file)
   
def createLettersFromBlocks(data):
    annotationsName = os.path.join(os.getcwd(), 'datasets', 'blocks.dat')
    with open(annotationsName, 'rb') as read_file:
        try:
            data = pickle.load(read_file)
        except EOFError:
            js.error(f'file {annotationsName} not finded')
    commonWidth = 400
    commonHeight = 50
    datas = data['data']
    letterBlocksData = {
        'data': []
    }
    for i in range(len(datas)):
        js.message(f'Обработка блока ответов {i + 1}')
        blocksLenght = len(data['data'][i]['blocks'])
        if blocksLenght == 0:
            continue
        fileName = data['data'][i]['file']
        blockImageData = data['data'][i]['image']
        width = data['data'][i]['width']
        height = data['data'][i]['height']
        blockImage = Image.new('L', (width, height))
        draw = ImageDraw.Draw(blockImage)
        for x in range(width):
            for y in range(height):
                pixel = blockImageData[y * width + x]
                draw.point((x, y), (pixel))

        for j in range(blocksLenght):
            x1 = data['data'][i]['blocks'][j]['left']
            y1 = data['data'][i]['blocks'][j]['top']
            w = data['data'][i]['blocks'][j]['width']
            h = data['data'][i]['blocks'][j]['height']
            x2 = x1 + w
            y2 = y1 + h
            letterBlockImage = Image.new('L', (w, h))
            region = blockImage.crop((x1, y1, x2, y2))
            letterBlockImage.paste(region, (0, 0, w, h))
            letterBlockImage = letterBlockImage.resize((commonWidth, commonHeight))
            pixels = []
            for y in range(commonHeight):
                for x in range(commonWidth):
                    cordinate = x, y = x, y
                    pixels.append(letterBlockImage.getpixel(cordinate))
            letterBlocksData['data'].append({
                'image': pixels,
                'width': commonWidth,
                'height':commonHeight,
                'file': fileName + '_' + str(j + 1),
                'blocks': []
            })
    letterBlocksData['name'] = 'letterBlocks'
    saveBlocks(letterBlocksData)
    js.annotations('letterBlocks', letterBlocksData)