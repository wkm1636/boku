import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import Banner, Book, User, Cart, Order, Orderbook


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
    number = int(request.GET.get('number'))  #ajax傳遞數據


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

                sum += totalprice

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




    for cart in carts:
        cart.isselect = isall
        cart.save()


        data={
            "msg":'修改成功',
            "status":1,
            "isselect":cart.isselect,
        }
    return JsonResponse(data)





def generate_identifier():
    temp = str(int(time.time())) + str(random.randrange(1000,10000))
    return temp


def genetateorder(request):
    token = request.session.get("token")
    user = User.objects.get(token=token)

    carts = Cart.objects.filter(user=user).filter(isselect=True)
    if carts.exists():
        # 生成訂單
        order = Order()
        order.user = user
        order.identifier = generate_identifier()
        order.save()

        # 訂單商品
        # 獲取用戶的購物車
        for cart in carts:
            orderbook = Orderbook()
            orderbook.order = order
            orderbook.book = cart.book
            orderbook.number = cart.number
            orderbook.price = cart.price
            orderbook.save()

            # 從購物車中刪除,數據存入了orderbook
            cart.delete()

        data={
            "msg":"下單成功",
            "status":1,
            "identifier":order.identifier
        }
        return JsonResponse(data)
    else:
        data = {
            "msg": "下單失敗,請先選中商品",
            "status": -1,
        }
        return JsonResponse(data)


def orderdetail(request,identifier):
    # identifier = request.GET.get('identifier')

    print(identifier)
    order = Order.objects.get(identifier=identifier)


    data = {
        "order":order
    }
    return render(request,'orderdetail.html',context=data)


def orderlist(request,stu):

    token = request.session.get("token")
    user = User.objects.get(token=token)
    orders = Order.objects.filter(user=user).filter(status=stu)

    return render(request,'orderlist.html',context={'orders':orders})


def mine(request):
    token = request.session.get("token")

    if token:
        user = User.objects.get(token=token)
        orders = Order.objects.filter(user=user)
        waitpay = orders.filter(status=0).count()
        haspay = orders.filter(status=1).count()
        hasreceive = orders.filter(status=2).count()
        waitevaluate = orders.filter(status=3).count()


        data = {
            "user":user,
            "orders":orders,
            "waitpay":waitpay,
            "haspay":haspay,
            "hasreceive":hasreceive,
            "waitevaluate":waitevaluate,

        }


    return render(request,'mine.html',context=data)