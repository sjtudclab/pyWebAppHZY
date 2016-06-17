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
import datetime
import telnetlib
import httplib
import base64 
import urllib 

class Task(models.Model):
	kind = models.CharField(max_length=20)
	allocation = models.BooleanField(default= False)
	name = models.CharField(max_length=20)
	designtime = models.DateField(default=datetime.date.today)
	descript = models.CharField(max_length=20)
	upload = models.BooleanField(default= False);
	size = models.IntegerField();
	uploadtime = models.DateField(default=datetime.date.today);
	status = models.IntegerField(default=0);

@csrf_exempt
def AddTask(request):
	if request.method == 'POST':
		#get info from post
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		#id the info
		newTask = Task.objects.create(kind=body['kind'],name=body['name'],descript=body['descript'],size=body['size'])
		newTask.save()
		response_data = {}
		response_data['msg'] = 'success'
		return JsonResponse(response_data)	


@csrf_exempt
def getTask(request):
	if request.method == 'GET':
		print('ssssss')
		data = serializers.serialize("json", Task.objects.all())
		print(data)
		return HttpResponse(data,content_type='json')

@csrf_exempt
def allocateTask(request):
	if request.method == 'POST':
		#get info from post
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		#id the info
		tarTask = Task.objects.get(id=body['id'])
		tarTask.allocation = True
		tarTask.save()
		response_data = {}
		response_data['msg'] = "success"
		
		return JsonResponse(response_data)

@csrf_exempt
def startosgi(request):
	if request.method == 'GET':
		tn = telnetlib.Telnet("192.168.142.129",8090)
		finish = ':~$ '
		
		response_data ={}
		tn.write("start 1\r\n")
		print tn.read_some()
		tn.close()
		
		#id the info
		response_data['msg'] = "success"
		
		return JsonResponse(response_data)

@csrf_exempt
def starttask(request):
	if request.method == 'GET':
		print "jinrufangfa"
		params = urllib.urlencode({"name": "Row generator test", "xml": "Y"}) 
		auth = base64.b64encode('cluster'+ ':'+ 'cluster') 
		headers = {"Authorization": "Basic "+auth} 
		print "con?"
		conn = httplib.HTTPConnection("127.0.0.1",8080) 
		print "reque?"
		conn.request("GET","/kettle/startTrans",params,headers)
		print "respon?"
		r1 = conn.getresponse()
		print r1.msg
		#print r1.getheaders()
		print r1.status
		print r1.reason
		return HttpResponse(r1)