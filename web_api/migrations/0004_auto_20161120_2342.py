# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-20 23:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_api', '0003_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='origin',
            field=models.URLField(default=b'http://127.0.0.1:8000', editable=False),
        ),
    ]
