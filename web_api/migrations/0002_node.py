# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-17 08:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('node_url', models.URLField()),
                ('access_to_posts', models.BooleanField()),
                ('access_to_images', models.BooleanField()),
            ],
        ),
    ]
