# -*- coding: utf-8 -*-
# Generated by Django 1.10.dev20160413143217 on 2016-04-20 05:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pyWebApp', '0003_tenant_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Frontmach',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=20)),
                ('status', models.BooleanField()),
                ('descript', models.CharField(max_length=20)),
            ],
        ),
    ]
