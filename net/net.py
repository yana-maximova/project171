import numpy
from pubsub import pub
from net.simpleNet import SimpleNet
from gui.js_functions import js
import traceback
import os

trainingAnnotations = os.path.join(os.getcwd(), 'datasets', 'mnist_train_100.csv')
testingAnnotations = os.path.join(os.getcwd(), 'datasets', 'mnist_test_10.csv')
datasetDescription = {
    'BLOCKS': 'для блоков ответов', 
    'LETTER_BLOCKS': 'для блоков символов', 
    'LETTERS': 'для символов'
}

def scaleValues(array):
    newArray = (numpy.asfarray(array[1:]) / 255.0 * 0.99) + 0.01
    return newArray

def prepareNet(inputNodes, hiddenNodes, outputNodes, learningRate):
    # экземпляр нейронной сети
    net = SimpleNet(inputNodes, hiddenNodes, outputNodes, learningRate)
    return net

def loadData(path):
    with open(path, 'r') as dataFile:
        data = dataFile.readlines()
    return data

def train(net, record):
    # получить список значений, используя символы запятой (1,1)
    # в качестве разделителей
    values = record.split(',')
    # масштабировать и сместить входные значения
    inputs = scaleValues(values)
    # создать целевые выходные значения (все равны 0,01, за исключением
    # желаемого маркерного значения, равного 0,99)
    targets = numpy.zeros(net.getOutputNodesCount()) + 0.01
    # values[0] - целевое маркерное значение для данной записи
    targets[int(values[0])] = 0.99
    net.train(inputs, targets)
	
def test(net, record):
    # получить список значений из записи, используя символы
    # запятой (*,1) в качестве разделителей
    values = record.split(',')
    # правильный ответ - первое значение
    correct = int(values[0])
    # масштабировать и сместить входные значения
    inputs = scaleValues(values)
    # опрос сети
    outputs = net.query(inputs)
    # индекс наибольшего значения является маркерным значением
    calculated = numpy.argmax(outputs)
    return {'correct': correct, 'calculated': calculated}

def trainingNet(settings):

    if settings['typeOfDataset'] != 'LETTERS':
        js.message(f"Данный раздел находится в разработке")
        return
        

    # Подготовка данных
    description = datasetDescription[settings['typeOfDataset']]
    # количество узлов входного слоя
    inputNodes = settings['inputNodes']#784
    # количество узлов выходного слоя
    outputNodes = settings['outputNodes']#10
    # Количество узлов скрытого слоя
    hiddenNodes = settings['hiddenNodes']
    # количество эпох обучения
    epochsCount = settings['epochs']

    # загрузить данные из файла аннотаций
    js.message(f"Загрузка данных из {trainingAnnotations}")
    try:
        dataList = loadData(trainingAnnotations)
    except:
        print('Ошибка:\n', traceback.format_exc())
        js.error(f"Ошибка открытия файла {trainingAnnotations}")
        js.error(f"{traceback.format_exc()}")
        return
    lenOfData = len(dataList)
    if lenOfData == 0:
        js.error(f"В файле аннотации отсутсвуют данные")
        return

    # создание нейронной сети
    try:
        net = prepareNet(inputNodes, hiddenNodes, outputNodes, 0.2) 	
    except:
        js.error(f"Ошибка создания нейронной сети")
        js.error(f"{traceback.format_exc()}")
        return
   		
    # тренировка нейронной сети
    js.message(f"Тренировка нейронной сети {description}")
	
    # перебрать все записи в тренировочном наборе данных
    for epoch in range(1, epochsCount + 1):
        js.message(f"Эпоха {epoch}")

        recordNumber = 1
        js.message(f"Запись {recordNumber}")

        for record in dataList:
            js.message(f"Запись {recordNumber} из {lenOfData}", replace=True)
            try:
                train(net, record)
            except:
                js.error(f"Ошибка при тренировка сети: эпоха {eposhNumber} Запись {recordNumber}")
                js.error(f"{traceback.format_exc()}")
                return
            recordNumber = recordNumber + 1

    # тестирование нейронной сети

    # загрузить данные из файла аннотаций
    js.message(f"Загрузка данных из {testingAnnotations}")
    try:
        with open(testingAnnotations, 'r') as testFile:
            testList = loadData(testingAnnotations)
    except:
        js.error(f"Ошибка открытия файла {testingAnnotations}")
        js.error(f"{traceback.format_exc()}")
        return

    lenOfData = len(testList)
    if lenOfData == 0:
        js.error(f"В файле аннотации отсутсвуют данные")
        return
		
    scorecard = []
    recordNumber = 1

    js.message("Тестирование нейронной сети")
    js.message(f"Запись {recordNumber}")

    # перебрать все записи в тестовом наборе данных
    for record in testList:
        js.message(f"Запись {recordNumber} из {lenOfData}", replace=True)
        recordNumber = recordNumber + 1
        try:
            resultOfTest = test(net, record)
        except:
            js.error(f"Ошибка при тестировании сети: эпоха {eposhNumber} Запись {recordNumber}")
            js.error(f"{traceback.format_exc()}")
            return
        # присоединить оценку ответа сети к концу списка
        if (resultOfTest['calculated'] == resultOfTest['correct']):
            # в случае правильного ответа сети присоединить
            # к списку значение 1
            scorecard.append(1)
        else:
            # в случае неправильного ответа сети присоединить
            # к списку значение 0
            scorecard.append(0)

    scorecardArray = numpy.asarray(scorecard)
    js.message(f"Качество обучения {scorecardArray.sum() / scorecardArray.size}")
    js.warning(f"Результаты обучения не сохранены в модель")
    js.message('')
