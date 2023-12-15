import argparse
import time
from pathlib import Path
from flask import Flask,request
import cv2
import torch
import torch.backends.cudnn as cudnn
from numpy import random
from models.experimental import attempt_load
from utils.datasets import LoadStreams, LoadImages
from utils.general import check_img_size, check_requirements, check_imshow, non_max_suppression, apply_classifier, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path
from utils.plots import plot_one_box
from utils.torch_utils import select_device, load_classifier, time_synchronized, TracedModel
from newdetect import detect

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', nargs='+', type=str, default='yolov7.pt', help='model.pt path(s)')
    parser.add_argument('--source', type=str, default='inference/images', help='source')  # file/folder, 0 for webcam
    #1280
    parser.add_argument('--img-size', type=int, default=1280, help='inference size (pixels) model1=undefined, model2=1280, model3=640')
    parser.add_argument('--conf-thres', type=float, default=0.4, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.7, help='IOU threshold for NMS')
    parser.add_argument('--device', default='cpu', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--view-img', action='store_true', help='display results')
    parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
    parser.add_argument('--save-conf', action='store_true', help='save confidences in --save-txt labels')
    parser.add_argument('--nosave', action='store_true', help='do not save images/videos')
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class: --class 0, or --class 0 2 3')
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--update', action='store_true', help='update all models')
    parser.add_argument('--project', default='runs/detect', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')
    parser.add_argument('--no-trace', action='store_true', help='don`t trace model')
    opt = parser.parse_args()
    print(opt)
    #check_requirements(exclude=('pycocotools', 'thop'))
    opt.source = 'inference/images/horses.jpg'
    device = select_device('cpu')
    model1Path = "last0.pt"    #yolov7
    model2Path = "best.pt"
    model3Path = "v3.pt"
    model = attempt_load(model1Path,device)
    print("Model 1 loaded")
    model2 = attempt_load(model2Path,device)
    print("Model2 Loaded")
    model3 = attempt_load(model3Path,device)
    print("Model 3 Loaded")
    #model = TracedModel(model,device,opt.img_size)
    stride = int(model.stride.max())
    stridev2 = int(model2.stride.max())
    stridev3 = int(model3.stride.max())
    def process_img(path,clientName,modelID):
        print(f"Got client {clientName}")
        with torch.no_grad():
            print("The image 1")
            print(path)
            opt.source = path
            if modelID == 0:
                detect(True,path,model1Path,opt,model,stride,device,clientName)
            elif modelID == 1:
                detect(True,path,model2Path,opt,model2,stridev2,device,clientName)
            elif modelID == 2:
                detect(True,path,model3Path,opt,model3,stridev3,device,clientName)
     
    app = Flask(__name__)
    print("server is started")
    @app.route('/',methods = ['POST', 'GET'])
    def detect_image():
        path = request.get_json(force=True)
        clientName = path['client']
        modelID = 0
        _model = path['model']
        print(_model)
        modelID = int(_model)
        print("Predicting from model "+ str(modelID))
        print(type(_model))
        path = path['path']
        print("processing")
        print(path)
        if modelID == 0:
            process_img(path,clientName,modelID)
        elif modelID == 1:
            process_img(path,clientName,modelID)
        elif modelID == 2:
            process_img(path,clientName,modelID)
        return 'Hello, World!'
    @app.route('/exit')
    def exitApp():
        exit()
    app.run(host='0.0.0.0', port=80)
