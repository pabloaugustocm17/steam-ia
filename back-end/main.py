from fastapi import FastAPI, HTTPException
import requests
from recommendationAI import RecommendationIA
from fastapi.middleware.cors import CORSMiddleware

STEAM_API_KEY = "6DA6EEBBF36DC353235882454540220C"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_steam_id(username):
    url = f"http://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/"
    params = {
        "key": STEAM_API_KEY,
        "vanityurl": username
    }
    response = requests.get(url, params=params)
    
    data = response.json()
    if data['response']['success'] == 1:
        return data['response']['steamid']
    else:
        return None
    

def get_owned_games(steam_id):
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/"
    params = {
        "key": STEAM_API_KEY,
        "steamid": steam_id,
        "include_appinfo": True,        
        "include_played_free_games": True,
        "format": "json"
    }
    response = requests.get(url, params=params)
    data = response.json()

    if 'response' in data and 'games' in data['response']:
        return data['response']['games']
    else:
        return None

def get_game_genres(app_id):
    url = f"https://steamspy.com/api.php"
    params = {
        "request": "appdetails",
        "appid": app_id
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data.get("genre", "Gênero desconhecido")

@app.get("/api/v1/games/{username}")
def get_user_games(username: str):
    steam_id = get_steam_id(username)
    
    if not steam_id:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    games = get_owned_games(steam_id)
    
    if games is None:
        raise HTTPException(status_code=404, detail="Nenhum jogo encontrado ou o perfil é privado")
    
    return games


@app.get("/api/v1/games/{username}/recommendations")
def get_user_games_recommendations(username: str):
    dataset_path = './dataset/games.csv'
    recommendation_system = RecommendationIA(dataset_path)
    
    steam_id = get_steam_id(username)
    
    if not steam_id:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    games = get_owned_games(steam_id)
   
    if games is None:
        raise HTTPException(status_code=404, detail="Nenhum jogo encontrado ou o perfil é privado")
    
    categories = []
    genres = []

    games_with_genres = []
   
    for game in games:
       genre = get_game_genres(game['appid'])
       genres.append(genre)
    #    games_with_genres.append({
    #        "name": game['name'],
    #        "playtime_forever": game['playtime_forever'],
    #        "genre": genre
    #    })
    
    

    return recommendation_system.recommend(categories=categories, genres=genres, top_n=9)
