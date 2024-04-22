from flask import Flask, request,jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
import pandas as pd
import tensorflow as tf
from keras.models import load_model
faceCascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')
model=load_model('my_cnn_61.h5')
class_name=['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
df=pd.read_csv('clustered_songs4.csv')
emotion_cluster={'angry':2,'disgust':0,'happy':1,'surprise':1,'sad':0,'fear':2,'neutral':3}


def prediction(image):
    if image==None or len(image)==0:
        return {"happy":0.6312,"sad":0.2131,"neutral":0.1557}
    pred_prob=model.predict(np.array(image)/255)[0]
    temp={}
    for i in range(len(pred_prob)):
        temp[class_name[i]]=pred_prob[i]
    sorted_key=sorted(temp.items(), key=lambda x:(-x[1]), reverse=True)
    fans={}
    for item in sorted_key:
        fans[item[0]]=item[1]
    return fans

def cropped_img(img):
    faces = faceCascade.detectMultiScale(img, 1.3, 3)
    out=[]
    for x,y,w,h in faces:
        roi_Img = img[ y: y + h , x: x + w ]
        res_img=cv2.resize(roi_Img,(96,96))
        out.append(res_img)
    return out

def recommend(emotion,ec,n):
    cluster=ec[emotion]
    all_songs=df[df['cluster']==cluster]
    return all_songs.sample(n).sort_values(by='Popularity',ascending=False)


def tracks(moods):
    if(len(moods)==0):
        return []
    for i in moods:
        moods[i]*=20
        moods[i]=round(moods[i])
    tracks=[]
    for mood in moods:
        songs=recommend(mood,emotion_cluster,moods[mood])
        cols=["Track URI","Track Name","Album Name","Album Release Date",'Popularity',"Artist Name(s)"]
        ar=np.array(songs[cols])
        out=[]
        for i in ar:
            cur={}
            for j in range(len(cols)):
                cur[cols[j]]=i[j]
            out.append(cur)
        tracks=tracks+out
    return tracks



app = Flask(__name__)
CORS(app)
# Function to convert base64 image data to cv2 image array
def base64_to_cv2(image_data):
    # Split the base64 string header from the data
    encoded_data = image_data.split(',')[1]

    # Decode the base64 string into bytes
    decoded_bytes = base64.b64decode(encoded_data)

    # Convert bytes to a NumPy array
    np_array = np.frombuffer(decoded_bytes, np.uint8)

    # Decode the NumPy array into an image
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    return img
def cvt_df_dict(df):
    cols=df.columns
    ar=np.array(df)
    ans=[]
    for i in ar:
        cur={}
        for j in range(len(cols)):
            cur[cols[j]]=i[j]
        ans.append(cur)
    return ans
def final(cur_img):
    output=prediction(cur_img)
    output1=output.copy()
    for i in output1:
        output1[i]*=100
        output1[i]=round(output1[i],2)
    songs=tracks(output)
    return songs,output1

@app.route('/upload', methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def upload():

    image_data = request.form['image']
    
    # Convert base64 image data to cv2 image array
    img_cv2 = base64_to_cv2(image_data)
    cur_img=cropped_img(img_cv2)

    data,pred=final(cur_img)
    return jsonify({"status":"received",
            "data":data,
            "pred":pred})   

@app.route("/reccomend/<mood>",methods=["GET"])
def mood(mood):
    cols=["Track URI","Track Name","Album Name","Album Release Date",'Popularity',"Artist Name(s)"]
    pred=recommend(mood,emotion_cluster,20)[cols]
    data=cvt_df_dict(pred)
    return jsonify({"mood":mood,"data":data})

if __name__ == '__main__':
    app.run(debug=True)
