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



]





