# Generated by Django 5.0.6 on 2024-08-22 18:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_chatmemory'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmemory',
            old_name='model',
            new_name='gpt',
        ),
        migrations.RenameField(
            model_name='chatmemory',
            old_name='user',
            new_name='member',
        ),
    ]