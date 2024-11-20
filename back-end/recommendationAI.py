import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import os
from concurrent.futures import ThreadPoolExecutor

class RecommendationIA:
    _instance = None 

    CATEGORIES_PATH = "../csm_categories.npy"
    GENRES_PATH = "../csm_genres.npy"
    STOP_WORDS = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na']
     
    def __new__(cls, dataset_path):
    
        if cls._instance is None:
            cls._instance = super(RecommendationIA, cls).__new__(cls)
            cls._instance._initialized = False 
        return cls._instance

    def __init__(self, dataset_path):
    
        if self._initialized:
            return
        self._initialized = True 

        self.data = pd.read_csv(dataset_path)
        columns_needed = ['AppID', 'Name', 'Required age', "About the game", 'Supported languages', 'Header image', 'Publishers', 'Categories', 'Genres', 'Tags', 'Screenshots', 'Movies']
        self.simple_data = self.data[columns_needed].copy()
        self.simple_data.rename(columns={"Name": "Release date", "AppID": "Name"}, inplace=True)
        self.simple_data.fillna('', inplace=True)
        self.simple_data.reset_index(drop=True, inplace=True)

        self.tf = TfidfVectorizer(analyzer="word", ngram_range=(1, 2), min_df=0.0, stop_words=self.STOP_WORDS)
        tf_matrix_categories = self.tf.fit_transform(self.simple_data['Categories'])
        tf_matrix_genres = self.tf.fit_transform(self.simple_data['Genres'])
        
        with ThreadPoolExecutor() as executor:
            future_categories = executor.submit(self._calculate_and_store_similarity, tf_matrix_categories, self.CATEGORIES_PATH)
            future_genres = executor.submit(self._calculate_and_store_similarity, tf_matrix_genres, self.GENRES_PATH)
            
            self.csm_categories = future_categories.result()
            self.csm_genres = future_genres.result()
    
    def _calculate_and_store_similarity(self, matrix, path, block_size=100, top_n=10):
        if os.path.exists(path):
            return np.load(path, allow_pickle=True).item()

        n_rows = matrix.shape[0]
        similar_items = {}

        for i in range(0, n_rows, block_size):
            end_i = min(i + block_size, n_rows)
            block_i = matrix[i:end_i]

            for j in range(i, n_rows, block_size):
                end_j = min(j + block_size, n_rows)
                block_j = matrix[j:end_j]
                similarity_block = linear_kernel(block_i, block_j)

                for idx_i, row in enumerate(similarity_block):
                    idx_global_i = i + idx_i
                    top_indices = np.argpartition(row, -top_n)[-top_n:]
                    top_similarities = [(j + idx_j, row[idx_j]) for idx_j in top_indices]
                    top_similarities = sorted(top_similarities, key=lambda x: x[1], reverse=True)
                    similar_items[idx_global_i] = top_similarities

        np.save(path, similar_items)
        return similar_items
    
    def recommend(self, categories=None, genres=None, top_n=10):
        if not categories and not genres:
            raise ValueError("You must provide at least one array of categories or genres.")
        
        category_vector = self.tf.transform([' '.join(categories)]) if categories else None
        genre_vector = self.tf.transform([' '.join(genres)]) if genres else None

        category_scores = linear_kernel(category_vector, self.tf.transform(self.simple_data['Categories']))[0] if category_vector is not None else np.zeros(len(self.simple_data))
        genre_scores = linear_kernel(genre_vector, self.tf.transform(self.simple_data['Genres']))[0] if genre_vector is not None else np.zeros(len(self.simple_data))
        combined_scores = category_scores + genre_scores

        sim_scores = list(enumerate(combined_scores))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        game_indices = [i[0] for i in sim_scores[:top_n]]

        recommended_games = self.simple_data.iloc[game_indices]
        return recommended_games.to_dict(orient="records")