# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-30 00:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_api', '0006_auto_20161129_0550'),
    ]

    operations = [
        migrations.RenameField(
            model_name='author',
            old_name='github_username',
            new_name='github',
        ),
    ]
