# -*- coding: utf-8 -*-
# Generated by Django 1.10.dev20160413143217 on 2016-05-12 06:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pyWebApp', '0007_auto_20160511_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='allocation',
            field=models.BooleanField(default=0),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='task',
            name='upload',
            field=models.BooleanField(default=0),
        ),
    ]
