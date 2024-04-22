
# Emotion-based music recommendation system

This web-based app written in Python will first scan your current emotion with the help of OpenCV & then crop the image of your face from the entire frame once the cropped image is ready it will give this image to a trained MACHINE LEARNING model to predict the emotion of the cropped image. Now once we have your image, it will list of emotions with their percentage . After performing all the above steps we will have a list of recommended songs based on emotions in the list.


## Installation & Run

Create a new project in Pycharm and add the above files. After that open the terminal and run the following command. This will install all the modules needed to run this app. 

```bash
  pip install -r requirements.txt
```

To run the app, type the following command in one terminal with working directory EmoTunes. 
```bash
  npm run start
```
and following command in other with backend_api as working directory
```bash
  flask run
```

## Libraries

- Flask
- Opencv
- Numpy
- Pandas
- Tensorflow
- Keras





## Demo video

<p align="center">
  <img src="https://github.com/akshat2635/Emotion-Based-Music-Recommender/blob/master/Emotunes-demo.gif" alt="Demo GIF" width="400" height="300">
</p>

 

## Authors

- [Akshat Jain](https://github.com/akshat2635)


