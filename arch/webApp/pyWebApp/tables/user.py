import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from django.db import models

from django.core import serializers

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

class User(models.Model):
	username = models.CharField(max_length=20)
	password = models.CharField(max_length=20)
	name = models.CharField(max_length=20)
	level = models.IntegerField(default=2)
	