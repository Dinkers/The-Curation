"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from main import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'places', views.PlaceViewSet)
router.register(r'submissions', views.SubmissionViewSet)
router.register(r'cities', views.CityViewSet)
router.register(r'place-images', views.PlaceImageViewSet)
router.register(r'place-usps', views.PlaceUSPViewSet)
router.register(r'place-vital-infos', views.PlaceVitalInfoViewSet)
router.register(r'place-opening-hours', views.PlaceOpeningHoursViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include(router.urls)),
    path('filters/', views.filters_list),
    path('filters/<uuid:city_id>', views.filters_list)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
