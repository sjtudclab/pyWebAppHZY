from django.conf.urls import url
from . import views
from . import tables

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^/tenantReg', tables.tenant.getReg, name='tenantRegister'),
    url(r'^/tenantLog', tables.tenant.getLog, name='tenantLogin'),
    url(r'^/tenantEdit', tables.tenant.editTenant, name='tenantEdit'),
	url(r'^/addtask', tables.task.AddTask, name='addtask'),
	url(r'^/gettask',tables.task.getTask,name='alltask'),
	url(r'^/allocate',tables.task.allocateTask,name='allocatetask'),
	url(r'^/startosgi',tables.task.startosgi,name='startosgi'),
	url(r'^/starttask',tables.task.starttask,name='starttask')
]
