"""
URL configuration for crud_test project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from django.conf import settings  # type: ignore
from django.conf.urls.static import static  # type: ignore
from rest_framework_swagger.views import get_swagger_view  # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView # type: ignore

urlpatterns_api = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/', include(('usuarios.urls', 'usuarios'), namespace='usuarios')),
    path('api/', include(('chalecos.urls', 'chalecos'), namespace='chalecos')),
    path('api/', include(('beneficiarios.urls', 'beneficiarios'), namespace='beneficiarios')),
]

squema_view = get_swagger_view(title='PRUEBA UNP API',patterns=urlpatterns_api)

urlpatterns_root = [
    path('admin/', admin.site.urls),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('swagger/', squema_view, name='swagger'),
]
urlpatterns = urlpatterns_root + urlpatterns_api + static(settings.MEDIA_URL) + static(settings.STATIC_URL)