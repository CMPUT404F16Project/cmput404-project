# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-27 22:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_api', '0004_auto_20161027_2220'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='description',
            field=models.CharField(default='this post is about blah blah.. brief desc.', max_length=50),
            preserve_default=False,
        ),
    ]