import requests
from django.http import JsonResponse
from django.shortcuts import render
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Function for searching books via API
def search_books(request):
    query = request.GET.get('q', '').strip()  # Pastikan query tidak kosong
    API_KEY = os.getenv('GOOGLE_BOOKS_API_KEY')

    if not query:  # Cegah request tanpa query
        return JsonResponse({"error": "Query tidak boleh kosong"}, status=400)

    if not API_KEY:  # Pastikan API_KEY tersedia
        return JsonResponse({"error": "API Key tidak ditemukan"}, status=500)

    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&key={API_KEY}&maxResults=10"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        books = []
        for item in data.get('items', []):
            book = {
                "title": item['volumeInfo'].get('title', 'Unknown Title'),
                "authors": item['volumeInfo'].get('authors', ['Unknown Author']),
                "description": item['volumeInfo'].get('description', 'No Description'),
                "publishedDate": item['volumeInfo'].get('publishedDate', 'Unknown Date'),
                "thumbnail": item['volumeInfo'].get('imageLinks', {}).get('thumbnail', None),
                "averageRating": item['volumeInfo'].get('averageRating', 0),
                "ratingsCount": item['volumeInfo'].get('ratingsCount', 0),
            }
            books.append(book)
        return JsonResponse({"books": books}, safe=False)  # JSON lebih rapi dengan key
    else:
        return JsonResponse({"error": "Gagal mengambil data dari API"}, status=response.status_code)

# Function for homepage
def home(request):
    genres = ["fiction", "psychology", "mystery", "history"]
    booksby_genre = {}
    API_KEY = os.getenv('GOOGLE_BOOKS_API_KEY')

    if not API_KEY:
        return JsonResponse({"error": "API Key tidak ditemukan"}, status=500)

    for genre in genres: 
        url = f"https://www.googleapis.com/books/v1/volumes?q=subject:{genre}&key={API_KEY}&maxResults=6"
        response = requests.get(url)
        
        books = []
        if response.status_code == 200:
            data = response.json()
            for item in data.get('items', []):
                book = {
                    "title": item['volumeInfo'].get('title', 'Unknown Title'),
                    "authors": item['volumeInfo'].get('authors', ['Unknown Author']),
                    "thumbnail": item['volumeInfo'].get('imageLinks', {}).get('thumbnail', None),
                    "description": item['volumeInfo'].get('description', 'No Description'),
                }
                books.append(book)
            booksby_genre[genre] = books
        else:
            booksby_genre[genre] = []  # Jangan biarkan genre kosong tanpa nilai

    return render(request, 'booklist.html', {"booksby_genre": booksby_genre})

# Function for search page
def search(request):
    return render(request, 'booksearch.html') 

def ourteam(request):
    return render(request, 'ourteam.html')
def about(request):
    return render(request, 'about.html')