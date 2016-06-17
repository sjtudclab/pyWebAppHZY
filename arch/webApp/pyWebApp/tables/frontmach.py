import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from django.db import models

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

class Frontmach(models.Model):
	location = models.CharField(max_length=20)
	status = models.BooleanField()
	descript = models.CharField(max_length=20)

@csrf_exempt
def getMachStatus(request):
	if request.method == 'POST':
		#get info from post
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		print(body['id'])
		#id the info
		tarId = body['id']
		tarFrontMach = Frontmach.objects.get(id=tarId)
		response_data = {}
		response_data['location'] = tarFrontMach.location
		response_data['status'] = tarFrontMach.status
		response_data['descript'] = tarFrontMach.descript
		response_data['msg'] = 'success'
		return JsonResponse(response_data)	


