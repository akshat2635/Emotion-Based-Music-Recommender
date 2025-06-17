# EmoTunes: Music Recommendation based on Facial Expressions

This project contains a web application, "EmoTunes," that recommends music based on your facial expressions, along with the Jupyter notebooks used for model development and data processing.

## Project Overview

The core of this project is **EmoTunes**, a React-based web application with a Python Flask backend. It uses a webcam to detect a user's face and analyze their emotion. Based on the detected emotion, it recommends a playlist of songs.

The project also includes the Jupyter Notebooks that were used to:
1.  Train the facial expression recognition model.
2.  Analyze and cluster the music dataset.

## Components

### 1. EmoTunes Web Application (`EmoTunes/`)

A full-stack application that provides a user interface for real-time emotion-based music recommendations.

*   **Frontend (`EmoTunes/src/`)**: A React application that captures video from the user's webcam and displays the music recommendations.
*   **Backend (`EmoTunes/backend_api/`)**: A Flask API that receives an image from the frontend, performs emotion detection, and returns a list of recommended songs.

### 2. Facial Expression Recognition Notebook (`Facial_Expression_recogniton.ipynb`)

This notebook details the process of building and training the Convolutional Neural Network (CNN) for emotion detection. It covers data preprocessing, model architecture, training, and evaluation. The trained model (`my_cnn_61.h5`) is used in the Flask backend.

### 3. Music Recommendation Notebook (`music_recommendation.ipynb`)

This notebook covers the exploration and clustering of the music dataset (`top_10000_1960-now.csv`). Songs are clustered based on their audio features, and these clusters are mapped to different emotions. The resulting dataset with clustered songs is `clustered_songs4.csv`.

## Tech Stack

*   **Frontend**: React, React Router, WebRTC
*   **Backend**: Flask, TensorFlow, Keras, OpenCV, Pandas
*   **Machine Learning**: Jupyter Notebook, Scikit-learn
*   **DevOps**: Concurrently (for running frontend and backend together)

## How to Run the EmoTunes Application

### Prerequisites

*   Node.js and npm
*   Python 3 and pip
*   A webcam

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd EmoTunes-Project-Folder # Or whatever you name it
    ```

2.  **Backend Setup:**
    ```bash
    cd "EmoTunes\backend_api"
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3.  **Frontend Setup:**
    ```bash
    cd EmoTunes
    npm install
    ```

### Running the Application

You can run the frontend and backend servers in separate terminals, or use the provided concurrent script.

**Option 1: Separate Terminals**

*   **Start Backend Server:**
    In the `EmoTunes\backend_api` directory (with venv activated):
    ```bash
    flask run
    ```
    The backend will be running on `http://127.0.0.1:5000`.

*   **Start Frontend Server:**
    In the `EmoTunes` directory:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

**Option 2: Concurrently**

In the `EmoTunes` directory:
```bash
npm run start-dev
```
This will start both the React development server and the Flask backend server.



## Demo video

<p align="center">
  <img src="https://github.com/akshat2635/Emotion-Based-Music-Recommender/blob/master/Emotunes-demo.gif" alt="Demo GIF" width="480" height="270">
</p>

 

## Authors

- [Akshat Jain](https://github.com/akshat2635).[Ujjwal Jain](https://github.com/ujjwal1729)


