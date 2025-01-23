import requests
from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Book
import os
from dotenv import load_dotenv
# Create your views here.
load_dotenv()
def search_books(request):
    query = request.GET.get('q')
    API_KEY = os.getenv('API_KEY')
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&key={API_KEY}"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json() # data mentah
        books = []
        for item in data['items']:
            book = {
                "title": item['volumeInfo'].get('title','Uknown Title'),
                "authors": item['volumeInfo'].get('authors',['Unknown Author']),
                "description": item['volumeInfo'].get('description','No Deskription'),
                "publishedDate": item['volumeInfo'].get('published','Unknown Date'),
                "thumbnail": item['volumeInfo'].get('imageLinks', {}).get('thumbnail', None),
                "averageRating": item['volumeInfo'].get('averageRating',0),
                "ratingsCount": item['volumeInfo'].get('ratingsCount',0)
            }
            books.append(book)
        return JsonResponse(books, safe=False)
    else:
        return JsonResponse({ "error": "Gagal menggambil data"}, status=response.status_code)
