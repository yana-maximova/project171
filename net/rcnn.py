import os
import pickle
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import datasets, transforms, models
from PIL import Image, ImageDraw
from gui.js_functions import js

class BlocksDataset(Dataset):
    def __init__(self, images, blocks, transform=None, annotationType='blocks'):
        self.labelSymbol = 0
        if (annotationType == 'letterBlocks'):
            self.labelSymbol = 1
        self.images = images
        self.blocks = blocks
        self.transform = transform

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        image = self.images[idx]
        targets = self.blocks[idx]
        labels = []
        for i in range(len(targets)):
            labels.append(self.labelSymbol)
        sample = {'image': image, 'targets': targets, 'labels': labels}
        if self.transform:
            sample = self.transform(sample)
        return sample


class ToTensor(object):
    def __call__(self, sample):
        image, targets, labels = sample['image'], sample['targets'], sample['labels']
        image = transforms.ToTensor()(image)
        labels = torch.tensor(labels)
        targets = torch.FloatTensor(targets)
        return {'image': image, 'targets': {'boxes': targets, 'labels': labels}}
        
def loadBlocks(annotationType):
    annotationsName = os.path.join(os.getcwd(), 'datasets', annotationType + '.dat')
    with open(annotationsName, 'rb') as read_file:
        try:
            data = pickle.load(read_file)
        except EOFError:
            js.error(f'Файл {annotationsName} не найден')
    datas = data['data']
    imageBlocks = []
    images = []
    for i in range(len(datas)):
        blocksLenght = len(data['data'][i]['blocks'])
        blocks = []
        if blocksLenght == 0:
            continue
        for j in range(blocksLenght):
            blocks.append([
                data['data'][i]['blocks'][j]['left'],
                data['data'][i]['blocks'][j]['top'],
                data['data'][i]['blocks'][j]['width'] + data['data'][i]['blocks'][j]['left'],
                data['data'][i]['blocks'][j]['height'] + data['data'][i]['blocks'][j]['top']
            ])
        imageBlocks.append(blocks)
        imageData = data['data'][i]['image']
        width = data['data'][i]['width']
        height = data['data'][i]['height']
        image = Image.new('L', (416, 416))
        draw = ImageDraw.Draw(image)
        for x in range(width):
            for y in range(height):
                pixel = imageData[y * width + x]
                draw.point((x, y), (pixel))
        images.append(image)
   
    return images, imageBlocks

    
def training(annotationType='blocks'):
    js.warning(f'Процесс обучения может занять продолжительное время!')
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    images, imageBlocks = loadBlocks(annotationType)
    model = models.detection.fasterrcnn_resnet50_fpn(pretrained=False)
    modelState = os.path.join(os.getcwd(), 'datasets', 'blocks.pth')
    checkFile = os.path.exists(modelState)
    if checkFile:
        js.message('загрузка модели сети')
        model.load_state_dict(torch.load(modelState))

    js.message('создание набора данных')
    dataset = BlocksDataset(images, imageBlocks, transform=transforms.Compose([ToTensor()]), annotationType=annotationType)
    #dataset = torch.utils.data.Subset(dataset, indices[:-50])
    params = [p for p in model.parameters() if p.requires_grad]
    #optimizer = torch.optim.Adam(params, lr=0.001)
    optimizer = torch.optim.SGD(params, lr=0.005, momentum=0.9, weight_decay=0.0005)
    
    js.message('обучение сети')
    model.train()
    for epoch in range(1):
        js.message(f'эпоха {epoch + 1}')
        for i in range(len(dataset)):
            js.message(f'изображение {i + 1}')
            sample = dataset[i]
            image = [sample['image']]
            targets = sample['targets']
            
            js.message(f'вычисление выходных данных')
            outputs = model(image, [targets])
            loss = sum(loss for loss in outputs.values())
            js.message(f'оптимизация', replace=True)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            js.message(f'изображение {i + 1} обработано', replace=True)
    js.warning('сохранение модели')
    #torch.save(model.state_dict(), os.path.join(os.getcwd(), 'datasets', 'blocks.pth'))
    js.warning(f'Обучение завершено')
    
   
if __name__ == '__main__':
    training('blocks')
