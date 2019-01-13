from django.conf.urls import url

from App import views

urlpatterns = [
    url(r'^index/$',views.index,name='index'),

    url(r'^detail/(\d+)/$',views.detail,name='detail'),
    # url(r'^detail/$',views.detail,name='detail'),

    url(r'^register/$',views.register,name='register'),

    url(r'^login/$',views.login,name='login'),

    url(r'^logout/$',views.logout,name='logout'),

    url(r'^addcart/$',views.addcart,name='addcart'),

    url(r'^showcart/$',views.showcart,name='showcart'),

    # 修改購物車商品的狀態
    url(r'^changecartstatus/$',views.changecartstatus,name='changecartstatus'),

    # 修改所有商品的狀態
    url(r'^changeallcartstatus/$',views.changeallcartstatus,name='changeallcartstatus'),

    # 生成訂單
    url(r'^genetateorder/$',views.genetateorder,name='genetateorder'),

    # 訂單詳情
    url(r'^orderdetail/(\d+)/$',views.orderdetail,name='orderdetail'),

    # 訂單列表
    url(r'^orderlist/(\d+)/$',views.orderlist,name='orderlist'),

    # mine
    url(r'^mine/$',views.mine,name='mine'),





]





