import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin

# Initialize Flask application
app = Flask(__name__, static_folder='movie-recommender-app/build', static_url_path='/')
CORS(app)

# Load and preprocess data
movies_data = pd.read_csv('movieDataset.csv',engine="python")

# Selecting the relevant features for recommendation
selected_features = ['genres', 'cast', 'keywords', 'director', 'title', 'production_companies', 'industry']

# Replacing NaN values with empty strings and ensuring all columns are strings
for feature in selected_features:
    movies_data[feature] = movies_data[feature].fillna('').astype(str)

# Combining selected features into a single string 
movies_data['combined_features'] = (
    movies_data['genres'] + ' ' +
    movies_data['keywords'] + ' ' +
    movies_data['title'] + ' ' +
    movies_data['cast'] + ' ' +
    movies_data['director'] + ' ' +
    movies_data['production_companies'] + ' ' +
    movies_data['industry']
)

# Debugging step: Check for NaN values in combined_features
if movies_data['combined_features'].isna().sum() > 0:
    print("Warning: NaN values detected in combined_features!")

# Converting the text data to feature vectors
vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(movies_data['combined_features'])

# Getting the similarity scores using cosine similarity
similarity = cosine_similarity(feature_vectors)

def recommend_movies(movie_name):
    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    
    if not find_close_match:
        return ["No close matches found. Please try another movie."]
    
    close_match = find_close_match[0]
    index_of_the_movie = movies_data[movies_data.title == close_match].index[0]
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    
    recommendations = []
    for i, movie in enumerate(sorted_similar_movies[1:22], start=0):  # Skip the first as it's the input movie itself
        index = movie[0]
        title_from_index = movies_data.loc[index, 'title']
        recommendations.append(title_from_index)
    
    return recommendations

@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    # Return all movie titles from the dataset
    movies = list(movies_data['title'].str.capitalize())
    result = {'arr': movies}
    return jsonify(result)

@app.route('/')
@cross_origin()
def serve():
    # Serve the React application
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/similarity/<name>', methods=['GET'])
@cross_origin()
def similarity_endpoint(name):
    # Recommend movies based on the provided movie name
    recommendations = recommend_movies(name)
    return jsonify({'movies': recommendations})

@app.errorhandler(404)
def not_found(e):
    # Handle 404 errors by serving the React application
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)