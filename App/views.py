import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import Banner, Book, User, Cart


def index(request):
    banners = Banner.objects.all()
    books = Book.objects.all()

    # 狀態保持
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
    else:
        user = ''

    data = {
        'banners':banners,
        'books':books,
        'user':user,
    }
    return render(request,'index.html',context=data)


def detail(request,bid=1):

    book = Book.objects.get(id=bid)
    data={
        'book':book,
    }
    return render(request,'details.html',context=data)



# token生成函數

def generate_token():
    md5 = hashlib.md5()
    temp = str(time.time()) + str(random.random())
    md5.update(temp.encode('utf-8'))
    return  md5.hexdigest()

#編譯密碼
def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()

def register(request):
    if request.method == 'GET':
        return render(request,'register.html')

    elif request.method == 'POST':

        name = request.POST.get('username',None)
        # email = request.POST.get('email')
        phone = request.POST.get('phone',None)
        password = request.POST.get('password',None)

        if name and phone and password:

            user = User()
            user.name = name
        # user.email = email
            user.phone = phone
            user.password = generate_password(password)
            user.token = generate_token()

            user.save()

        # 設置session
            request.session['token'] = user.token


            return redirect('boku:index')

        return render(request,'register.html')
    return  render(request,'register.html')


def login(request):
    if request.method == 'GET':
        return render(request,'enter.html')


    elif request.method == 'POST':

        phone = request.POST.get('phone')
        password = request.POST.get('password')

        if phone and password:
            user = User.objects.get(phone=phone)


            if user:
                if user.password == generate_password(password):

                # 生成token進行狀態保持
                    user.token = generate_token()
                    user.save()
                    request.session['token'] = user.token

                    return redirect('boku:index')

            else:

                return render(request,'enter.html')
        return render(request,'enter.html')

    return render(request,'enter.html')


def logout(request):

    request.session.flush()

    return redirect('boku:index')


def addcart(request):

    token = request.session.get('token')
    bookid = request.GET.get('bookid')
    number = int(request.GET.get('number'))


    data = {}

    if token:
        user = User.objects.get(token=token)
        book = Book.objects.get(pk=bookid)
        carts = Cart.objects.filter(user=user).filter(book=book)

        # 進行邏輯判斷
        if carts.exists():
            cart = carts.first()
            cart.number = cart.number + number
            cart.price = cart.number * float(cart.book.newprice)
            cart.save()
        else:
            cart = Cart()
            cart.user = user
            cart.book = book
            cart.number = number
            cart.price = cart.number * float(cart.book.newprice)
            cart.save()


        data['status'] = 1
        return JsonResponse(data)
    else:
        data['status'] = -1
        data['msg'] = "請登錄後操作"

        return JsonResponse(data)


def showcart(request):
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
        carts = Cart.objects.filter(user=user)
        data = {}
        if carts.exists():
            sum = 0
            for cart in carts:
                number = cart.number
                price = cart.book.newprice
                totalprice = float(price) * number

                print(totalprice)

                sum += totalprice

            print(sum)
            data['carts'] = carts
            data['totalprice'] = int(sum)
            data['totalprice1'] = int(sum) + 5

            return render(request,'cart.html',context=data)
        else:
            return redirect('boku:index')
    return redirect('boku:login')

# 購物車單個選中狀態改變
def changecartstatus(request):
    cartid = request.GET.get('cartid')


    cart = Cart.objects.get(pk=cartid)
    cart.isselect = not cart.isselect
    cart.save()


    data={
        'msg':"修改狀態成功",
        'isselect':cart.isselect
    }
    return JsonResponse(data)


def changeallcartstatus(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)

    isall = request.GET.get('isall')
    if isall == 'true':
        isall = True
    else:
        isall = False


    print(isall)

    for cart in carts:
        cart.isselect = isall
        cart.save()
        print(cart.isselect)

        data={
            "msg":'修改成功',
            "status":1,
            "isselect":cart.isselect
        }
    return JsonResponse(data)