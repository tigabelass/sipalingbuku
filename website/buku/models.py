from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.TextField()
    description = models.TimeField(blank=True, null=True)
    published_date = models.CharField(max_length=50, blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    rating = models.FloatField(default=0.0)
    
    def __str__(self):
        return self.title