import numpy
from pubsub import pub
import os
from net.simpleNet import SimpleNet, trainingLetters
from net.rcnn import training
from gui.js_functions import js

datasetDescription = {
    'BLOCKS': 'для блоков ответов', 
    'LETTERS_BLOCK': 'для блоков символов', 
    'LETTERS': 'для символов'
}

   
def trainingNet(settings):
    description = datasetDescription[settings['typeOfDataset']]
    js.warning(f"Обучение нейронной сети {description}")
    if settings['typeOfDataset'] == 'LETTERS':
        trainingLetters(settings)
        return
    if settings['typeOfDataset'] == 'BLOCKS':
        trainingBlocks(settings)
        return
    if settings['typeOfDataset'] == 'LETTERS_BLOCK':
        trainingLetterBlocks(settings)
        return

def trainingBlocks(settings):
    training()

def trainingLetterBlocks(settings):
    training('letterBlocks')

