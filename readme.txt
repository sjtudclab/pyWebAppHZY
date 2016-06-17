编程语言：python
框架：Django
数据库：Mysql
配置文件：数据库、pyWebApp/arch/webApp/webApp/settings.py 
INSTALLED_APPS = [
    'pyWebApp.apps.PywebappConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
]
环境配置与运行:
1. install django
https://docs.djangoproject.com/en/1.9/topics/install/#installing-official-release
    1. $ git clone git://github.com/django/django.git
    2. pip install -e django/
    3. pip install django-cors-headers
    4.apt-get install python-mysqldb
2. pyWebAppHZY/arch/webApp$: python manage.py runserver(run django)
3. 检测数据库和model是否一致 python manage.py makemigrations
4. 同步数据库与model python manage.py migrate
