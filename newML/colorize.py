import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import torchvision.models as models
from skimage.color import lab2rgb
import os

class ColorizationNet(nn.Module):
  def __init__(self, input_size=128):
    super(ColorizationNet, self).__init__()
    MIDLEVEL_FEATURE_SIZE = 128

    ## First half: ResNet
    resnet = models.resnet18(num_classes=365)
    # Change first conv layer to accept single-channel (grayscale) input
    resnet.conv1.weight = nn.Parameter(resnet.conv1.weight.sum(dim=1).unsqueeze(1))
    # Extract midlevel features from ResNet-gray
    self.midlevel_resnet = nn.Sequential(*list(resnet.children())[0:6])

    ## Second half: Upsampling
    self.upsample = nn.Sequential(
      nn.Conv2d(MIDLEVEL_FEATURE_SIZE, 128, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(128),
      nn.ReLU(),
      nn.Upsample(scale_factor=2),
      nn.Conv2d(128, 64, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(64),
      nn.ReLU(),
      nn.Conv2d(64, 64, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(64),
      nn.ReLU(),
      nn.Upsample(scale_factor=2),
      nn.Conv2d(64, 32, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(32),
      nn.ReLU(),
      nn.Conv2d(32, 2, kernel_size=3, stride=1, padding=1),
      nn.Upsample(scale_factor=2)
    )

  def forward(self, input):

    # Pass input through ResNet-gray to extract features
    midlevel_features = self.midlevel_resnet(input)

    # Upsample to get colors
    output = self.upsample(midlevel_features)
    return output



def to_rgb(grayscale_input, ab_input, save_path, save_name):
  # Adjust the shape unpacking
  C, H, W = grayscale_input.shape  # Now expecting 3 values: channels, height, width

  # Ensure ab_input has the same spatial dimensions as grayscale_input
  ab_input_resized = torch.nn.functional.interpolate(ab_input.unsqueeze(0), size=(H, W), mode='bilinear',
                                                     align_corners=False).squeeze(0)

  # Combine grayscale and ab channels
  # Combine grayscale and ab channels
  color_image = torch.cat((grayscale_input, ab_input_resized), 0).numpy()  # combine channels

  color_image = color_image.transpose((1, 2, 0))  # rescale for matplotlib
  color_image[:, :, 0:1] = color_image[:, :, 0:1] * 100
  color_image[:, :, 1:3] = color_image[:, :, 1:3] * 255 - 128
  color_image = lab2rgb(color_image.astype(np.float64))
  grayscale_input = grayscale_input.squeeze().numpy()
  #if save_path is not None and save_name is not None:
  #  plt.imsave(arr=grayscale_input, fname='{}{}'.format(save_path['grayscale'], save_name), cmap='gray')
  #  plt.imsave(arr=color_image, fname='{}{}'.format(save_path['colorized'], save_name))
  return color_image


def colorize_single_image(image_path, model, criterion, save_dir, epoch, use_gpu=True):
  model.eval()

  # Load and preprocess the image
  transform = transforms.Compose([

    transforms.ToTensor()
  ])
  image = Image.open(image_path).convert("L")  # Convert to grayscale
  input_gray = transform(image).unsqueeze(0)  # Add batch dimension

  # Use GPU if available
  if use_gpu and torch.cuda.is_available():
    input_gray = input_gray.cuda()
    model = model.cuda()

  # Run model
  with torch.no_grad():
    output_ab = model(input_gray)

  # Create save directory if it doesn't exist

  os.makedirs(save_dir, exist_ok=True)

    # Create save paths for grayscale and colorized images
  save_paths = {
      'grayscale': os.path.join(save_dir, 'gray/'),
       'colorized': os.path.join(save_dir, 'color/')
  }
  os.makedirs(save_paths['grayscale'], exist_ok=True)
  os.makedirs(save_paths['colorized'], exist_ok=True)

    # Save the colorized image
  save_name = f'colorized-epoch-{epoch}.jpg'
  img = to_rgb(input_gray[0].cpu(), ab_input=output_ab[0].detach().cpu(), save_path=save_paths, save_name=save_name)

  return img 

  # Load model and run colorization (Example usage)

def run_example(image_path, save_dir):
    use_gpu = torch.cuda.is_available()

    model = ColorizationNet()
    model_path = 'colorization_md1.pth'  # Update with the path to your model
    pretrained = torch.load(model_path, map_location=lambda storage, loc: storage)
    model.load_state_dict(pretrained)
    model.eval()

    criterion = nn.MSELoss()

    with torch.no_grad():
        colorize_single_image(image_path, model, criterion, save_dir, epoch=0, use_gpu=use_gpu)

if __name__ == "__main__":
      # Example of how to use this script as a library
    image_path = 'example_image.jpg'  # Replace with your image path
    save_dir = 'results'  # Replace with your desired save path
    run_example(image_path, save_dir)
