# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-23 18:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_api', '0003_foreignpost_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='password',
            field=models.CharField(max_length=35, null=True),
        ),
    ]
