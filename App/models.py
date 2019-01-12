from django.db import models

# Create your models here.

class Banner(models.Model):
    img = models.CharField(max_length=100)

    class Meta:
        db_table = 'Banner'



class Book(models.Model):
    title = models.CharField(max_length=100)
    img = models.CharField(max_length=100)
    newprice = models.CharField(max_length=30)
    oldprice = models.CharField(max_length=30)
    author = models.CharField(max_length=30)
    publisher = models.CharField(max_length=30)

    class Meta:
        db_table = 'Book'



class User(models.Model):
    name = models.CharField(max_length=30)
    phone = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=255)
    token = models.CharField(max_length=255)


    class Meta:
        db_table = 'User'



#購物車
class Cart(models.Model):

    user = models.ForeignKey(User)
    book = models.ForeignKey(Book)
    number = models.IntegerField()
    isselect = models.BooleanField(default=True)

    class Meta:
        db_table = "Cart"



